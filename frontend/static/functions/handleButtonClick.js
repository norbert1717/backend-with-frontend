import { deleteDrink } from "./deleteDrink.js";
import { recreateDom } from "./recreateDom.js";

export const handleButtonClick = (button, rootElement) => {
  const buttonContainer = button.parentElement;
  const searchId = buttonContainer.querySelector("h3").innerHTML;

  deleteDrink(searchId)
    .then(() => recreateDom(rootElement))
}