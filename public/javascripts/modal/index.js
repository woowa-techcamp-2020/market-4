const $modal = new function () {

  this.$modal = document.querySelector('.modal-area');

  document.querySelector('#modal-confirm').addEventListener('click',(e) => {
    this.close();
  });

  this.open = function() {
    this.$modal.classList.add('modal-visible');
  }

  this.close = function() {
    if (this.$modal.classList.contains('modal-visible')) {
      this.$modal.classList.remove('modal-visible');
    }
  }
}