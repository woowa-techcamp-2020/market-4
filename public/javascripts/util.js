function Timer() {
  this.interval = null;

  this.start = function (callback, count) {
    if (this.interval) {
      this.clear();
    }
    this.interval = setInterval(() => {
      callback();
    },count);
  }

  this.clear = function() {
    clearInterval(this.interval);
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
  Timer, $, getValueInCookie, debouncing
}