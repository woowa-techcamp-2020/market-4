const $ = selector => {
    const elements = document.querySelectorAll(selector);
    switch(elements.length) {
        case 0 : return null;
        case 1 : return elements[0];
        default : return elements;
    }
}

const NOT_ID = "아이디를 입력하지 않았습니다";
const NOT_PWD = "비밀번호를 입력하지 않았습니다."

function formCheck() {
   const form = $('form');
   const loginMessageElement = $('.login-message');
   if(!form.userId.value) {
       loginMessageElement.innerText = NOT_ID;
   } else if(!form.password.value) {
       loginMessageElement.innerText = NOT_PWD;
   } else {
       form.submit();
   }
}

window.onload = e => {
   const savedUserIdCookie = document.cookie.split('; ').find( v => v.includes('savedUserId'));
   if(savedUserIdCookie) {
       const savedUserId = savedUserIdCookie.split('=')[1];
       if(savedUserId) {
           $('input[name=userId]').value = savedUserId;
           $('input[name=isSavedUserId]').checked = true;
       }
   }
};

$('.login-submit-btn').addEventListener('click', formCheck);