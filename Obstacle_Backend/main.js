var blueCar = document.getElementById("bluecar");
var raceCar = document.getElementById("racecar");
var result = document.getElementById("result")
const score =  document.getElementById("score")
const score1 =  document.getElementById("score1")
const score2 =  document.getElementById("score2")
const score3 =  document.getElementById("score3")
const score4 =  document.getElementById("score4")
const loginform  = document.getElementById("loginform");
const number = document.getElementById("otp");
const mainMenu = document.getElementById("main_Menu");
const sec = document.querySelector(".sec");
var ins =  document.getElementById("ins");
var game =  document.getElementById("game");
var bgame =  document.getElementById("bgame");
var res = document.getElementById("res");
var jai_shree_ram = document.getElementById("jai_shree_ram");
var testResults = [];
var cnt=0;
var counter=0;

let otp;

loginform.addEventListener("submit", async function(ev){
    ev.preventDefault();
    const temp = number.value;
    otp = temp.toString();
    console.log(otp);

    try{
        const response = await fetch('http://localhost:3005/api/scores',{
            method : 'POST',
            headers :{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                ObstacleScore1 : 0,
                ObstacleScore2 : 0,
                ObstacleScore3 : 0,
                otpcode : otp
            })
        });

        if (response.status === 404) {
            alert("Wrong code Entered, Please try again.");
            location.reload();
            return;
        }

        sec.style.display = "none";
        mainMenu.style.display = "flex";
        alert("You are logged in successfully.");
    } catch (err) {
        console.error('Error logging in:', err.message);
        alert("An error occurred. Please try again.");
    }
  });

  async function getotpFromUser() {
    return otp;
  }



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
    setInterval( async function Gameover (){
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

                    try {
                        const otp = await getotpFromUser();
                        const response = await fetch('http://localhost:3005/api/scores', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                ObstacleScore1 : `${testResults[0]}/15`,
                                ObstacleScore2: `${testResults[1]}/15 `,
                                ObstacleScore3 : `${testResults[2]}/15 `,
                                otpcode: otp
                            })
                        });
                            console.log('Score saved successfully');
                    } catch (err) {
                        console.error('Error saving score:', err.message);
                    }

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