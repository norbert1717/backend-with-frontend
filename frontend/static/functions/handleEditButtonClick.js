import { newDrink } from "../components/newDrink.js";
import { getInputValue } from "../helpers/getValue.js";
import { recreateDom } from "./recreateDom.js";

export const handleEditButtonClick = (button, rootElement) => {
  const getElementText = (selector) => button.parentElement.querySelector(selector).innerHTML; 
  
  rootElement.querySelector("form").remove();

  rootElement.insertAdjacentHTML("beforeend", newDrink(
    "edit drink",
    "save",
    getElementText('h2'), 
    getElementText('p.drink-abv'),
    getElementText('p.drink-desc'),
    getElementText('p.drink-price')
  ))

  const updateId = getElementText('h3');
  
  rootElement.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    fetch(`/data/put/${updateId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: getInputValue('name'),
        price: getInputValue('price'),
        desc: getInputValue('desc'),
        abv: getInputValue('abv')
      })
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        recreateDom(rootElement);
      })
  })
}