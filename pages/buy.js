const signedUser = localStorage.getItem("user");
const parseUser = JSON.parse(signedUser)
const totalProductsBuy = localStorage.getItem("totalProductsBuy");
const totalPricePay = localStorage.getItem("totalPricePay");
const yourProducts = JSON.parse(localStorage.getItem("yourProducts"))

let totalPrice = document.getElementById('totalPrice');
let totalProducts = document.getElementById('totalProducts');

console.log(yourProducts)
totalProducts.innerHTML = 'Total Products:   ' + totalProductsBuy;
totalPrice.innerHTML = 'Total Price:   ' + totalPricePay;

const approve = ()=>
{
    fetch('/done',{
        headers:{
            "Content-Type": "application/json"
        },
        method:'post',
        body:JSON.stringify({
            buyerName: parseUser.fullName,
            products: yourProducts,
            productsTotalPrice: totalPricePay
        })
    }).then((res)=>{return res.json()}).
    then((data)=>{
        
        window.location.href = "index.html";
    }).catch((err)=>{console.log('error')})
}


console.log(parseUser.fullName);
console.log(totalProductsBuy);
console.log(totalPricePay);


