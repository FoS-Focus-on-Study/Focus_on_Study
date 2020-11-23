const logInIDInput = document.querySelector(".logInBox form input#inputID");
const logInPWInput = document.querySelector(".logInBox form input#inputPW");
const logInButton = document.querySelector(".logInBox form .logInButton");

function logInButtonFn(e){
    if(logInIDInput.value !== localStorage.getItem("ID") ||
        logInPWInput.value !== localStorage.getItem("PW")){
        e.preventDefault();
        alert("ID와 PW가 일치하지 않습니다.");
    } else {

    }
}

logInButton.onclick = logInButtonFn;