import throttle from 'lodash.throttle';
import { save, load } from './local-storage';

const formEl = document.querySelector('.feedback-form');
const formData = {};

const KEY_FORM_STATE = 'feedback-form-state';

formEl.addEventListener('input', throttle(inputDataToForm, 500));
formEl.addEventListener('submit', sendData);
window.addEventListener('DOMContentLoaded', loadData);

function inputDataToForm(e) {
  const inputValue = e.target.value.trim();

  if (inputValue !== '') {
    formData[e.target.name] = inputValue;
    save(KEY_FORM_STATE, formData);
  }
}

function sendData(e) {
  e.preventDefault();

  if (Object.keys(formData).length === 0) {
    return;
  } else if (Object.keys(formData).length < 2) {
    alert('Заповніть усі поля!');
    return;
  }

  console.log(formData);
  e.currentTarget.reset();
  localStorage.removeItem(KEY_FORM_STATE);
  Object.keys(formData).forEach(key => delete formData[key]);
}

function loadData() {
  const dataInputs = load(KEY_FORM_STATE);

  if (dataInputs) {
    Object.assign(formData, dataInputs);

    formEl.querySelector('input[name="email"]').value = dataInputs.email;
    formEl.querySelector('textarea[name="message"]').value = dataInputs.message;
  }
}
