function previewImg(elem) {
  let oldPreviewContainer =
    elem.parentElement.getElementsByClassName('preview-container');
  while (oldPreviewContainer.length > 0) {
    oldPreviewContainer[0].parentNode.removeChild(oldPreviewContainer[0]);
  }

  let currentPreviewContainer = document.createElement('div');
  currentPreviewContainer.classList.add('preview-container');

  const currentFiles = elem.files;
  const allowedTypes = elem.accept
    .split(', ')
    .map(type => type.replace('.', ''));
  //console.log(allowedTypes);
  for (const file of currentFiles) {
    let isAnyFileCorrectType = false;
    //console.log(file.type);

    for (const iterator of allowedTypes) {
      if (file.type.includes(iterator)) {
        isAnyFileCorrectType = true;

        let readerImg = new FileReader();
        readerImg.readAsDataURL(file);
        readerImg.onload = function () {
          let preview;
          if (file.type.includes('image/')) {
            preview = document.createElement('img');
            preview.setAttribute('src', readerImg.result);
          } else {
            preview = document.createElement('span');
            preview.textContent = file.name;
          }

          preview.classList.add('preview');
          currentPreviewContainer.appendChild(preview);
        };
      }
    }

    if (!isAnyFileCorrectType) {
      elem.value = '';
      alert(`Допустимые форматы файлов: ${elem.accept}`);
    }
  }

  elem.after(currentPreviewContainer);
}

export default previewImg;
