const $select = $('select');
const id = $("input[name='email_id']");
const domian = $("input[name='email_domian']");

const changeSelect = function () {
  const select =  $select.options[$select.selectedIndex];
  domian.value = select.value;
  if(select.innerHTML === '직접입력') {
    domian.classList.remove('prevent-event');
    domian.classList.remove('email-form');
  } else {
    domian.classList.add('email-form');
    if (!domian.classList.contains('prevent-event')) {
      domian.classList.add('prevent-event');
    }
  } 
}