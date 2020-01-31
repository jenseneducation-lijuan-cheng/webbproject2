//hämtar produkter från varukorg stoppar in i html
function getbag() {
    // börjar med en tom div
  document.querySelector(".products").innerHTML = "";
  fetch("/api/bag?username=user")
    .then(response => {
      return response.json();
    })
    .then(productsInBag => {
      productsInBag.forEach(product => {
        document.querySelector(".products").innerHTML += `
            <div class="oneproduct">
            <img src="${product.productpicture}">
            <h4>${product.productname}</h4>
            <h5>${product.productprice} kr</h5>
            <button value="${product.productname}">remove from bag</button>
            </div>
        `;
      });

      productsInBag.forEach(product => {
        document
          .querySelector(`button[value="${product.productname}"]`)
          .addEventListener("click", async () => {
            removeToBag(product.productname);
          });
      });
    });
}

function removeToBag(productname) {
  fetch(`/api/bag?username=user&productname=${productname}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => {
    getbag();
    updateBagNumber();
    totalPrice();
  });
}

// räcknar pris i varukorg 
 function totalPrice(){
    fetch("/api/bag?username=user")
    .then(response => {
      return response.json();
    }).then(baglist =>{
        let price = 0;
        baglist.forEach(product =>{
            price += product.productprice
        })
        document.getElementById("sum").innerHTML=price
        document.getElementById("moms").innerHTML=price*0.2
        document.getElementById("total").innerHTML=price
    })

 }
getbag();
updateBagNumber();
totalPrice();
