const $fetch = new function() {
  this.checkId = async function(value) {
    return new Promise((resolve, reject) => {
      fetch('/signup/comfirmId', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          'userId': value
        })
      })
      .then(response => response.text())
      .then(result => {
        if (JSON.parse(result).isUser) {
          resolve({
            success: false,
            message:'이미 사용중인 아이디 입니다. 다른 아이디를 입력해 주세요.'
          });
        } else {
          resolve({
            success: true,
            message: '입력하신 아이디로 사용이 가능합니다.'
          });
        }
      });
    });
  }

  this.sendForm = async function(form) {
    return new Promise((resolve, reject) => {
      fetch('/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })
      .then(response => response.text())
      .then(result => {
        resolve(JSON.parse(result));
      });
    });
  }
}

export default $fetch;