const select_options = [
  {
    value: '',
    name: '이메일 선택'
  },
  {
    value: 'naver.com',
    name: 'naver.com'
  },
  {
    value: 'hanmail.com',
    name: 'hanmail.com'
  },
  {
    value: 'nate.com',
    name: 'nate.com'
  },
  {
    value: 'hotmail.com',
    name: 'hotmail.com'
  },
  {
    value: 'gmail.com',
    name: 'gmail.com'
  },
  {
    value: '',
    name: '직접입력'
  }
];

class SignUp {
  attachSelectOptions() {
    const select = document.querySelector('.select-input');
    const option_tags = select_options.reduce((tags, option) => 
      tags += `<option value="${option.value}">${option.name}</option>`, 'tags'
    );
    select.insertAdjacentHTML('afterBegin', option_tags);
  }
}

const signUp = new SignUp();
signUp.attachSelectOptions();

