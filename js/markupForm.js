import refs from './refs.js';
const { fileNameRef } = refs;
function markupForm(data) {
  if (data.name) {
    const firstLetter = data.name.charAt(0).toUpperCase();
    const formName = data.name.replaceAll('_', ' ');
    fileNameRef.textContent = formName.replace(formName.charAt(0), firstLetter);
  }
  if (data.fields) {
    console.log(data.fields);
  }
}

export default markupForm;
