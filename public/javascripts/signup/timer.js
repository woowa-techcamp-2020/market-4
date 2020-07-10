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