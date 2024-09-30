import { getDrinksData } from "./getDrinksData.js";
import { drinkCard } from "../components/drinkCard.js";
import { addHtml } from "../helpers/addHtml.js";
import { newDrink } from "../components/newDrink.js";
import { createButtonClickEvents } from "./createButtonClickEvents.js";
import { createFormSubmitEvent } from "./createFormSubmitEvent.js";
import { handleSubmit } from "./handleSubmit.js";
import { handleButtonClick } from "./handleButtonClick.js";

export const recreateDom = (rootElement) => {
  rootElement.innerHTML = "loading";
  
  getDrinksData()
    .then(drinks => {
      rootElement.innerHTML = "";
    
      const drinksHtml = drinks.map(drinkObj => drinkCard(drinkObj)).join("");

      addHtml(rootElement, `<div class="drinks">${drinksHtml}</div>`);
      addHtml(rootElement, newDrink());

      const buttonElements = document.querySelectorAll('button.delete');
      createButtonClickEvents(buttonElements, handleButtonClick, rootElement);

      const formElement = document.querySelector("form");
      createFormSubmitEvent(formElement, handleSubmit, rootElement)
    })
}