function controller(event) {
    if (event.key == "Enter") {
       if (runWorker == 0) {
          run();
          runSound.play();
 
          score();
          background();
          flameLocations.forEach(generateFlames);
 
       }
 
 
    }
    if (event.key == " ") {
       if (jumpWorker == 0) {
          if (runWorker !== 0) {
             clearInterval(runWorker);
             runSound.pause();
 
             jump();
             jumpSound.play();
          }
 
       }
    }
 }
 
 
 var runImage = 1;
 var runWorker = 0;
 var runSound = new Audio("run.mp3")
 runSound.Loop = true;
 
 function run() {
 
    runWorker = setInterval(() => {
 
       runImage = runImage + 1;
 
       if (runImage == 9) {
          runImage = 1;
       }
 
 
       document.getElementById("boy").src = "run" + runImage + ".png";
    }, 150);
 }
 
 var jumpImage = 1;
 var jumpWorker = 0;
 
 var boyMarginTop = 400;
 
 function jump() {
    jumpWorker = setInterval(() => {
 
       jumpImage = jumpImage + 1;
 
       if (jumpImage < 8) {
          boyMarginTop = boyMarginTop - 30;
          document.getElementById("boy").style.marginTop = boyMarginTop + "px";
 
 
       }
 
       if (jumpImage > 7) {
          boyMarginTop = boyMarginTop + 30;
          document.getElementById("boy").style.marginTop = boyMarginTop + "px";
 
       }
 
       if (jumpImage == 13) {
          jumpImage = 1;
          clearInterval(jumpWorker);
          jumpWorker = 0;
          run();
 
       }
       document.getElementById("boy").src = "jump" + jumpImage + ".png";
    }, 100);
 
 }
 
 var scoreWorker = 0;
 var updateScore = 0;
 function score() {
 
    scoreWorker = setInterval(() => {
 
       if (updateScore==1000) {
          alert("Game Win!!. Press 'ok' to restart")
          window.location.reload();
          
       }
 
       updateScore = updateScore + 10;
       document.getElementById("score").innerHTML = updateScore;
 
    }, 100);
 
 }
 
 var backgroundWorker = 0;
 var backgroundPosition = 0;
 
 function background() {
 
    backgroundWorker = setInterval(() => {
 
       backgroundPosition = backgroundPosition - 20;
       document.getElementById("background").style.backgroundPositionX = backgroundPosition + "px";
 
 
    }, 100);
 
 
 
 }
 
 
 
 var flameLocations = ["500", "1000", "1500", "2000"];

function generateFlames(x) {
    var i = document.createElement("img");
    i.src = "flame.gif";
    i.className = "flame";
    i.style.marginLeft = x + "px";
    document.getElementById("background").appendChild(i);

    var flameWorker = setInterval(() => {
        if (x === 200) {
            if (jumpWorker === 0) {
                clearInterval(runWorker);
                runSound.pause();
                clearInterval(backgroundWorker);
                clearInterval(scoreWorker);
                dead();
                deadSound.play();
            }
        }
        x -= 10;
        i.style.marginLeft = x + "px";
    }, 50);
}

 
 var deadWorker = 0;
 var deadImage = 1;
 var deadSound = new Audio("dead.mp3");
 function dead() {
    deadWorker = setInterval(() => {
       deadImage = deadImage + 1;
       if (deadImage == 11) {
          deadImage = 1;
          clearInterval(deadWorker);
          alert ("Game over")
          window.location.reload();
          
 
       }
       document.getElementById("boy").src = "dead" + deadImage + ".png";
    }, 100);
 }