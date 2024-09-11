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
input elementeket megtudjuk különböztetni a name-nek köszönhetően */

console.log("loaded");

const drinkCard = (drinkData) => `
  <div class="drink">
    <h2>${drinkData.name}</h2>
    <p class="drink-abv">${drinkData.abv}%</p>
    <p class="drink-desc">${drinkData.desc}</p>
    <p class="drink-price">${drinkData.price} HUF</p>
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

fetch("/data")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    
    let drinksHtml = "";

    data.forEach(drinkData => drinksHtml += drinkCard(drinkData));

    const rootElement = document.querySelector("#root");
    rootElement.insertAdjacentHTML("beforeend", `<div class="drinks">${drinksHtml}</div>`);

    rootElement.insertAdjacentHTML("beforeend", newDrinkElement());
    const formElement = document.querySelector("form");
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();

      console.log("event trigger");

      const newDrinkData = {
        name: formElement.querySelector('input[name="drink-name"]').value,
        desc: formElement.querySelector('input[name="drink-abv"]').value,
        abv: formElement.querySelector('input[name="drink-desc"]').value,
        price: formElement.querySelector('input[name="drink-price"]').value
      }

      console.log(newDrinkData);

      fetch('/data/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDrinkData)
      })
        .then(res => res.json())
        .then(resJson => console.log(resJson))
    })
})

