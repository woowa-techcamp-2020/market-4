const $ = document.querySelector.bind(document);
const $assign_button = $(".assign-input");
const $timer = $('.timer');
const $sub_form = $('.sub-phone-form');

$assign_button.addEventListener('keyup', () =>{
  $assign_button.value = $assign_button.value.replace(/[^0-9]/g,"");
  // 인증번호를 입력해 주세요.
  // 인증번호가 잘못 입력되었습니다. 확인 후 다시 입력해 주세요.

  // 얘는 assign 없어진 후에
  // 입력시간을 초과하였습니다. 인증번호 재전송 후 다시 시도해 주세요.
});
let count = 5;

$(".phone-button").addEventListener('click', () => {
  $modal.open();
  $sub_form.classList.remove('display-none');
  count = 5;
  const timer = setInterval(() => {
    count--;
    $timer.innerHTML = `${Math.floor(count / 60)}:${(Math.floor(count % 60)).toString().padStart(2, '0')}`;
    if (count < 0) {
      $timer.innerHTML = '2:00';
      $sub_form.classList.add('display-none');
      clearInterval(timer);
    }
  }, 1000)
});

$('.assign-button').addEventListener('click', () => {
  count = 0;
});