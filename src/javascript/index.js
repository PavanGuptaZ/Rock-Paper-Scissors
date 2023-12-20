const gameContainer = document.querySelector(".container"),
    userResult = document.querySelector(".user_result img"),
    cpuResult = document.querySelector(".cpu_result img"),
    result = document.querySelector(".results"),
    optionsImages = document.querySelectorAll(".option_image"),
    gamescreen = document.querySelector(".gamescreen"),
    endscreen = document.querySelector(".endscreen"),
    reloadbtn = document.querySelector("button"),
    note = document.querySelector(".note"),
    UserScoreValue = document.querySelector(".user_score_value"),
    CpuScoreValue = document.querySelector(".cpu_score_value");


let userscore = 0;
let cpuscore = 0;
let outcomes = {
    RR: "Draw",
    RP: "Cpu",
    RS: "User",
    PR: "User",
    PP: "Draw",
    PS: "Cpu",
    SR: "Cpu",
    SP: "User",
    SS: "Draw",
}
let cpuImages = [optionsImages[0].querySelector("img").src, optionsImages[1].querySelector("img").src, optionsImages[2].querySelector("img").src]

optionsImages.forEach((Img, index) => {
    Img.addEventListener('click', (e) => startGame(index, e))
})

function startGame(index, e) {
    gameContainer.classList.add("start");
    e.target.classList.add("active");

    result.textContent = "Wait..."

    optionsImages.forEach((Img2, index2) => {
        if (index !== index2) {
            Img2.classList.remove("active");
        }
    })

    setTimeout(() => {
        gameContainer.classList.remove("start");
        userResult.src = e.target.querySelector("img").src;

        let randomNum = Math.floor(Math.random() * 3);
        cpuResult.src = cpuImages[randomNum];

        let cpuValue = ["R", "P", "S"][randomNum];
        let userValue = ["R", "P", "S"][index];

        let outcomesValues = outcomes[userValue + cpuValue];
        result.textContent = userValue === cpuValue ? "Match Draw" : `${outcomesValues} Got Point!!`;

        addScore(outcomesValues)
    }, 2500);
}


function addScore(outcomesValues) {

    if (outcomesValues == "Cpu") {
        cpuscore += 1;
        CpuScoreValue.textContent = cpuscore;

        if (cpuscore === 3) {
            winning("Cpu")
            return
        }
    }
    else if (outcomesValues == "User") {
        userscore += 1;
        UserScoreValue.textContent = userscore;

        if (userscore === 3) {
            winning("User")
            return
        }
    } else {
        return
    }

}


function winning(winner) {
    optionsImages.forEach((Img3) => {
        Img3.classList.add("unactive");
    })

    note.style.display = "none";

    setTimeout(() => {
        gamescreen.classList.add("gamescreen1");
        endscreen.innerHTML = `${winner} Won the Match  <button onclick="window.location.reload(true)" class="reload">New Game</button>`;
        endscreen.classList.add("endscreen2");

    }, 2000);

}