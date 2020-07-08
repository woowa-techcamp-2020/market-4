const $ = document.querySelector.bind(document);
// // class 쓰지말고 함수 쓰기

const $fetch = async function(value) {
  return new Promise((resolve, reject) => {
    fetch('/signup/comfirmId', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'userId': value
      })
    }).then(function(response) {
      return response.text();
    }).then(function(result) {

      if (JSON.parse(result).isUser) {
        resolve({
          success: false,
          message:'이미 사용중인 아이디 입니다. 다른 아이디를 입력해 주세요.'
        });
      } else {
        resolve({
          success: true,
          message: '입력하신 아이디로 사용이 가능합니다.'
        });
      }
    });
  });
}

// class Validator {
//   async userId(value) {
//     const check = /^[\_\-a-z0-9]{4,20}$/;
//     if (value.length === 0) {
//       return this.reject('아이디를 입력해 주세요.');
//     } else if (!check.test(value)) {
//       return this.reject('아이디는 영소문자와 숫자, 특수기호(_, -)로 4자~20자 사이로 입력해 주세요.');
//     } else {
//       const result = await $fetch(value);
//       return result;
//     }
//   }

//   password(value) {
//     if (value.length < 8) {
//       return this.reject('비밀번호는 영문과 숫자를 포함하여 8~20자로 입력해 주세요.');
//     }
//     return this.resolve();
//   }

//   check_password(value1, value2) {
//     if (value1.length === 0 && value2.length === 0) {
//       return this.reject('비밀번호 확인을 위해 한번 더 입력해 주세요');
//     } else if (value1 === value2) {
//       return this.resolve();
//     } else {
//       return this.reject('위 비밀번호와 일치하지 않습니다. 다시 입력해 주세요.');
//     }
//   }

//   email_id(value) {
//     const check = /^[A-Za-z0-9+]*$/;
//     if(value.length === 0) {
//       return this.reject('이메일 주소를 입력해 주세요.');
//     } else if (!check.test(value)) {
//       return this.reject('이메일 주소를 확인해 주세요.');
//     }
//     return this.resolve();
//   }

//   email_domain(value) {
//     if (value.length === 0) {
//       return this.reject('이메일 주소를 입력해 주세요.');
//     }
//     return this.resolve();
//   }

//   name(value) {
//     const check = /[0-9~!@#$%^&*()_+|<>?:{}]/;
//     if (value.length === 0) {
//       return this.reject('이름을 입력해 주세요.');
//     } else if (value.length < 2) {
//       return this.reject('2자 이상으로 입력해 주세요.');
//     } else if (check.test(value)) {
//       return this.reject('이름에 특수문자, 숫자는 입력하실 수 없습니다. 다시 입력해 주세요.');
//     }
//     return this.resolve();
//   }

//   phone(value) {
//     const check = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
//     if (value.length === 0) {
//       return this.reject('휴대폰 번호를 입력해 주세요.');
//     } else if (!check.test(value)) {
//       return this.reject('휴대폰 번호를 확인해 주세요.');
//     }
//     return this.resolve();
//   }

//   resolve(message = '') {
//     return {
//       success: true,
//       message
//     }
//   }

//   reject(message) {
//     return {
//       success: false,
//       message
//     };
//   }
// }

class SignUp {

  constructor() {
    this.userid = $("input[name='userid']");
    this.password = $("input[name='password']");
    this.email_id = $("input[name='email_id']");
    this.email_domain = $("input[name='email_domain']");
    this.name = $("input[name='name']");
    this.phone = $("input[name='phone']");
    this.postcode = $("input[name='postcode']");
    this.address1 = $("input[name='address1']");
    this.address2 = $("input[name='address2']");
    this.advcheck = $("input[name='advcheck']");
  
    this.checkPassword = $("input[id='check-password']");

    this.selectOptionInit();
    this.formInit();
    this.eventInit();
  }

  formInit() {
    const $address_label = $("label[for='check-optional-input']");
    const $terms_all =  $("label[for='all']");
    const $essential_label = $("label[for='essential']");
    const $ad_label = $("label[for='receive_optional']");
    const all_check = $("#all");
    const essential_check = $("#essential");
    const ad_check = $("#receive_optional");
    
    $address_label.addEventListener('click', (e) => {
      const checked = !($("#check-optional-input").checked);
      if (checked) {
        this.address2.classList.remove('prevent-event');
        this.postcode.classList.remove('disabled-input');
        this.address1.classList.remove('disabled-input');
        this.address2.classList.remove('disabled-input');
      } else {
        this.address2.classList.add('prevent-event');
        this.postcode.classList.add('disabled-input');
        this.address1.classList.add('disabled-input');
        this.address2.classList.add('disabled-input');
        this.address2.value = '';
      }
    });


    // 약관 동의
    $terms_all.addEventListener('click', (e) => {
      if (!all_check.checked) {
        essential_check.checked = true;
        ad_check.checked = true;
      } else {
        essential_check.checked = false;
        ad_check.checked = false;
      }
    });

    $essential_label.addEventListener('click', (e) => {
      if (!essential_check.checked && ad_check.checked) {
        all_check.checked = true;
      } else if (essential_check.checked) {
        all_check.checked = false;
      }
    });

    $ad_label.addEventListener('click', (e) => {
      if (!ad_check.checked && essential_check.checked) {
        all_check.checked = true;
      } else if (ad_check.checked) {
        all_check.checked = false;
      }
    });
    
  }

  changeSelect() {
    const $select = $('select');
    const select =  $select.options[$select.selectedIndex];
    this.email_domain.value = select.value;
    if(select.innerHTML === '직접입력') {
      this.email_domain.classList.remove('prevent-event');
      this.email_domain.classList.remove('email-form');
    } else {
      this.email_domain.classList.add('email-form');
      if (!this.email_domain.classList.contains('prevent-event')) {
        this.email_domain.classList.add('prevent-event');
      }
    } 
  }


  eventInit() {
    this.addErrorListener(this.userid, async () => {
      const res = await validator.userId(this.userid.value);
      this.errorEvent(this.userid, res);
      if (res.success) {
        this.userid.insertAdjacentHTML('afterEnd', this.textMessage(res.message));
      }
    });

    this.addErrorListener(this.password, () => {
      const res = validator.password(this.password.value);
      this.errorEvent(this.password, res);
    });

    this.addErrorListener(this.checkPassword, () => {
      const res = validator.check_password(this.checkPassword.value, this.password.value);
      this.errorEvent(this.checkPassword, res);
    });

    this.addErrorListener(this.email_id, () => {
      const res = validator.email_id(this.email_id.value);
      this.errorEvent(this.email_id, res);
    });

    this.addErrorListener(this.email_domain, () => {
      const res = validator.email_domain(this.email_domain.value);
      this.errorEvent(this.email_domain, res);
      // 여기 수정해야해
      // select focusout 되면 메시지 띄워야함.
      //     color: #bcc0cf;

    });

    this.addErrorListener(this.name, () => {
      const res = validator.name(this.name.value);
      this.errorEvent(this.name, res);
    });

    this.addErrorListener(this.phone, () => {
      const res = validator.phone(this.phone.value);
      this.errorEvent(this.phone, res);
      if (res.success) {
        $('.phone-button').classList.remove('prevent-event');
      } else {
        $('.phone-button').classList.add('prevent-event');
      }
    });

    this.phone.addEventListener('keyup', (e) => {
      this.phone.value = this.phone.value.replace(/[^0-9]/g,"");
      if (this.phone.value.length > 0) {
        $('.phone-button').removeAttribute("disabled");
      } else {
        $('.phone-button').setAttribute('disabled', true);
      }
    }, false);

    // $(".phone-button").addEventListener('click', () => {
    //   $('.sub-phone-form').classList.remove('display-none');
    //   timer();
    // });

    // const $assign_button = $(".assign-input");
    // $assign_button.addEventListener('keyup', () =>{
    //   $assign_button.value = $assign_button.value.replace(/[^0-9]/g,"");
      // 인증번호를 입력해 주세요.
      // 인증번호가 잘못 입력되었습니다. 확인 후 다시 입력해 주세요.

      // 얘는 assign 없어진 후에
      // 입력시간을 초과하였습니다. 인증번호 재전송 후 다시 시도해 주세요.
    // })
  }


  addErrorListener(element, callback) {
    element.addEventListener('focusout', e => {
      if (element.classList.contains('error-border')) {
        element.classList.remove('error-border');
      }
      if (element.parentNode.lastChild.classList.contains('text-message')) {
        element.parentNode.removeChild(element.parentNode.lastChild);
      }
      callback();
    });
  }

  errorEvent(element, res) {
    if (!res.success) {
      element.classList.add('error-border');
      element.insertAdjacentHTML('afterEnd', this.errorMessage(res.message));
    }
  }

  textMessage(message) {
    return `<div class="text-message">${message}</div>`;
  }

  errorMessage(message) {
    return `<div class="text-message error-message">${message}</div>`;
  }

  selectOptionInit() {
    // const option_tags = select_options.reduce((tags, option) => 
    //   tags += `<option value="${option.value}">${option.name}</option>`, 'tags'
    // );
    // $('.select-input').insertAdjacentHTML('afterBegin', option_tags);
  }
}

// const validator = new Validator();
const signUp = new SignUp();




const test = {
  userid : "dkssud",
  password : "dkssud1234",
  email: "dkssud@gmail.com",
  name : "이수정",
  phone : "010-1234-1234",
  postcode : "12345",
  address1 : "서울특별시",
  address2 : "몽촌토성역",
  advcheck : "true",
}

$('.sign-up-confirm-btn').addEventListener('click', () => {
  fetch('/signup', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(test)
  }).then((response) => {
    return response.text();
  }).then((response) => {
    console.log(response);
  });

});