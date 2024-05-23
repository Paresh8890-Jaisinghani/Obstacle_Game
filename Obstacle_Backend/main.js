var blueCar = document.getElementById("bluecar");
var raceCar = document.getElementById("racecar");
var result = document.getElementById("result")
const score =  document.getElementById("score")
const score1 =  document.getElementById("score1")
const score2 =  document.getElementById("score2")
const score3 =  document.getElementById("score3")
const score4 =  document.getElementById("score4")
var ins =  document.getElementById("ins");
var game =  document.getElementById("game");
var bgame =  document.getElementById("bgame");
var res = document.getElementById("res");
var jai_shree_ram = document.getElementById("jai_shree_ram");
var testResults = [];
var cnt=0;
var counter=0;

bgame.style.display = "none";
res.style.display = "none";

const Re = () => {
    raceCar.style.left = "130px";
    bgame.style.display = "block";
    ins.style.display = "none";
    result.style.display = "none";
    cnt++;
    if(cnt == 1){
        document.getElementById("bluecar").style.animationDuration = "1.0s";
    }
    if(cnt == 2){
        document.getElementById("bluecar").style.animationDuration = "0.8s";
    }
}

const right = () => {
    var raceCarLeft = parseInt(window.getComputedStyle(raceCar).getPropertyValue("left"))
    if (raceCarLeft < 260) { raceCar.style.left = (raceCarLeft + 130) + "px" }
}

const left = () => {
    var raceCarLeft = parseInt(window.getComputedStyle(raceCar).getPropertyValue("left"))
        if (raceCarLeft > 0) {
            raceCar.style.left = (raceCarLeft - 130) + "px"
        }
}

const StartGame = () => {
    raceCar.style.left = "130px";
    bgame.style.display = "block";
    ins.style.display = "none";
    result.style.display = "none";
    

    // bluecar move
    blueCar.addEventListener("animationiteration", function(){
        var random = ((Math.floor(Math.random() * 3)) * 130)
        blueCar.style.left = random + "px";
        counter++;
        if(counter > 1){
            jai_shree_ram.play();
        }
        if(counter > 14){
            testResults.push(counter);
            bgame.style.display = "none";
            result.style.display = "block";
            score.innerHTML = `score: ${counter}/15 `;
            jai_shree_ram.pause();
            counter = 0;
            if(cnt == 3){
                result.style.display = "none";
                res.style.display = "block";
                score1.innerHTML = `score 1: ${testResults[0]}/15 `;
                score2.innerHTML = `score 2: ${testResults[1]}/15 `;
                score3.innerHTML = `score 3: ${testResults[2]}/15 `;
                score4.innerHTML = `Average: ${((testResults[0]+testResults[1]+testResults[2])/3/15*100).toFixed(3)}`;
            }
            return;
        }
    })

    //rececar move
    window.addEventListener("keydown", function(e) {
        // console.log(e.key);
        if (e.key == "ArrowRight") {
            var raceCarLeft = parseInt(window.getComputedStyle(raceCar).getPropertyValue("left"))
            if (raceCarLeft < 260) { raceCar.style.left = (raceCarLeft + 130) + "px" }
        };

        if (e.key == "ArrowLeft") {
            var raceCarLeft = parseInt(window.getComputedStyle(raceCar).getPropertyValue("left"))
            if (raceCarLeft > 0) {
                raceCar.style.left = (raceCarLeft - 130) + "px"
            }

        }
    });

    //Game over
    setInterval(function Gameover (){
        var blueCarTop = parseInt(window.getComputedStyle(blueCar).getPropertyValue("top"));
        var blueCarLeft = parseInt(window.getComputedStyle(blueCar).getPropertyValue("left"));
        var raceCarLeft = parseInt(window.getComputedStyle(raceCar).getPropertyValue("left"));
            if((blueCarLeft === raceCarLeft) && (blueCarTop > 250) && (blueCarTop < 450)){
                testResults.push(counter);
                bgame.style.display = "none";
                result.style.display = "block";
                score.innerHTML = `score: ${counter}/15 `;
                jai_shree_ram.pause();
                counter = 0;
                if(cnt == 2){
                    result.style.display = "none";
                    res.style.display = "block";
                    score1.innerHTML = `score 1: ${testResults[0]}/15 `;
                    score2.innerHTML = `score 2: ${testResults[1]}/15 `;
                    score3.innerHTML = `score 3: ${testResults[2]}/15 `;
                    score4.innerHTML = `Accuracy: ${((testResults[0]+testResults[1]+testResults[2])/3/15*100).toFixed(2)}%`;
                }
                return;
            }
    }, 10)
}