import refs from './refs.js';
const { fileNameRef, formContainerRef } = refs;
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
    Object.entries(el).forEach(([key, value]) => {
      let markup = '';
      if (value.isArray()) {
        console.log(value);
        Object.entries(value).forEach(([key, value]) =>
          console.log(key, value),
        );
      } else {
        markup = `<form class="form-floating">
        <label for="floatingInputValue">${value}</label>
        <input type="" class="form-control" id="floatingInputValue" placeholder="" value="">
</form>`;
      }
      formContainerRef.insertAdjacentHTML('beforeend', markup);
    }),
  );
}

export default markupForm;
