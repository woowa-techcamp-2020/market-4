import {$, getValueInCookie, debouncing} from './signup/util.js';

const NOT_ID = "아이디를 입력하지 않았습니다";
const NOT_PWD = "비밀번호를 입력하지 않았습니다."

const form = $('form');
const userIdInput = $('input[name=userId]');
const passwordInput = $('input[name=password]');
const loginMessageElement = $('.login-message');
const isSaveUserCheckBox = $('input[name=isSavedUserId]');
const loginSumbitBtn = $('.login-submit-btn');

function submitForm() {
    if(checkIdPwdInput()) form.submit();
}

function checkIdPwdInput() {
    if(!form.userId.value) {
        loginMessageElement.innerText = NOT_ID;
        return false;
    }
    if(!form.password.value) {
        loginMessageElement.innerText = NOT_PWD;
        return false;
    }
    return true;
}

const submitForm100ms = debouncing(() => submitForm(),100);

function enterKeySubmit(e) {
    if(e.keyCode === 13) {
        submitForm100ms();
    }
}

function run() {
    window.onload = e => {
        const value = getValueInCookie('savedUserId') || "";
        userIdInput.value = value;
        isSaveUserCheckBox.checked = !!value;
    };
    
    loginSumbitBtn.addEventListener('click', submitForm100ms);
    userIdInput.addEventListener('keydown', enterKeySubmit);
    passwordInput.addEventListener('keydown', enterKeySubmit);
}

run();