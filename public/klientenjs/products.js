import  updateBagNumber from './bagNumber.js'

function getproducts() {
  fetch("/api/products")
    .then(response => {
      return response.json();
    })
    .then(allProducts => {
      allProducts.data.forEach(product => {
        // om man har en id för produkt kan man har button id="${product.id}"
        document.querySelector(".products").innerHTML += `
          <div class="oneproduct">
          <img src="${product.productpicture}">
          <h3>${product.productname}</h3>
          <h4>${product.productprice} kr</h4>
          <button value="${product.productname}">Add to bag</button>
          </div>
          `;
      });
      //form är så här `button[value="${product.productname}"]` för att value är en attribute
      allProducts.data.forEach(product => {
        let b = document.querySelector(
          `button[value="${product.productname}"]`
        );
        if (b) {
          let _listener = async () => {
            addToBag(product.productname);
          };
          b.addEventListener("click", _listener);
          // spara listener tillsmans med knappen 
          b._listener = _listener;
        }
      });
    }).then(getSoldOut);
}
// hämtar alla produkter i varukorg
function getSoldOut() {
  fetch("/api/bag?username=user")
    .then(response => {
      return response.json();
    })
    .then(allbag => {
      allbag.forEach(product => {
        // hitta produkter som i varukorg sen använder soldOut funtion
        soldOut(product.productname);
      });
    });
}

function soldOut(productname) {
  // hitta button sen sätt den till sold out
  let b = document.querySelector(`button[value="${productname}"]`);
  b.innerHTML = "SOLD OUT";
  b.classList.add("soldOut");
  b.removeEventListener("click", b._listener);
}

function addToBag(productname) {
  let data = {
    productname: productname,
    username: "user"
  };

  fetch("/api/bag", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(() => {
    soldOut(productname);
    updateBagNumber();
    getproducts();
  });
}
getproducts();
updateBagNumber();
