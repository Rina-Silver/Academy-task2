import refs from './refs.js';
const { fileNameRef, formContainerRef, formEl } = refs;

function markupForm(data) {
  if (data.name) {
    const firstLetter = data.name.charAt(0).toUpperCase();
    const formName = data.name.replaceAll('_', ' ');
    fileNameRef.textContent = formName.replace(formName.charAt(0), firstLetter);
  }
  if (data.fields) {
    markupFields(data.fields);
  }
}

function typeChecked({ label, input }) {
  let attr = [];
  if (input.required) {
    attr.push('required');
  }
  if (input.checked === 'true') {
    attr.push('checked');
  }
  if (input.mask) {
    attr.push(`placeholder="${input.mask}"`);
  }
  if (input.placeholder) {
    attr.push(`placeholder="${input.placeholder}"`);
  }
  if (input.multiple) {
    attr.push(`multiple`);
  }
  if (input.filetype) {
    attr.push(`accept=".${input.filetype.join(', .')}"`);
  }
  attr = attr.join(' ');

  let markup = '';
  switch (input.type) {
    case 'text':
    case 'email':
    case 'password':
      markup = `<div class="form-floating mb-3">
        <label>${label}
        <input type="${input.type}" class="form-control" ${attr}></label>
      </div>`;
      break;
    case 'checkbox':
      markup = `<div class="form-check mb-3">
      <input id="checkInp" type="${input.type}" class="form-check-input" ${attr}>
      <label for="checkInp" class="form-check-label">${label}
      </div>`;
      break;
    case 'textarea':
      markup = `<div class="form-floating mb-3">
        <label>${label}
        <textarea type="${input.type}" class="form-control" ${attr}></textarea></label>
      </div>`;
      break;
    case 'file':
      markup = `<div class="form-label mb-3">
        <label class="form-label">${label}
        <input type="${input.type}" class="form-control" ${attr}></label>
      </div>`;

      break;
    case 'number':
      markup = `<div class="form-floating mb-3">
        <label>${label}
        <input type="text" class="form-control" ${attr}></label>
      </div>`;
      break;
    case 'color':
      let colorSet = [];

      input.colors.forEach(color => {
        colorSet.push(`<div class="form-check form-check-inline">
        <input type="radio" value="${color}" id="${color}" name="selectradio" class="form-check-input custom-checkbox">
        <label for="${color}" class="form-check-label color-label" style="background-color: ${color};"></label>
        </div>`);
      });
      markup = `<div class="form-floating mb-3">
        <label>${label}
        <div class="custom-field">
        ${colorSet.join('')}
        </div></label>
      </div>`;
      break;
  }

  return markup;
}

function markupFields(data) {
  data.map(el => {
    formEl.insertAdjacentHTML('beforeend', typeChecked(el));
  });
}

export default markupForm;
