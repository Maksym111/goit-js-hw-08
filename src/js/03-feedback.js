import throttle from 'lodash.throttle';
import { save, load } from './local-storage';

const formEl = document.querySelector('.feedback-form');

const KEY_FORM_STATE = 'feedback-form-state';
const formData = { ...load(KEY_FORM_STATE) };

formEl.addEventListener('input', throttle(inputDataToForm, 500));
formEl.addEventListener('submit', sendData);
window.addEventListener('DOMContentLoaded', loadData);

function inputDataToForm(e) {
  const inputValue = e.target.value.trim();

  formData[e.target.name] = inputValue;
  save(KEY_FORM_STATE, formData);
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
  const email = formData.email;
  const message = formData.message;

  if (email) {
    formEl.querySelector('input[name="email"]').value = email;
  } else formEl.querySelector('input[name="email"]').value = '';

  if (message) {
    formEl.querySelector('textarea[name="message"]').value = message;
  } else formEl.querySelector('textarea[name="message"]').value = '';
}
