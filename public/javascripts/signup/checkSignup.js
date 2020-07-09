import validator from '../validator.js';
import {textMessage, errorElement, addError} from './util.js';

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
    addError(element, res, document.querySelector("input[name='email_id']"));
    return res;
  }

  this.name = function(element) {
    const res = validator.name(element.value);
    errorElement(element, res);
    return res;
  }

  this.phone = function(element) {
    const res = validator.phone(element.value);
    setTimeout(() => {
      errorElement(element, res);
      if (res.success) {
        document.querySelector('.phone-button').classList.remove('prevent-event');
      } else {
        document.querySelector('.phone-button').classList.add('prevent-event');
      }
    }, 10);
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
       document.querySelector(".phone-button").textContent = '인증 완료';
       document.querySelector(".phone-button").setAttribute('disabled', true);
       document.querySelector('.sub-phone-form').classList.add('display-none');
    }
    return res;
  }

  this.postcode = function(element) {
    const res = validator.postcode(element.value);
    return res;
  }

  this.address1 = function(element) {
    const res = validator.postcode(element.value);
    return res;
  }

  this.address2 = function(element) {
    const res = validator.postcode(element.value);
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
  

};

export default check;