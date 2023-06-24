const myProducts = localStorage.getItem("myProducts");
const myProductsdata = JSON.parse(myProducts);

let productsDiv = document.getElementById('productsDiv');

let totalPrice = []
let yourProducts = [{}];

const productNew = (val)=>
{
  let productButton = document.createElement('button');
  let productNameDiv = document.createElement('div');
  let productPriceDiv = document.createElement('div');
  productNameDiv.innerHTML = val.productName;
  productPriceDiv.innerHTML = val.productPrice;
  productsDiv.appendChild(productButton);
  productButton.appendChild(productNameDiv);
  productButton.appendChild(productPriceDiv);
  productNameDiv.setAttribute('class','buttonName')
  productPriceDiv.setAttribute('class','buttonPrice')
  productButton.setAttribute('class','pButton')
  // productButton.setAttribute('id',idx = 'id' + idx);
  const add = ()=>
    {
      productButton.innerHTML = 'Already Choosed'
      productButton.disabled = true;
      totalPrice.push(val.productPrice);
      yourProducts.push({product :val.productName , price : val.productPrice});
    }
    productButton.addEventListener('click',add);

}
let productNewList = myProductsdata.forEach((val)=>
{
  productNew(val);
})

console.log(myProductsdata)

const sorter = ()=>
{
    if(document.getElementById('sort').value == 'byPrice'){
        while (productsDiv.firstChild) {
            productsDiv.removeChild(productsDiv.firstChild);
        }
    
    for(let i = 0; i < myProductsdata.length; i++){
        for(let j = 0; j < (myProductsdata.length - i -1 ); j++){
          if(Number(myProductsdata[j].productPrice) > Number(myProductsdata[j+1].productPrice)){
            let temp = myProductsdata[j]
            myProductsdata[j] = myProductsdata[j + 1]
            myProductsdata[j+1] = temp
          }
        }
      }

      let byPriceArr = myProductsdata.forEach((val,idx)=>
      {
          productNew(val);
        })
    }
    else if(document.getElementById('sort').value == 'byName')
    {
            while (productsDiv.firstChild) {
                productsDiv.removeChild(productsDiv.firstChild);
            }
         
        for(let i = 0; i < myProductsdata.length; i++){
            for(let j = 0; j < (myProductsdata.length - i -1 ); j++){
              if(myProductsdata[j].productName.charAt(0) > myProductsdata[j+1].productName.charAt(0)){
                let temp = myProductsdata[j]
                myProductsdata[j] = myProductsdata[j + 1]
                myProductsdata[j+1] = temp
              }
            }
          }
          let byNameArr = myProductsdata.forEach((val,idx)=>
      {
        productNew(val);
        })
        
    }
}

console.log(yourProducts)

const buy = ()=>
{
    let totalProductsBuy = totalPrice.length
    let totalPricePay = totalPrice.reduce(function(a, b){
        return a + b;
      });
    window.location.href = "buy.html"
    localStorage.setItem("totalProductsBuy", totalProductsBuy);
    localStorage.setItem("totalPricePay",totalPricePay);
    localStorage.setItem("yourProducts", JSON.stringify(yourProducts));
}


console.log(totalPrice)



