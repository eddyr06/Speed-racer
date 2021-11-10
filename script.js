function init() {

    const canvas = document.querySelector('canvas')
    canvas.width = window.innerWidth
    canvas.height = 700
    const ctx = canvas.getContext('2d')

    const heroImg = new Image()
    heroImg.src = `../Images/Hero/idleLeft.png`
    heroImg.src = `../Images/Hero/idleRight.png`
    heroImg.src = `../Images/Hero/idleUp.png`
    heroImg.src = `../Images/Hero/idleDown.png`
    heroImg.src = `../Images/Hero/runningLeft.png`
    heroImg.src = `../Images/Hero/runningRight.png`
    heroImg.src = `../Images/Hero/runningUp.png`
    heroImg.src = `../Images/Hero/runningDown.png`
    heroImg.onload = () => { }

    const enemyImg = new Image()
    enemyImg.src = `../Images/Enemy/penguinEyeChange.png`
    enemyImg.src = `../Images/Enemy/penguinRotation.png`
    enemyImg.src = `../Images/Enemy/enemyIdle.png`
    enemyImg.onload = () => { }

    const rockImg = new Image()
    rockImg.src = '../Images/Obstacles/rock.png'
    rockImg.onload = () => { }

    let counter = 0;
    let esx = 0
    let sx = 0
    let keys = {}

    //Characters
    let hero = {
        x: 620,
        y: 650,
        w: (1200 / 10) * .5,
        h: 100 * .5,
        direction: 'up',
        frames: 4,
        img: heroImg
    }

    let enemy = {
        x: 600,
        y: 0,
        w: (enemyImg.width / 5) * .5,
        h: 200 * .5,
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
    let completeLoop = true
    let levelCounter = 0
    let gameOver = false
    let zeroCounter = 0
    let rotationCount = 0
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
            sx += (hero.img.width / hero.frames)
        }

        //Resets sprite so it goes backs to beginning when reaches end.
        //It it controls the speed of how fast its going through the sheet
        // if (counter % 150 === 0) {
        //     esx += enemy.img.width / enemy.frames
        // }

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

        if (gameOver === true) {
            console.log('game over animation activated')
            enemy.img.src = '../Images/Enemy/penguinEyeChange.png'
            if (zeroCounter % 70 === 0 && zeroCounter <= 280) {
                esx += (enemy.img.width / 5)
            }
            zeroCounter++
            if (zeroCounter === 280) {
                gameOver = 'complete'
            }
        }
        // console.log(keys)
        moveHero()
        movementCheck()
    }

    animate()

function movementCheck(){
    if (counter % 50 === 0 && completeLoop === true && gameOver === false) {
        console.log ('loop 1')
        if (Math.floor(Math.random() * 10) === 4) {
            completeLoop = false
            enemy.img.src = `../Images/Enemy/penguinRotation.png`
            console.log('loop 2')
            var frameint = setInterval(frame, 5)
            function frame(){
            if (counter % 500 === 0 && rotationCount < 2){
                console.log('if loop running ever 500 counts and increasing frame count')
                esx += (enemy.img.width / 5)
                rotationCount++
            }
                else if (rotationCount >= 2 && completeLoop === false){
                    completeLoop = 'almost'
                    var moveCheck = setTimeout(frameMove, 1)
                    function frameMove(){
                        console.log('timer activated')
                    var frameCheck = setInterval(frameCheckF, 1)
                    function frameCheckF(){
                        console.log('frame 1 running ever 5 milliseconds')
                        for (let key in keys){
                            if (keys[key] == true){
                            console.log('You lose!')
                            gameOver = true
                            esx = 0
                    }
                }
                }
                
                var endInt = setTimeout(frameEnd, 5000)
                function frameEnd(){
                console.log('clearingTimeout')
                
                completeLoop === true
                clearTimeout(moveCheck)
                clearInterval(frameCheck)
                clearInterval(frameint)
                }
            }
                        }
                    }
                }   
                }
}
function moveHero() {

        for (let key in keys) {
            if (key === "ArrowLeft") {
                if (keys[key]) {
                    hero.img.src = '../Images/Hero/runningLeft.png'
                    hero.x -= 0.5
                    hero.frames = 4
                    hero.direction = 'left'
                }
            }
            if (key === "ArrowRight") {
                if (keys[key]) {
                    hero.img.src = '../Images/Hero/runningRight.png'
                    hero.x += 0.5
                    hero.frames = 4
                    hero.direction = 'right'
                }
            }
            if (key === "ArrowUp") {
                if (keys[key]) {
                    hero.img.src = '../Images/Hero/runningUp.png'
                    hero.y -= 0.5
                    hero.frames = 4
                    hero.direction = 'up'
                }
            }
            if (key === "ArrowDown") {
                if (keys[key]) {
                    hero.img.src = '../Images/Hero/runningDown.png'
                    hero.y += 0.5
                    hero.frames = 4
                    hero.direction = 'down'
                }
            }

        }
    }

    window.onkeyup = function (e) {
        keys[e.key] = false;
        if (hero.direction == 'right') {
            hero.img.src = '../Images/Hero/idleRight.png'
            hero.frames = 4

            return
        }
        if (hero.direction == 'left') {
            hero.img.src = '../Images/Hero/idleLeft.png'
            hero.frames = 4

            return

        }
        if (hero.direction == 'up') {
            hero.img.src = '../Images/Hero/idleUp.png'
            hero.frames = 4

            return

        }
        if (hero.direction == 'down') {
            hero.img.src = '../Images/Hero/idleDown.png'
            hero.frames = 4

            return

        }

    }

    window.onkeydown = function (e) {
        keys[e.key] = true;
    };


    //Timer
    var isWaiting = false;
    var isRunning = false;
    var seconds = 180;
    var countdownTimer;
    var finalCountdown = false;

    function GameTimer() {
        var minutes = Math.round((seconds - 30) / 60);
        var remainingSeconds = seconds % 60;
        if (remainingSeconds < 10) {
            remainingSeconds = "0" + remainingSeconds;
        }
        document.getElementById('waiting_time').innerHTML = minutes + ":" + remainingSeconds;
        if (seconds == 0) {
            isRunning = true;

            if (finalCountdown) {
                clearInterval(countdownTimer);
            } else {
                finalCountdown = true;
                alert('Game Over')
                window.location.reload()
            }

        } else {
            isWaiting = true;
            seconds--;
        }
    }
    countdownTimer = setInterval(GameTimer, 1000);


    //New Game Button
    document.querySelector('#btn').addEventListener('click', function () {
        window.location.reload();
        return false;
    })
};


document.querySelector(".menu").click(function () {
    $(this).parent().toggleClass("close");
});


