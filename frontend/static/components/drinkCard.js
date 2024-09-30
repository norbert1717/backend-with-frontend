export const drinkCard = ({ name, id, abv, desc, price }) => `
  <div class="drink">
    <h2>${name}</h2>
    <h3>${id}</h3>
    <p class="drink-abv">${abv}%</p>
    <p class="drink-desc">${desc}</p>
    <p class="drink-price">${price} HUF</p>
    <button class="delete">delete</button>
  </div>
`;