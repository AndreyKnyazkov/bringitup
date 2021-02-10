export default class Form {
  constructor (forms) {
    this.forms = document.querySelectorAll(forms);
    //messages
    this.inputs = document.querySelectorAll('input');
    this.message = {
      loading: 'Loading...',
      success: 'Thank you for the request!',
      failure: 'Error'
    };
    //php
    this.path = 'assets/question.php';

  }

  checkMailInputs () {
    const mailInputs = document.querySelectorAll('[type="email"]');

    mailInputs.forEach(input => {
      input.addEventListener('keypress', function (e) {
        if (e.key.match(/[^a-z 0-9 @ \.]/)) {
          e.preventDefault();
        }
      });
    });
  }

  clearInputs() {
    this.inputs.forEach(item => {
      item.value = '';
    });
  }

  //the function helps us to send requests
  //async to data from the form sends correct
  async postData (url, data) {
    //fetch
    let res = await fetch(url, {
      method: "POST",
      body: data
    });

    //обрабатываем промис
    return await res.text();
  }

  initMask () {
    let setCursorPosition = (pos, elem) => {
    //focus on the elem
    elem.focus();
    if (elem.setSelectionRange) {
      //start and end position
      elem.setSelectionRange(pos, pos);
    //if it not works write a polyfill
    } else if (elem.createTextRange) {
      //create a range
      let range = elem.createTextRange();
      //it unify the first and the second position
      range.collapse(true);
      //selection endpoint
      range.moveEnd('character', pos);
      //selection startpoint
      range.moveStart('character', pos);
      //select this!
      range.select();
    }
  };

  //function to create a mask
  function createMask(event) {
    let matrix = '+1 (___) ___-____',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');

        if (def.length >= val.length) {
          val = def;
        }

        this.value = matrix.replace(/./g, function (a) {
          return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });
        if (event.type === 'blur') {
          if (this.value.length == 2) {
            this.value = '';
          }
        } else {
          setCursorPosition(this.value.length, this);
        }
  }

  let inputs = document.querySelectorAll('[name="phone"]');

  inputs.forEach(input => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
  });
  }

init() {
  //initMask
  this.initMask();
  //for mail
  this.checkMailInputs();

  this.forms.forEach(item => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.style.cssText = `
        margin-top: 15px;
        font-size: 18px;
        color: grey;
      `;
      item.parentNode.appendChild(statusMessage);

      statusMessage.textContent = this.message.loading;

      const formData = new FormData(item);

      this.postData(this.path, formData)
          .then(res => {
            console.log(res);
            statusMessage.textContent = this.message.success;
          })
          .catch(() => {
            statusMessage.textContent = this.message.failure;
          })
          .finally(() => {
            this.clearInputs();
            setTimeout(() => {
              statusMessage.remove();
            }, 6000);
          }, 6000);
    });
  });
}

}