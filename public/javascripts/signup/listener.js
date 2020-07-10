const listener = new function() {
  this.click = function(ele, callback) {
    ele.addEventListener('click', e => {
      callback(ele);
    })
  }

  this.focusout = function(ele, callback) {
    ele.addEventListener('focusout', e => {
      callback(ele);
    });
  }

  this.keyup = function(ele, callback) {
    ele.addEventListener('keyup', e => {
      callback(ele);
    });
  }

  this.change = function(ele, callback) {
    ele.addEventListener('change', e => {
      callback(ele);
    });
  }
}

export default listener;