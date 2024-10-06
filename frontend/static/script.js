/* 
kártyák létrehozása dom manipulációval
a data csak a fetchen belül létezik, ezen kell változtatni
fetchelés egy async művelet, abban a pillanatban nem tudjuk még a kimenetelt
fel kell készülni arra is, hogy ha soha nem küld választ a backend
a fetchbe írjuk bele, hogy hogyan dolgozzuk fel a backendből kapott adatot
foreach segítségével lefuttatom a szükséges műveleteket a datán
rootelement használata
függvénybe szervezzük ki az egészet, és a végén hívjuk meg, cleancode
adatot bővíthetővé lehet tenni
form - input mezőket rakunk bele különbőző typeokkal és placeholderekkel
végén meghívjuk a függvényt
form-ot használjuk adatközlésre a weboldalon
formon belül a submint eseményt le kell tiltani, mert bármit írunk bele, és rányomunk a gombra
az oldal újratöltődik, és a html-be kiírja a megadott adatokat
és új eseményt kell megadni neki, összegyűjteni az adatokat és elküldeni a backendnek
input elementeket megtudjuk különböztetni a name-nek köszönhetően 
getinputvalue-val ki tudjuk szervezni az adatok begyűjtését és nem kell annyi kódot írni
a backend egyelőre nem tudja kiszedni ezeket az adatokat, erre kell a backendet megszerkeszteni


drinkcard - drinkdatabol készít egy html elemet
newdrinkelement - html stringet dob vissza az új elemeknek
getinputvalue - megkeresi az input mezőt, ahol a drink atributumánál meg van a név és kiszedi a value értékét
fetch - data endpointot lefetcheli
  drnkshtml elkészítése
  data-n loopolva létrehozza a drinkcard elemeket
rootelement kiszelektálása és divbe foglalja a drinkshtml-t
végén hozzáfűzzük a newdrinkelementet, ami a submit eseményt figyeli(ha a formon van egy gomb, ahol le lehet futtatni ezt az eseményt
event.preventdefaulttal letiltja, hogy az url-be ki tegye az elemeket
newdrinkdata létrehozása a getinputvalue segitségével
/data/new endpoint fetchelése, ami egy post request a body-ba pedig tegye bele a newdrinkdatat
.then - hibakeresés, hogy ha a file irás során hibába ütközne
ha nincs hibánk átmegyünk a következő .then ágba -

2024.10.12
minden kártyához edit gombot akarunk hozzáadni
drinkcard - gomb beletétele edit classal

recreatedom fileban az editbuttonelements-et létrehozzuk
utána pedig egy file createbuttonclickevents néven, aminek szüksége van egy paraméterre,
  ami elmondja, hogy milyen elemeken akarjuk elvégezni az eventet, 

handleeditbuttonclick file - formelement megkeresése(az a doboz, ahova az új elemeket tudjuk beleírni)
  formon belül is megtudjuk találni az adott elemeket
    formtitleelement - h2 megkeresése, majd innerhtml szerkesztése
    input mezőket is lehet szerkeszteni ugyanígy
      az input mezőknek value értéke van
  getelementext függvény átvesz egy selector paramétert és a button parentelementje átveszi a selectort
  getformelement - inputname - formon belül kiszelektálja azt az elemet, aminek a név atributuma az, hogy inputname
  
*/

import { recreateDom } from './functions/recreateDom.js';

const rootElement = document.querySelector("#root");

const init = () => recreateDom(rootElement);

init();

/* const drinkCard = (drinkData) => `
  <div class="drink">
    <h2>${drinkData.name}</h2>
    <h3>${drinkData.id}</h3>
    <p class="drink-abv">${drinkData.abv}%</p>
    <p class="drink-desc">${drinkData.desc}</p>
    <p class="drink-price">${drinkData.price} HUF</p>
    <button class="delete">delete</button>
  </div>
`;

const newDrinkElement = () => `
  <form>
    <h2>add new drink</h2>

    <input type="text" name="drink-name" placeholder="drink name" required />
    <input type="text" name="drink-abv" placeholder="drink abv %" required />
    <input type="text" name="drink-desc" placeholder="drink description" required />
    <input type="number" name="drink-price" placeholder="drink price" required />

    <button>add drink</button>
  </form>
`;

const getInputValue = (name) => document.querySelector(`input[name="drink-${name}"]`).value

fetch("/data")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    let drinksData = data;

    let drinksHtml = "";

    drinksData.forEach(drinkData => drinksHtml += drinkCard(drinkData));

    const rootElement = document.querySelector("#root");
    rootElement.insertAdjacentHTML("beforeend", `<div class="drinks">${drinksHtml}</div>`);

    const buttonElements = document.querySelectorAll('button.delete');
    console.log(buttonElements);
    buttonElements.forEach(button => button.addEventListener("click", () => {
      const buttonContainer = button.parentElement;
      const searchId = buttonContainer.querySelector("h3").innerHTML;
      console.log(searchId);

      fetch(`/data/delete/${searchId}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(resData => {
          if (resData === searchId) {
            buttonContainer.remove();
            const filteredData = drinksData.filter(drinkData => drinkData.id !== searchId);
            drinksData = filteredData;
            drinksHtml = "";
            drinksData.forEach(drinkData => drinksHtml += drinkCard(drinkData));
          }
        })
    }))

    rootElement.insertAdjacentHTML("beforeend", newDrinkElement());
    const formElement = document.querySelector("form");
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();

      const newDrinkData = {
        name: getInputValue("name"),
        desc: getInputValue("desc"),
        abv: Number(getInputValue("abv")),
        price: Number(getInputValue("price"))
      }

      fetch('/data/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDrinkData)
      })
        .then(res => {
          if (res.status === 500) {
            throw new Error(res.json());
          }
          return res.json();
        })
        .then(resData => {
          newDrinkData.id = resData;
          drinksHtml += drinkCard(newDrinkData);
          const drinksContainerElement = document.querySelector("div.drinks");
          drinksContainerElement.innerHTML = drinksHtml;
        })
        .catch(err => {
          console.log(err)
        }) 
    })
  }) */
