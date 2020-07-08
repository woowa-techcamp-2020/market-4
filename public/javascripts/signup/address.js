const postcode = $("input[name='postcode']");
const address1 = $("input[name='address1']");
const address2 = $("input[name='address2']");

const address_box_check = function() {
  const checked = ($("#check-optional-input").checked);
  if (checked) {
    address2.classList.remove('prevent-event');
    postcode.classList.remove('disabled-input');
    address1.classList.remove('disabled-input');
    address2.classList.remove('disabled-input');
  } else {
    address2.classList.add('prevent-event');
    postcode.classList.add('disabled-input');
    address1.classList.add('disabled-input');
    address2.classList.add('disabled-input');
    address2.value = '';
  }
}