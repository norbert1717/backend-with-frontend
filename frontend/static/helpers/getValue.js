// takes "name" as argument, that is the value of the name HTML attribute of the input HTML element
// returns the value of the found input element
export const getInputValue = (name) => document.querySelector(`input[name="drink-${name}"]`).value;