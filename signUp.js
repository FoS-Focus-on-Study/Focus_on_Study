const signUpID = document.querySelector(".signUpFrame form input.ID");
const signUpPW = document.querySelector(".signUpFrame form input.PW");
const signUpPW2 = document.querySelector(".signUpFrame form input.PW2");
const signUpSubmitButton = document.querySelector(".signUpFrame form button");


function signUpSubmit(e){

    if(signUpID.value === "" || signUpPW.value === "" || signUpPW2.value === ""){
        e.preventDefault();
        alert("입력하지 않은 정보가 있습니다.");
    } else if(signUpPW.value !== signUpPW2.value ) {
        e.preventDefault();
        alert("비밀번호를 다시 확인해주세요");
    }
    else {
        localStorage.setItem("ID", signUpID.value);
        localStorage.setItem("PW", signUpPW.value);
    }

}

signUpSubmitButton.onclick = signUpSubmit;
