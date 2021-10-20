import refs from './refs.js';
import markupForm from './markupForm.js';

const { inputUploadEl, inputUploadGr, formContainerRef, resetBtnEl } = refs;

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
    inputUploadGr.insertAdjacentHTML(
      'afterend',
      '<div class="alert alert-danger">Загрузите файл в формате JSON</div>',
    );
  }
}

resetBtnEl.addEventListener('click', () => {
  inputUploadGr.classList.remove('visually-hidden');
  formContainerRef.classList.add('visually-hidden');
});
