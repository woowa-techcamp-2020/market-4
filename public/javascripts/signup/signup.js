const $ = document.querySelector.bind(document);

const textMessage = function(message) {
  return `<div class="text-message">${message}</div>`;
}

const errorMessage = function(message) {
  return `<div class="text-message error-message">${message}</div>`;
}