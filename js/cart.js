const cartParent = document.querySelector("#carts");
const KEY = "79cde983-a62a1291-c7e1cbbe-31bc06f3";
const shops = "https://fortniteapi.io/v2/shop?lang=ru";

async function getFortniteShop() {
  try {
    const response = await fetch(shops, {
      headers: {
        Authorization: KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Ошибка при получении магазина");
    }

    const data = await response.json();
    console.log(data);
    render(data);
    console.log(data);
  } catch (error) {
    console.error(error);
  } finally {
  }
}

function render({ shop }) {
  shop.forEach((item, index) => {
    if (index > 20) return;
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <div class="card-image">
          <img src="${item.displayAssets[0]?.full_background}" />
        </div>
        <div class="card-content">
          <p>${item.displayName || "Я лучше промолчу"}</p>
        </div>
      `;

    cartParent.appendChild(card);
  });
}

getFortniteShop();
