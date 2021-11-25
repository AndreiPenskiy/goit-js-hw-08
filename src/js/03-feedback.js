import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea')
}

const storage_key = 'feedback-form-state';
const formData = {};

reloadPage();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(evt => {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(storage_key, JSON.stringify(formData))
}, 500)
)

//сохраняем данные в форме до сабмита
function reloadPage() {
    const savedMessage = JSON.parse(localStorage.getItem(storage_key));
    if (savedMessage) {
        refs.form.email.value = JSON.parse(localStorage.getItem(storage_key)).email,
        refs.form.message.value = JSON.parse(localStorage.getItem(storage_key)).message;
    }
}

//при сабмите формы
function onFormSubmit(evt) {
    evt.preventDefault();
        try {
        console.log(JSON.parse(localStorage.getItem(storage_key)));
      } catch (err) {
        console.log("error");
      }
    evt.currentTarget.reset();
    localStorage.removeItem(storage_key);
    formData = {};
    refs.form.removeEventListener('submit', onFormSubmit);
}
