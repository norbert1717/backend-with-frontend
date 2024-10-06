export const drinkCard = ({ name, id, abv, desc, price }) => `
  <div class="drink">
    <h2>${name}</h2>
    <h3>${id}</h3>
    
    <div class="abv-container">
      <p class="drink-abv">${abv}</p>
      <span>%</span>
    </div>

    <p class="drink-desc">${desc}</p>
    
    <div class="price-container">
      <p class="drink-price">${price}</p>
      <span>HUF</span>
    </div>

    <button class="delete">delete</button>
    <button class="edit">edit</button>
  </div>
`;