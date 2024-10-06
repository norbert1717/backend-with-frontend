import { getDrinksData } from "./getDrinksData.js";
import { drinkCard } from "../components/drinkCard.js";
import { addHtml } from "../helpers/addHtml.js";
import { newDrink } from "../components/newDrink.js";

import { handleDeleteButtonClick } from "./handleDeleteButtonClick.js";
import { handleEditButtonClick } from "./handleEditButtonClick.js";

import { createButtonClickEvents } from "./createButtonClickEvents.js";

import { handleSubmit } from "./handleSubmit.js";
import { createFormSubmitEvent } from "./createFormSubmitEvent.js";

export const recreateDom = (rootElement) => {
  rootElement.innerHTML = "loading";
  
  getDrinksData()
    .then(drinks => {
      rootElement.innerHTML = "";
    
      const drinksHtml = drinks.map(drinkObj => drinkCard(drinkObj)).join("");

      addHtml(rootElement, `<div class="drinks">${drinksHtml}</div>`);
      addHtml(rootElement, newDrink());

      const deleteButtonElements = document.querySelectorAll('button.delete');
      createButtonClickEvents(deleteButtonElements, handleDeleteButtonClick, rootElement);
      
      const editButtonElements = document.querySelectorAll('button.edit');
      console.log(editButtonElements);
      createButtonClickEvents(editButtonElements, handleEditButtonClick, rootElement);

      const formElement = document.querySelector("form");
      createFormSubmitEvent(formElement, handleSubmit, rootElement)
    })
}