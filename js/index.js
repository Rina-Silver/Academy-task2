import refs from './refs';

const { inputUploadEl } = refs;

inputUploadEl.addEventListener('change', readFile);

function readFile() {
  const currentFile = inputUploadEl.files[0];

  let reader = new FileReader();
  reader.readAsText(currentFile);

  reader.onload = function () {
    parseFile(reader.result);
  };

  reader.onerror = function () {
    console.log(reader.error);
  };
}
