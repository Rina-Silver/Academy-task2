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

export default inputCheckByMask;
