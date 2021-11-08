const canvas = document.querySelector('canvas')
const cx = canvas.getContext('2d')
cx.imageSmoothingEnabled = false

const keys = new Map()

function createCheckerboard(size = 128, tileSize = 8) {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const tiles = size / tileSize
    const cx = canvas.getContext('2d')
    for (let y = 0; y < tiles; y++) {
        for (let x = 0; x < tiles; x++) {
            cx.fillStyle = y % 2 === 0 ? (x % 2 === 0 ? 'red' : 'white') : (x % 2 === 0 ? 'white' : 'red')
            cx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)
        }
    }
    return canvas
}

function createCheckerboardData(size = 64, tileSize = 8) {
    const checkerboard = createCheckerboard(size, tileSize)
    return checkerboard.getContext('2d').getImageData(0, 0, size, size)
}

function createImageDataFromUrl(url) {
    return new Promise((resolve, reject) => {
        const i = new Image()
        i.crossOrigin = 'anonymous'
        i.src = url
        i.onload = (e) => {
            const canvas = document.createElement('canvas')
            canvas.width = i.width
            canvas.height = i.height
            const cx = canvas.getContext('2d')
            cx.drawImage(i, 0, 0)
            resolve(cx.getImageData(0, 0, cx.canvas.width, cx.canvas.height))
        }
        i.onerror = (e) => {
            reject(e)
        }
    })
}

function clamp(value, min, max) {
    if (value < min) return min
    if (value > max) return max
    return value
}

function linear(p, a, b) {
    return p * (b - a) + a
}

let iid = createCheckerboardData(128)
    , sid = null
    , px = 0
    , py = 0
    , pr = 0
    , fov = Math.PI * 0.25
    , near = 0.001
    , far = 0.005
    , hs = 0.65

createImageDataFromUrl('https://azazeln28.neocities.org/codepen/image/circuit.png').then((imageData) => iid = imageData)
createImageDataFromUrl('https://azazeln28.neocities.org/codepen/image/circuit-sky.png').then((imageData) => sid = imageData)

function frame() {
    cx.clearRect(0, 0, cx.canvas.width, cx.canvas.height)

    if (keys.get('ArrowLeft')) {
        pr -= 0.025
    } else if (keys.get('ArrowRight')) {
        pr += 0.025
    }

    if (keys.get('ArrowUp')) {
        px += Math.cos(pr) * 0.001
        py += Math.sin(pr) * 0.001
    } else if (keys.get('ArrowDown')) {
        px -= Math.cos(pr) * 0.001
        py -= Math.sin(pr) * 0.001
    }

    if (keys.get('KeyW')) {
        far += 0.01
    } else if (keys.get('KeyS')) {
        far -= 0.01
    }

    if (keys.get('KeyQ')) {
        near += 0.01
    } else if (keys.get('KeyA')) {
        near -= 0.01
    }

    if (keys.get('KeyE')) {
        fov += 0.01
    } else if (keys.get('KeyD')) {
        fov -= 0.01
    }

    if (keys.get('KeyR')) {
        hs += 0.01
    } else if (keys.get('KeyF')) {
        hs -= 0.01
    }

    const fsx = px + Math.cos(pr - fov) * far
    const fsy = py + Math.sin(pr - fov) * far

    const fex = px + Math.cos(pr + fov) * far
    const fey = py + Math.sin(pr + fov) * far

    const nsx = px + Math.cos(pr - fov) * near
    const nsy = py + Math.sin(pr - fov) * near

    const nex = px + Math.cos(pr + fov) * near
    const ney = py + Math.sin(pr + fov) * near

    const cid = cx.getImageData(0, 0, 320, 200)

    const fogColor = [
        0.68 * 255,
        0.65 * 255,
        0.94 * 255,
        255
    ]

    for (let sy = 1; sy < cx.canvas.height * hs; sy++) {
        const ny = sy / cx.canvas.height * hs
        const fy = clamp(sy / cx.canvas.height * hs * 6, 0.2, 1)

        const z = 1 / ny

        const tsx = (fsx - nsx) * z + nsx
        const tsy = (fsy - nsy) * z + nsy

        const tex = (fex - nex) * z + nex
        const tey = (fey - ney) * z + ney

        const dy = sy + Math.floor(cx.canvas.height * (1.0 - hs))

        for (let sx = 0; sx < cx.canvas.width; sx++) {
            const nx = sx / cx.canvas.width

            const tx = (tex - tsx) * nx + tsx
            const ty = (tey - tsy) * nx + tsy

            //if (tx > 1 || tx < 0) continue
            //if (ty > 1 || ty < 0) continue

            // const spx = Math.abs(Math.floor(tx * iid.width) % iid.width)
            // const spy = Math.abs(Math.floor(ty * iid.height) % iid.height)

            const spx = Math.abs(Math.round(tx * iid.width) % iid.width)
            const spy = Math.abs(Math.round(ty * iid.height) % iid.height)

            const ioffset = ((spy * iid.width + spx) * 4)
            //if (ioffset < 0 || ioffset > iid.data.length) continue

            const coffset = (dy * cx.canvas.width + sx) * 4

            cid.data[coffset + 0] = linear(fy, fogColor[0], iid.data[ioffset + 0])
            cid.data[coffset + 1] = linear(fy, fogColor[1], iid.data[ioffset + 1])
            cid.data[coffset + 2] = linear(fy, fogColor[2], iid.data[ioffset + 2])
            cid.data[coffset + 3] = linear(fy, fogColor[3], iid.data[ioffset + 3])
        }
    }

    if (sid) {
        for (let sx = 0; sx < cx.canvas.width; sx++) {
            const skx = Math.floor(sx + (pr / Math.PI * 2.0) * sid.width) % sid.width
            for (let sy = 0; sy < sid.height; sy++) {
                const h = Math.floor(cx.canvas.height * (1.0 - hs) - sid.height) + 1
                const coffset = ((h + sy) * cx.canvas.width + sx) * 4
                const soffset = (sy * sid.width + skx) * 4
                cid.data[coffset + 0] = sid.data[soffset + 0]
                cid.data[coffset + 1] = sid.data[soffset + 1]
                cid.data[coffset + 2] = sid.data[soffset + 2]
                cid.data[coffset + 3] = sid.data[soffset + 3]
            }
        }
    }

    cx.putImageData(cid, 0, 0)

    cx.font = '10px monospace'
    cx.textAlign = 'left'
    cx.textBaseline = 'top'
    cx.fillText(`${px.toFixed(2)}, ${py.toFixed(2)}, ${pr.toFixed(2)}`, 0, 0)
    cx.fillText(`${far.toFixed(2)}, ${near.toFixed(2)}, ${fov.toFixed(2)}, ${hs.toFixed(2)}`, 0, 12)

    frameId = window.requestAnimationFrame(frame)
}

function resize() {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
}

function key(e) {
    keys.set(e.code, e.type === 'keydown')
}

function touch(e) {
    if (e.type === 'touchstart' || e.type === 'touchmove') {
        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i]
            if (touch.clientX < window.innerWidth * 0.5) {
                if (touch.clientY < window.innerHeight * 0.5) {
                    keys.set('ArrowUp', true)
                    keys.set('ArrowDown', false)
                } else {
                    keys.set('ArrowUp', false)
                    keys.set('ArrowDown', true)
                }
            } else {
                if (touch.clientY < window.innerHeight * 0.5) {
                    keys.set('ArrowLeft', true)
                    keys.set('ArrowRight', false)
                } else {
                    keys.set('ArrowLeft', false)
                    keys.set('ArrowRight', true)
                }
            }
        }
    } else if (e.type === 'touchend' || e.type === 'touchcancel' || e.type === 'touchleave') {
        keys.set('ArrowUp', false)
        keys.set('ArrowDown', false)
        keys.set('ArrowLeft', false)
        keys.set('ArrowRight', false)
    }
}

function start() {
    //window.addEventListener('resize', resize)
    //window.dispatchEvent(new Event('resize'))
    window.addEventListener('keyup', key)
    window.addEventListener('keydown', key)
    window.addEventListener('touchstart', touch)
    window.addEventListener('touchend', touch)
    window.addEventListener('touchmove', touch)
    window.addEventListener('touchleave', touch)
    window.addEventListener('touchcancel', touch)
    frameId = window.requestAnimationFrame(frame)
}

start()