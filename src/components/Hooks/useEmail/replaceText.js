export const replaceText = (text, values) => {
  let newText = text

  for (let i = 0; i < values.length; i++) {
    newText = newText.replace(values[i].searchvalue, values[i].newvalue)
  }

  return newText
}
