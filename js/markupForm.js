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
function markupFields(data) {
  data.map(el =>
    Object.values(el).forEach(([value]) => {
      let markup = '';

      markup = `<div class="form-floating mb-3">
        <label for="floatingInputValue">${value}</label>
        <input type="text" class="form-control" id="floatingInputValue" placeholder="" value="">
</div>`;

      formEl.insertAdjacentHTML('beforeend', markup);
    }),
  );
}

export default markupForm;
