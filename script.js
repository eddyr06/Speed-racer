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

    let rock = {
            x: 0,
            y: 0,
            w: rockImg.width,
            h: rockImg.height,
            img: rockImg
        }

    let rockArr = []
    let id = 0

<<<<<<< HEAD
    let levelCounter = 1
=======
    //Safe Zone
    let safeZone = {
        x: 0,
        y: 0,
        w: 0,
        h: 0
    };

>>>>>>> d1c75e21087cc79b0b33f79e635669dc82b2ea37

    function addRock() {
        for (let i = levelCounter; levelCounter >= 0; i++) {
            rockArr.push(new Rock(id++))
        }
    }

    let completeLoop = true
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
        for (let rock of rockArr){
            ctx.drawImage(rock, bonuspoint.x, bonuspoint.y +=4, bonuspoint.w, bonuspoint.h)
            detectBonus(vehicle,bonuspoint)
            if (detectBonus(vehicle,bonuspoint) === true){
              bonuspoint.y+=1000
            }
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
                // alert('Game Over')
            }
            // window.location.reload()
        }
        detectCollision(hero, enemy)
        moveHero()
        movementCheck()
    }

    animate()

<<<<<<< HEAD
function movementCheck(){
    // console.log('movement check called',counter,completeLoop,gameOver)
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
                            clearInterval(frameCheck)
                            clearInterval(frameint)
                            clearTimeout(moveCheck)
                            clearTimeout(finalInt)
                            }
                            else {
                                let finalInt = setTimeout(frameEnd, 5000)
                                function frameEnd(){
                                console.log('clearingTimeout')
                                esx = 0
                                rotationCount = 0
                                completeLoop = true
                                clearTimeout(moveCheck)
                                clearInterval(frameCheck)
                                clearInterval(frameint)
                                }
                    }
                }
                }
            }
=======
    function movementCheck() {
        // console.log('movement check called',counter,completeLoop,gameOver)
        if (counter % 50 === 0 && completeLoop === true && gameOver === false) {
            console.log('loop 1')
            if (Math.floor(Math.random() * 10) === 4) {
                completeLoop = false
                enemy.img.src = `../Images/Enemy/penguinRotation.png`
                console.log('loop 2')
                var frameint = setInterval(frame, 5)
                function frame() {
                    if (counter % 500 === 0 && rotationCount < 2) {
                        console.log('if loop running ever 500 counts and increasing frame count')
                        esx += (enemy.img.width / 5)
                        rotationCount++
                    }
                    else if (rotationCount >= 2 && completeLoop === false) {
                        completeLoop = 'almost'
                        var moveCheck = setTimeout(frameMove, 1)
                        function frameMove() {
                            console.log('timer activated')
                            var frameCheck = setInterval(frameCheckF, 1)
                            function frameCheckF() {
                                console.log('frame 1 running ever 5 milliseconds')
                                for (let key in keys) {
                                    if (keys[key] == true) {
                                        console.log('You lose!')
                                        // alert('Game Over')
                                        // window.location.reload()
                                        gameOver = true
                                        esx = 0
                                    }
                                }
                            }

                            setTimeout(frameEnd, 5000)
                            function frameEnd() {
                                console.log('clearingTimeout')

                                completeLoop = true
                                clearTimeout(moveCheck)
                                clearInterval(frameCheck)
                                clearInterval(frameint)
                            }
>>>>>>> d1c75e21087cc79b0b33f79e635669dc82b2ea37
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

    function detectCollision(rect1, rect2) {
        if (rect1.x < rect2.x + rect2.w &&
            rect1.x + rect1.w > rect2.x &&
            rect1.y < rect2.y + rect2.h &&
            rect1.h + rect1.y > rect2.y) {
            alert('collision')
            window.cancelAnimationFrame(int)
            // window.location.reload()
        }
    }







    //Timer
    let isWaiting = false;
    let isRunning = false;
    let seconds = 180;
    let countdownTimer;
    let finalCountdown = false;

    function gameTimer() {
        let minutes = Math.round((seconds - 30) / 60);
        let remainingSeconds = seconds % 60;
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
    countdownTimer = setInterval(gameTimer, 1000);


    //New Game Button
    document.querySelector('#btn').addEventListener('click', function () {
        window.location.reload();
        return false;
    })
};

//Hamburger Menu
document.querySelector(".menu").click(function () {
    $(this).parent().toggleClass("close");
});


