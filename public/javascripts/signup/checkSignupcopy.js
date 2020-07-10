import validator from '../validator.js';

const textMessage = function(message) {
  return `<div class="text-message">${message}</div>`;
}
const errorMessage = function(message) {
  return `<div class="text-message error-message">${message}</div>`;
}

const checkElement = function(border_ele, msg_ele = border_ele) {
  if (border_ele.classList.contains('error-border')) {
    border_ele.classList.remove('error-border');
  }
  if (msg_ele.parentNode.lastChild.classList.contains('text-message')) {
    msg_ele.parentNode.removeChild(msg_ele.parentNode.lastChild);
  }
}

const errorElement = function(border_ele, res, msg_ele = border_ele) {
  checkElement(border_ele, msg_ele);
  if (!res.success) {
    border_ele.classList.add('error-border');
    msg_ele.parentNode.insertAdjacentHTML('beforeEnd', errorMessage(res.message));
  }
}

const check = new function() {
  this.userid = async (element) => {
    const res = await validator.userid(element.value);
    errorElement(element, res);
    if (res.success) {
      element.insertAdjacentHTML('afterEnd', textMessage(res.message));
    }
    return res;
  }

  this.password = function(element) {
    const res = validator.password(element.value);
    errorElement(element, res);
    return res;
  }

  this.check_password = function(element) {
    const res = validator.check_password(element.value);
    errorElement(element, res);
    return res;
  }
  this.email_id = function(element) {
    const res = validator.email_id(element.value);
    errorElement(element, res);
    return res;
  }

  this.email_domain = function(element) {
    const res = validator.email_domain(element.value);
    errorElement(element, res, document.querySelector("input[name='email_id']"));
    return res;
  }

  this.name = function(element) {
    const res = validator.name(element.value);
    errorElement(element, res);
    return res;
  }

  this.phone = function(element) {
    const res = validator.phone(element.value);
    errorElement(element, res);
    if (res.success) {
      document.querySelector('.phone-button').classList.remove('prevent-event');
    } else {
      document.querySelector('.phone-button').classList.add('prevent-event');
    }
    return res;
  }

  this.check_num = function(element) {
    const res = validator.check_num(element.value);
    errorElement(element, res);
    return res;
  }

  this.assign_num = function(element) {
    const res = validator.assign_num(element.value)
    errorElement( document.querySelector('.assign-input'), res);
    if(res.success) {
      //
      if (document.querySelector("input[name='phone']").classList.contains('error-border')) {
        document.querySelector("input[name='phone']").classList.remove('error-border');
      }
      if (document.querySelector("input[name='phone']").parentNode.lastChild.classList.contains('text-message')) {
        document.querySelector("input[name='phone']").parentNode.removeChild(document.querySelector("input[name='phone']").parentNode.lastChild);
      }
      //
       document.querySelector(".phone-button").textContent = '인증 완료';
       document.querySelector(".phone-button").setAttribute('disabled', true);
       document.querySelector("input[name='phone']").setAttribute('readonly',true);
       document.querySelector('.sub-phone-form').classList.add('display-none');
    }
    return res;
  }

  this.postcode = function(element) {
    const res = validator.postcode(element.value);
    return res;
  }

  this.address1 = function(element) {
    const res = validator.address1(element.value);
    return res;
  }

  this.address2 = function(element) {
    const res = validator.address2(element.value);
    return res;
  }

  this.essential = function(element) {
    const res = validator.essential(element.checked);
    return res;
  }

  this.advcheck = function(element) {
    const res = validator.advcheck(element.checked);
    return res;
  }

  this.confirm_number = function(element) {
    const res = validator.confirm_number(element.value);
    errorElement(element, res);
    return res;
  }
  

};

export default check;
