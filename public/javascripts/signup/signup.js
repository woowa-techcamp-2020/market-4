import postcode from './postcode.js';
import listener from './listener.js';
import check from './checkSignup.js';
import {textMessage, errorElement, addError, Timer} from './util.js';
import $fetch from '../fetch.js';

const timer = new Timer();
const $ = document.querySelector.bind(document);

postcode.oncomplete = function(data) {
  $("input[name='postcode']").value = data.zonecode;
  $("input[name='address1']").value = data.address;
}

listener.click($("input[name='postcode']"),()=> {
  postcode.open();
});

listener.click($("#find-postcode"),()=> {
  postcode.open();
});

listener.click($("input[name='address1']"),()=> {
  postcode.open();
});

listener.focusout($("input[name='userid']"), async(element) => {
  await check.userid(element);
});

listener.focusout($("input[name='password']"), (element) => {
  check.password(element);
});

listener.focusout($("input[name='check_password']"), (element) => {
  check.check_password(element);
});

listener.focusout($("input[name='email_id']"), (element) => {
  check.email_id(element);
});

listener.focusout($("input[name='email_domain']"), (element) => {
  check.email_domain(element);
});

listener.focusout($("input[name='name']"), (element) => {
  check.name(element);
});

listener.focusout($("input[name='phone']"), (element) => {
  check.phone(element);
});

listener.keyup($("input[name='phone']"), (element) => {
  element.value = element.value.replace(/[^0-9]/g,"");
  if (element.value.length > 0) {
    $('.phone-button').removeAttribute("disabled");
  } else {
    $('.phone-button').setAttribute('disabled', true);
  }
});

listener.click($("label[for='check-optional-input']"), (element) => {
  const postcode = $("input[name='postcode']");
  const address1 = $("input[name='address1']");
  const address2 = $("input[name='address2']");
  const btn = $("#find-postcode");
  const checked = !($("#check-optional-input").checked);
  if (checked) {
    postcode.removeAttribute('disabled');
    address1.removeAttribute('disabled');
    address2.removeAttribute('disabled');
    btn.removeAttribute('disabled');
    postcode.classList.remove('disabled-input');
    address1.classList.remove('disabled-input');
    address2.classList.remove('disabled-input');
  } else {
    address1.setAttribute('disabled', true);
    address2.setAttribute('disabled', true);
    postcode.setAttribute('disabled', true);
    btn.setAttribute('disabled', true);
    postcode.classList.add('disabled-input');
    address1.classList.add('disabled-input');
    address2.classList.add('disabled-input');
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


listener.click($terms_all, (element) => {
  if (!all_check.checked) {
    essential_check.checked = true;
    ad_check.checked = true;
  } else {
    essential_check.checked = false;
    ad_check.checked = false;
  }
});

listener.click($essential_label, (element) => {
  if (!essential_check.checked && ad_check.checked) {
    all_check.checked = true;
  } else if (essential_check.checked) {
    all_check.checked = false;
  }
});

listener.click($ad_label, (element) => {
  if (!ad_check.checked && essential_check.checked) {
    all_check.checked = true;
  } else if (ad_check.checked) {
    all_check.checked = false;
  }
});

listener.change($('select'), (element) => {
  const email_domain =  $("input[name='email_domain']");
  const select =  $('select').options[$('select').selectedIndex];
  email_domain.value = select.value;
  addError(email_domain, {success: true}, $("input[name='email_id']"));
  if(select.textContent === '직접입력') {
    email_domain.removeAttribute('disabled');
    email_domain.classList.remove('email-form');
  } else {
    email_domain.classList.add('email-form');
    email_domain.setAttribute('disabled', true)
  }
});


listener.keyup($(".assign-input"), element => {
  element.value = element.value.replace(/[^0-9]/g,"");
});

listener.click($(".phone-button"), ele => {
  $modal.open();
  let count = 120;
  ele.textContent = '재전송';
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
      ele.textContent = '인증 받기';
      timer.clear();
    }
  }, 1000);
});

listener.focusout($('.assign-input'), element => {
  const res = check.check_num(element);
});

listener.click($('.assign-button'), element => {
  const res = check.assign_num($('.assign-input'));
});


listener.click($('.sign-up-confirm-btn'), async (element) => {
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
