// import validator from '../validator.js';
// import timer from './timer.js';
import check from './checkSignupcopy.js';
import $fetch from '../fetch.js';
import {textMessage, errorElement, addError, timer} from './utilcopy.js';

const $ = document.querySelector.bind(document);

const postcode = new daum.Postcode({
  oncomplete: function(data) {
    $("input[name='postcode']").value = data.zonecode;
    $("input[name='address1']").value = data.address;
  }
});


$("input[name='postcode']").addEventListener('click', () => {
  postcode.open();
}); 

$("input[name='address1']").addEventListener('click', () => {
  postcode.open();
}); 

$("input[name='address2']").addEventListener('click', () => {
  postcode.open();
}); 

$("input[name='userid']").addEventListener('focusout', async (ele) => {
  await check.userid(ele.target);
});

$("input[name='password']").addEventListener('focusout', (ele) => {
  check.password(ele.target);
});

$("input[name='check_password']").addEventListener('focusout', (ele) => {
  check.check_password(ele.target);
});

$("input[name='email_id']").addEventListener('focusout', (ele) => {
  check.email_id(ele.target);
});

$("input[name='email_domain']").addEventListener('focusout', (ele) => {
  check.email_domain(ele.target);
});

$("input[name='name']").addEventListener('focusout', (ele) => {
  check.name(ele.target);
});

$("input[name='phone']").addEventListener('focusout', (ele) => {
  check.phone(ele.target);
});

$("input[name='phone']").addEventListener('keyup', (ele) => {

  $("input[name='phone']").value = $("input[name='phone']").value.replace(/[^0-9]/g,"");
  if ($("input[name='phone']").value.length > 0) {
    $('.phone-button').removeAttribute("disabled");
  } else {
    $('.phone-button').setAttribute('disabled', true);
  }
});

$("label[for='check-optional-input']").addEventListener('click', (ele) => {
  const postcode = $("input[name='postcode']");
  const address1 = $("input[name='address1']");
  const address2 = $("input[name='address2']");
  const btn = $("#find-postcode");
  const checked = !($("#check-optional-input").checked);
  if (checked) {
    address2.classList.remove('prevent-event');
    postcode.classList.remove('disabled-input');
    address1.classList.remove('disabled-input');
    address2.classList.remove('disabled-input');
    btn.removeAttribute('disabled');
  } else {
    address2.classList.add('prevent-event');
    postcode.classList.add('disabled-input');
    address1.classList.add('disabled-input');
    address2.classList.add('disabled-input');
    btn.setAttribute('disabled', true);
    postcode.value = '';
    address1.value = '';
    address2.value = '';
  }
});

const $terms_all =  $("label[for='all']");
const $essential_label = $("label[for='essential']");
const $ad_label = $("label[for='receive_optional']");
const all_check = $("#all");
const essential_check = $("#essential");
const ad_check = $("#receive_optional");

$terms_all.addEventListener('click', (ele) => {
  if (!all_check.checked) {
    essential_check.checked = true;
    ad_check.checked = true;
  } else {
    essential_check.checked = false;
    ad_check.checked = false;
  }
});

$essential_label.addEventListener('click', (ele) => {
  if (!essential_check.checked && ad_check.checked) {
    all_check.checked = true;
  } else if (essential_check.checked) {
    all_check.checked = false;
  }
});

$ad_label.addEventListener('click', (ele) => {
  if (!ad_check.checked && essential_check.checked) {
    all_check.checked = true;
  } else if (ad_check.checked) {
    all_check.checked = false;
  }
});

$('select').addEventListener('change', (ele) => {
  const email_domain =  $("input[name='email_domain']");
  const select =  $('select').options[$('select').selectedIndex];
  email_domain.value = select.value;
  addError(email_domain, {success: true}, $("input[name='email_id']"));
  if(select.textContent === '직접입력') {
    email_domain.classList.remove('prevent-event');
    email_domain.classList.remove('email-form');
  } else {
    email_domain.classList.add('email-form');
    if (!email_domain.classList.contains('prevent-event')) {
      email_domain.classList.add('prevent-event');
    }
  }
});

$(".assign-input").addEventListener('keyup', (ele) => {
  $(".assign-input").value = $(".assign-input").value.replace(/[^0-9]/g,"");
});

$(".phone-button").addEventListener('click', (ele) => {
  $modal.open();
  let count = 120;
  ele.target.textContent = '재전송';
  $('.sub-phone-form').classList.remove('display-none');
  $('.phone-input').classList.remove('timer');
  timer.start(() => {
    count--;
    $('.timer').textContent = `${Math.floor(count / 60)}:${(Math.floor(count % 60)).toString().padStart(2, '0')}`;
    if (count < 0) {
      $('.timer').textContent = '2:00';
      $('.sub-phone-form').classList.add('display-none');
      errorElement($("input[name='phone']"), {
        success: false,
        message: '입력시간을 초과하였습니다.'
      })
      ele.target.textContent = '인증 받기';
      timer.clear();
    }
  });
});

$('.assign-input').addEventListener('focusout', (ele) => {
  const res = check.check_num(ele.target);
});

$('.assign-button').addEventListener('focusout', (ele) => {
  const res = check.assign_num($('.assign-input'));
});

$('.sign-up-confirm-btn').addEventListener('click', async (ele) => {
  $('.sign-up-confirm-btn').setAttribute('disabled', true);
  let confirm = true;
  const $form = $('form');
  const form = {};
  await Object.values($form.elements).forEach(async (field) => {
    if(field.name !== '') {
      form[field.name] = field.checked ? true : field.value;
      const res = await check[field.name]($(`input[name='${field.name}']`));
      if (!res.success) {
        confirm = false;
        return;
      }
    }
  });

  if (!check.confirm_number($(`input[name='phone']`))) {
    confirm = false;
  }

  if(confirm) {
    const res = await $fetch.sendForm(form);
    if (res.success) {
      location.href='/signup/complete';
    } else {
      // 서버 유효성 체크 잘못됨
      location.href='/signup';
    }
  } else {
    console.log('fail');
  }
  $('.sign-up-confirm-btn').removeAttribute('disabled');
});


// 페이지 이동 시 alert 창 띄우기
// window.onunload = function(e) {
//   console.log(e);
//   if(document.readyState=="complete"){
//     console.log('새로고침')
//     //새로고침

// } else if(document.readyState=="loading"){
//   console.log('페이지 이동')
//     //다른 페이지 이동

// }
//   // console.log(self);
//   var dialogText = 'Dialog text here';
//   e.returnValue = dialogText;
//   return dialogText;
// };
