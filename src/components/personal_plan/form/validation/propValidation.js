class InputData {
  constructor(inputValue = '', inputTitle = '', inputChecked = false) {
    this.inputValue = inputValue
    this.inputTitle = inputTitle
    this.inputChecked = inputChecked
  }
}

class InputProps {
  constructor(iType = 'text', iName = '', iValuesAndTitles = [new InputData()]) {
    this.inputType = iType
    this.inputName = iName
    if (Array.isArray(iValuesAndTitles) && iValuesAndTitles.every((i) => i instanceof InputData)) {
      this.inputValuesAndTitles = iValuesAndTitles
    }
  }
}

export { InputProps, InputData }
