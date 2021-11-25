import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector('.feedback-form'),
    email: document.querySelector("input"),
    text: document.querySelector("textarea"),
}

const storage_key = 'feedback-form-state';
const formData = {};
refs.form.addEventListener('input', throttle(formInput, 500));
refs.form.addEventListener('submit', onFormSubmit);


if (localStorage[storage_key]) {
    const localData = JSON.parse(localStorage[storage_key]);
    refs.email.value = localData.email;
    refs.text.value = localData.text;
}

function formInput() {
    const formData = new FormData(refs.form);

    formData.forEach((value, name) => {
        formData[name] = value;
        localStorage.setItem(storage_key, JSON.stringify(formData));
    });
}

function onFormSubmit(event) {
    event.preventDefault();
    try {
        console.log(JSON.parse(localStorage.getItem(storage_key)));
      } catch (err) {
        console.log("error");
      }

    localStorage.clear();
    refs.email.value = "";
    refs.text.value = "";
}

function reloadPage() {
    const savedMessage = JSON.parse(localStorage.getItem(storage_key));
    if (savedMessage) {
        refs.form.email.value = JSON.parse(localStorage.getItem(storage_key)).email,
        refs.form.message.value = JSON.parse(localStorage.getItem(storage_key)).message;
    }
}

reloadPage();