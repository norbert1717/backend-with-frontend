import { getInputValue } from "../helpers/getValue.js";
import { addNewDrink } from "./addNewDrink.js";
import { recreateDom } from "./recreateDom.js";

export const handleSubmit = (event, rootElement) => {
  event.preventDefault();

  const newDrinkData = {
    name: getInputValue("name"),
    desc: getInputValue("desc"),
    abv: Number(getInputValue("abv")),
    price: Number(getInputValue("price"))
  }

  addNewDrink(newDrinkData)
    .then(() => recreateDom(rootElement))
    .catch(err => {
      console.log("fetchData", err)
    })
}