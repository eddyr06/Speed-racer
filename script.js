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
enemyImg.src = `enemyIdle.png`
enemyImg.onload = () => { }

const rockImg = new Image()
rockImg.src = 'rock.png'
rockImg.onload = () => { }

let counter = 0;
let sx = 0
let keys = {}

//Characters
let hero = {
    x: 450,
    y: 400,
    w: (heroImg.width / 10) * .5,
    h: heroImg.height * .5,
    direction: 'right',
    frames: 10,
    img: heroImg
}

let enemy = {
    x: 450,
    y: 0,
    w: (enemyImg.width / 16) * .5,
    h: enemyImg.height * .5,
    direction: 'right',
    frames: 16,
    img: enemyImg
}

class Rock {
    constructor(id){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.w = rockImg.width;
    this.h = rockImg.height;
    this.img = rock.Img
    }
}

let rockArr = []
let id = 0

function addRock(){
    for (let i = levelCounter;levelCounter>=0;i++){
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
        sx,  //sx
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
                hero.x -= 5
                hero.direction = 'left'
            }
        }
        if (key === "ArrowRight") {
            if (keys[key]) {
                hero.img.src = 'heroWalk.png'
                hero.x += 5
                hero.frames = 8
                hero.direction = 'right'
            }
        }
        if (key === "ArrowUp") {
            if (keys[key]) {
                hero.img.src = 'heroWalk.png'
                hero.y -= 5
                hero.frames = 8
                hero.direction = 'up'
            }
        }
        if (key === "ArrowDown") {
            if (keys[key]) {
                hero.img.src = 'heroWalk.png'
                hero.y += 5
                hero.frames = 8
                hero.direction = 'down'
            }
        }

    }
}

function enemyTurn() {

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
    // if (santa.direction == 'up') {
    //     santa.img.src = 'santaIdleUp.png'
    //     santa.frames = 16

    //     return

    // }
    // if (santa.direction == 'down') {
    //     santa.img.src = 'santaIdleDown.png'
    //     santa.frames = 16

    //     return

    // }

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

// } 