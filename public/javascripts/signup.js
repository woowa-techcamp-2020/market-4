const select_options = [
  {
    value: '',
    name: '이메일 선택'
  },
  {
    value: 'naver.com',
    name: 'naver.com'
  },
  {
    value: 'hanmail.com',
    name: 'hanmail.com'
  },
  {
    value: 'nate.com',
    name: 'nate.com'
  },
  {
    value: 'hotmail.com',
    name: 'hotmail.com'
  },
  {
    value: 'gmail.com',
    name: 'gmail.com'
  },
  {
    value: '',
    name: '직접입력'
  }
];

const $ = document.querySelector.bind(document);

class Validator {
  userId(value) {
    const check = /^[A-Za-z0-9+]{4,12}$/;
    if (value.length === 0) {
      return this.reject('아이디를 입력해 주세요.');
    } else if (!check.test(value)) {
      return this.reject('아이디는 영문과 숫자로 4자~20자 사이로 입력해 주세요.');
    } else {
      return this.resolve();
    }
  }

  password(value) {
    if (value.length < 8) {
      this.reject('비밀번호는 영문과 숫자를 포함하여 8~20자로 입력해 주세요.');
    }
    return this.resolve();
  }

  check_password(value1, value2) {
    if (value1.length === 0 && value2.length === 0) {
      return this.reject('');
    } else if (value1 === value2) {
      return this.resolve();
    } else {
      return this.reject('위 비밀번호와 일치하지 않습니다. 다시 입력해 주세요.');
    }
  }

  resolve() {
    return {
      success: true
    }
  }

  reject(message) {
    return {
      success: false,
      message
    };
  }
}

const validator = new Validator();

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

    this.attachSelectOptions();
    this.init();
  }

  init() {
    this.addErrorListener(this.userid, () => {
      if (this.userid.value === '') {
        this.errorEvent(this.userid, '아이디를 입력해 주세요.');
      } else if (this.userid.value.length < 4) {
        this.errorEvent(this.userid, '아이디는 영문과 숫자로 4자~20자 사이로 입력해 주세요.');
      }
      // 중복 검사 o : 입력하신 아이디로 사용이 가능합니다
      // 중복 검사 x : 이미 사용중인 아이디 입니다. 다른 아이디를 입력해 주세요.
    });
    
    this.addErrorListener(this.password, () => {
      const res = validator.password(this.password.value);
      this.removeErrorElement(this.password);
      if (!res.success) {
        this.errorEvent(this.password, res.message);
      }
    });

    this.addErrorListener(this.checkPassword, () => {
      const res = validator.check_password(this.checkPassword.value, this.password.value);
      this.removeErrorElement(this.checkPassword);
      if (!res.success) {
        this.errorEvent(this.checkPassword, res.message);
      }
    });
  }

  removeErrorElement(element) {
    if (element.classList.contains('error-border')) {
      element.classList.remove('error-border');
    }
    if (element.parentNode.lastChild.classList.contains('text-message')) {
      element.parentNode.removeChild(element.parentNode.lastChild);
    }
  }

  addErrorListener(element, callback) {
    element.addEventListener('focusout', e => {
      this.removeErrorElement(element);
      callback();
    });
  }

  errorEvent(element, text) {
    element.classList.add('error-border');
    element.insertAdjacentHTML('afterEnd', this.errorMessage(text));
  }

  textMessage(message) {
    return `<div class="text-message">${message}</div>`;
  }

  errorMessage(message) {
    return `<div class="text-message error-message">${message}</div>`;
  }

  attachSelectOptions() {
    const option_tags = select_options.reduce((tags, option) => 
      tags += `<option value="${option.value}">${option.name}</option>`, 'tags'
    );
    $('.select-input').insertAdjacentHTML('afterBegin', option_tags);
  }
}

const signUp = new SignUp();