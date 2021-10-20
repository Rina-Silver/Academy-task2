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
  //   if (data.references) {
  //     markupFields(data.references);
  //   }
}

function typeChecked({ label, input }) {
  let maskedTypeText = false;
  let attr = [];
  if (input.required) {
    attr.push('required');
  }
  if (input.checked === 'true') {
    attr.push('checked');
  }
  if (input.mask) {
    attr.push(`placeholder="${input.mask}"`);
    attr.push(`data-mask="${input.mask}"`);
    maskedTypeText = true;
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
      if (maskedTypeText) {
        markup = `<div class="form-floating mb-3">
          <label>${label}
          <input type="text" class="form-control" ${attr} oninput="inputCheckByMask(this)"></label>
        </div>`;
      } else {
        markup = `<div class="form-floating mb-3">
          <label>${label}
          <input type="number" min="0" class="form-control" ${attr} value="1"></label>
        </div>`;
      }
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
    case 'technology':
      let techSet = [];

      input.technologies.forEach(technology => {
        techSet.push(`<div class="form-check form-check-inline">
        <input type="checkbox" value="${technology}" id="${technology}" name="selectcheckbox" class="form-check-input">
        <label for="${technology}" class="form-check-label">${technology}</label>
        </div>`);
      });
      markup = `<div class="form-floating mb-3">
        <label>${label}
        <div class="custom-field">
        ${techSet.join('')}
        </div></label>
      </div>`;
      break;
  }

  return markup;
}

function inputCheckByMask(elem) {
  if (elem.dataset.mask === undefined) {
    return;
  }
  const mask = elem.dataset.mask;
  const value = elem.value;

  const literalPattern = /[9*]/;
  const numberPattern = /[0-9]/;

  let newValue = '';
  const maskLength = mask.length;
  let valueIndex = 0;
  let maskIndex = 0;

  while (maskIndex < maskLength) {
    if (maskIndex >= value.length) break;
    if (
      mask[maskIndex] === '9' &&
      value[valueIndex].match(numberPattern) === null
    )
      break;

    while (mask[maskIndex].match(literalPattern) === null) {
      if (value[valueIndex] === mask[maskIndex]) break;
      newValue += mask[maskIndex++];
    }
    newValue += value[valueIndex++];
    maskIndex++;
  }

  elem.value = newValue;
}

function markupFields(data) {
  data.map(el => {
    formEl.insertAdjacentHTML('beforeend', typeChecked(el));
  });
}

export default { markupForm, inputCheckByMask };
