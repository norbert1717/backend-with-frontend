export const newDrink = (title, buttonText, name, abv, desc, price) => `
  <form>
    <h2>${title ? title : "add new drink"}</h2>

    <input type="text" name="drink-name" placeholder="drink name" value="${name ? name : ""}" required />
    
    <div class="abv-container">
      <input type="number" name="drink-abv" placeholder="drink abv %" value="${abv ? abv : ""}" required />
      <span>%</span>
    </div>
    <input type="text" name="drink-desc" placeholder="drink description" value="${desc ? desc : ""}" required />
    <input type="number" name="drink-price" placeholder="drink price" value="${price ? price : ""}" required />

    <button>${buttonText ? buttonText : "add drink"}</button>
  </form>
`;