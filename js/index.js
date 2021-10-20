import refs from './refs.js';
import markupForm from './markupForm.js';
import inputCheckByMask from './inputCheckByMask.js';
import previewImg from './previewImg.js';

window.inputCheckByMask = inputCheckByMask;
window.previewImg = previewImg;

const { inputUploadEl, inputUploadGr, formContainerRef, resetBtnEl, formEl } =
  refs;

inputUploadEl.addEventListener('change', readFile);

function readFile() {
  const currentFile = inputUploadEl.files[0];

  let uploadedFile = new FileReader();
  uploadedFile.readAsText(currentFile);

  uploadedFile.onload = function () {
    parseJSON(uploadedFile.result);
    // console.log(uploadedFile.result);
  };

  uploadedFile.onerror = function () {
    console.log(uploadedFile.error);
  };
}

function parseJSON(data) {
  try {
    const result = JSON.parse(data);

    inputUploadGr.classList.add('visually-hidden');
    formContainerRef.classList.remove('visually-hidden');
    markupForm(result);
  } catch (error) {
    console.log(error);
    inputUploadGr.insertAdjacentHTML(
      'afterend',
      '<div class="alert alert-danger">Загрузите файл в формате JSON</div>',
    );
    setTimeout(function () {
      inputUploadGr.nextSibling.classList.add('visually-hidden');
    }, 2000);
  }
}

resetBtnEl.addEventListener('click', () => {
  inputUploadGr.classList.remove('visually-hidden');
  formContainerRef.classList.add('visually-hidden');
  formEl.innerHTML = '';
});
