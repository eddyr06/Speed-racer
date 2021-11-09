const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = 700
const ctx = canvas.getContext('2d')

const heroImg = new Image()
heroImg.src = `heroIdleLeft.png`
heroImg.src = `heroWalkLeft.png`
heroImg.src = `heroWalk.png`
heroImg.src = `heroIdle.png`
heroImg.onload = () => { }

const enemyImg = new Image()
enemyImg.src = `penguinEyeChange.png`
enemyImg.src = `penguinRotation.png`
enemyImg.src = `penguinIdle.png`
enemyImg.onload = () => { }

const rockImg = new Image()
rockImg.src = 'rock.png'
rockImg.onload = () => { }

let counter = 0;
let sx = 0
let esx= 0
let keys = {}

//Characters
let hero = {
    x: 620,
    y: 650,
    w: (1200 / 10) * .5,
    h: 100 * .5,
    direction: 'up',
    frames: 10,
    img: heroImg
}

let enemy = {
    x: 600,
    y: 0,
    w: (750/5)*.7,
    h: 200*.7,
    direction: 'up',
    frames: 5,
    img: enemyImg
}

class Rock {
    constructor(id) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.w = rockImg.width;
        this.h = rockImg.height;
        this.img = rock.Img
    }
}

let rockArr = []
let id = 0

function addRock() {
    for (let i = levelCounter; levelCounter >= 0; i++) {
        rockArr.push(new Rock(id++))
    }
}

let levelCounter = 0

//Game Engine 
function animate() {
    //This causes the loop
    window.requestAnimationFrame(animate)

    // console.log('loop')

    //to counts from 0 to infinity 
    counter++;

    //Clears the canvas ... Flips the page
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //Resets sprite so it goes backs to beginning when reaches end. 
    if (sx >= (hero.img.width - hero.img.width / hero.frames)) {
        sx = 0
    }
    //It it controls the speed of how fast its going through the sheet
    if (counter % 5 === 0) {
        sx += hero.img.width / hero.frames
    }
    if (esx >= (enemy.img.width - enemy.img.width / enemy.frames)) {
        esx = 0
    }
    if (counter % 5 === 0) {
            esx += enemy.img.width / enemy.frames
    }
    //Draws the picture
    //context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    ctx.drawImage(
        hero.img, //img 
        sx,  //sx
        0,  //sy
        hero.img.width / hero.frames, //swidth
        hero.img.height, //sheight
        hero.x, //x
        hero.y, //y
        hero.w, //width
        hero.h//height
    )

    ctx.drawImage(
        enemy.img, //img 
        esx,  //sx
        0,  //sy
        enemy.img.width / enemy.frames, //swidth
        enemy.img.height, //sheight
        enemy.x, //x
        enemy.y, //y
        enemy.w, //width
        enemy.h//height
    )

    // console.log(keys)
    moveHero()
    enemyTurn()
}

animate()


function moveHero() {

    for (let key in keys) {
        if (key === "ArrowLeft") {
            if (keys[key]) {
                hero.img.src = 'heroWalkLeft.png'
                hero.frames = 8
                hero.x -= 0.5
                hero.direction = 'left'
            }
        }
        if (key === "ArrowRight") {
            if (keys[key]) {
                hero.img.src = 'heroWalk.png'
                hero.x += 0.5
                hero.frames = 8
                hero.direction = 'right'
            }
        }
        if (key === "ArrowUp") {
            if (keys[key]) {
                hero.img.src = 'heroWalk.png'
                hero.y -= 0.5
                hero.frames = 8
                hero.direction = 'up'
            }
        }
        if (key === "ArrowDown") {
            if (keys[key]) {
                hero.img.src = 'heroWalk.png'
                hero.y += 0.5
                hero.frames = 8
                hero.direction = 'down'
            }
        }

    }
}

function enemyTurn() {

    setInterval(() => {
        enemy.img.src='penguinRotation.png'

        //rotate by 4 / gamelevel

    }, Math.random() * 10000)

}

window.onkeyup = function (e) {
    keys[e.key] = false;
    if (hero.direction == 'right') {
        hero.img.src = 'heroIdle.png'
        hero.frames = 10

        return
    }
    if (hero.direction == 'left') {
        hero.img.src = 'heroIdleLeft.png'
        hero.frames = 10

        return

    }
    if (hero.direction == 'up') {
        hero.img.src = 'heroIdle.png'
        hero.frames = 10

        return

    }
    if (hero.direction == 'down') {
        hero.img.src = 'heroIdle.png'
        hero.frames = 10

        return

    }

}

window.onkeydown = function (e) {
    keys[e.key] = true;
};









// class Santa {
//     constructor(x,y,src){
//         this.x = x
//         this.y = y
//         this.src = src
//         this.image = new Image() 
//     }