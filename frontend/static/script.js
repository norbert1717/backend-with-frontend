console.log("loaded")

fetch('/')
  .then(res => res.json())
  .then(data => console.log(data))

fetch('/data')
  .then(res => res.json())
  .then(data => {
    createDrinkCards(data);
  })

function createDrinkCards(drinks) {
  const rootDiv = document.getElementById('root');

  drinks.forEach(drink => {
    const card = document.createElement('div');
    card.className = 'card';

    const nameElement = document.createElement('h2');
    nameElement.textContent = drink.name;

    const priceElement = document.createElement('p');
    priceElement.textContent = `Price: ${drink.price} HUF`;

    const descElement = document.createElement('p');
    descElement.textContent = `Description: ${drink.desc}`;

    const abvElement = document.createElement('p');
    abvElement.textContent = `ABV: ${drink.abv}%`;

    card.appendChild(nameElement);
    card.appendChild(priceElement);
    card.appendChild(descElement);
    card.appendChild(abvElement);

    rootDiv.appendChild(card);
  });
}