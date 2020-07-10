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

export {
  Timer
}