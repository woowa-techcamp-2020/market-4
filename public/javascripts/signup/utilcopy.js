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

const timer = new function() {
  this.interval = null;

  this.start = function (callback) {
    if (this.interval) {
      this.clear();
    }
    this.interval = setInterval(() => {
      callback();
    },1000);
  }

  this.clear = function() {
    clearInterval(this.interval);
  }
}

export default timer;


export {
  textMessage, errorElement, addError, timer
}