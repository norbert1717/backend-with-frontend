export const createButtonClickEvents = (buttonList, handleButtonClick, rootElement) => {
    buttonList.forEach(button => button.addEventListener("click", () => handleButtonClick(button, rootElement)))
  }