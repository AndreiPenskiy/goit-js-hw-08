import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector('.feedback-form'),
    //input: document.querySelector('.feedback-form input'),
    //textarea: document.querySelector('.feedback-form textarea')
}

const storage_key = 'feedback-form-state';
const formData = {};

reloadPage();

refs.form.addEventListener('submit', onFormSubmit);
//записываем данные в local storage
refs.form.addEventListener('input', throttle(evt => {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(storage_key, JSON.stringify(formData))
}, 500)
)

//при сабмите формы
function onFormSubmit(evt) {
    evt.preventDefault();
    //console.log('Отправляем');
    try {
        console.log(JSON.parse(localStorage.getItem(storage_key)));
      } catch (err) {
        console.log("error");
      }
    evt.currentTarget.reset();
    localStorage.removeItem(storage_key);
}

//сохраняем данные в форме до сабмита
function reloadPage() {
    const savedMessage = JSON.parse(localStorage.getItem(storage_key));
    //console.log(savedMessage);
    if (savedMessage) {
        refs.form.email.value = JSON.parse(localStorage.getItem(storage_key)).email,
        refs.form.message.value = JSON.parse(localStorage.getItem(storage_key)).message;
    }
}