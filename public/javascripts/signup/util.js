const textMessage = function(message) {
  return `<div class="text-message">${message}</div>`;
}
const errorMessage = function(message) {
  return `<div class="text-message error-message">${message}</div>`;
}
const errorElement = function(element, res) {
  addError(element, res, element);
}

const addError = function(border_ele, res, msg_ele) {
  if (border_ele.classList.contains('error-border')) {
    border_ele.classList.remove('error-border');
  }
  if (msg_ele.parentNode.lastChild.classList.contains('text-message')) {
    msg_ele.parentNode.removeChild(msg_ele.parentNode.lastChild);
  }
  if (!res.success) {
    border_ele.classList.add('error-border');
    msg_ele.parentNode.insertAdjacentHTML('beforeEnd', errorMessage(res.message));
  }
}


const $ = selector => {
  const elements = document.querySelectorAll(selector);
  switch(elements.length) {
      case 0 : return null;
      case 1 : return elements[0];
      default : return elements;
  }
}

const getValueInCookie = key => {
  const keyValue = document.cookie.split('; ').find( v => v.includes(key));
  let value;
  if(keyValue) {
      value = keyValue.split('=')[1];
  }
  return value;
}


const debouncing = (callback, mSeconds) => {
  let timer;
  return (e) => {
      if(!timer) {
        timer = setTimeout(() => {
          timer = null;
          callback(e);
        }, mSeconds);
      }
  }
}

export {
  textMessage, errorElement, addError, $, getValueInCookie, debouncing
}