import {menuArray} from "/data.js"

const container = document.getElementById("container")
const order = document.getElementById("basket")
const orderBtn = document.getElementById("order-btn")
const payBtn = document.getElementById("pay-btn")
const paymentForm = document.getElementById("payment-form")
const orderSuccess = document.getElementById("order-success")
let shoppingCart = []

render()

document.addEventListener("click", function(e) {
    if (e.target.dataset.btn) {
        handleAddBtn(Number(e.target.dataset.btn))
    }
    else if (e.target.dataset.remove) {
        handleRemoveBtn(Number(e.target.dataset.remove))
    }
})

orderBtn.addEventListener("click", function() {
    document.getElementById("modal").style.display = "block"
})

paymentForm.addEventListener("submit", function(){

    const paymentFormData = new FormData(paymentForm)
    const customerName = paymentFormData.get("fullname")
    document.getElementById("modal").style.display = "none"
    document.getElementById("order-outer-container").style.display = "none"

    orderSuccess.innerHTML += `<h2>Thanks, ${customerName}! Your order is on its way!</h2>`
    orderSuccess.classList.toggle("hidden")
    orderSuccess.style.display = "flex"
})

function handleAddBtn(itemId) {
    const targetItem = menuArray.filter(function(item) {
        return item.id === itemId
    })[0]
    
    if (shoppingCart.find(item => item.name === targetItem.name)){
        const existingItem = shoppingCart.find(item => item.name === targetItem.name) 
        existingItem.quantity += 1
    } else {
        let cartItem = {
        name: targetItem.name,
        price: targetItem.price,
        id: targetItem.id,
        quantity: 1
        }
        shoppingCart.push(cartItem)
    }
    render()
}

function handleRemoveBtn(cartItemId) {
    const targetCartItem = shoppingCart.filter(cartItem => cartItem.id === cartItemId)[0]
    if (targetCartItem.quantity > 0) {
        targetCartItem.quantity--
    } 
    if (targetCartItem.quantity === 0) {
        shoppingCart.pop(targetCartItem)
        console.log(shoppingCart)
    }
    render()
}



function getMenu() {
    const feedHTML = menuArray.map((item) => {
            return `<div class="item">
                <div class="item-left">
                    <p class="emoji">${item.emoji}</p>
                    <div class="item-info">
                        <h2 class="item-name">${item.name}</h2>
                        <p class="item-ingridients">${[...item.ingredients].join(", ")}</p>
                        <h2 class="item-price">$${item.price}</h2>
                    </div>
                </div>
                <button class="add-button" id="add-btn" data-btn=${item.id}>+</button>
            </div>`
            
})         
    return feedHTML.join("") 
}

function getCart() {
    let totalPrice= 0
    if (shoppingCart.length > 0){
        totalPrice = shoppingCart.reduce((total, item) => {
        return total + item.price * item.quantity
    },0)
        document.getElementById("order-outer-container").classList.remove("hidden")
    } else {
        document.getElementById("order-outer-container").classList.add("hidden")
    }

    const orderHTML =  shoppingCart.map(function(cartItem){
        return `<div class="order-item">
                    <div class="bill">
                        <div class="order-name-box">
                            <h2 class="order-name">${cartItem.name}</h2>
                            <button class="remove-btn" data-remove=${cartItem.id}>remove</button>
                        </div>
                        <h2 class="item-price">${cartItem.quantity}  x  $${cartItem.price}</h2>
                    </div>
                </div>`
    }).join("") + 
                `<div class="total-price">
                    <h2>Total Price</h2>
                    <h2 class="item-price">$${totalPrice}</h2>
                </div>`
    return orderHTML
}



function render() {

    container.innerHTML = getMenu()
    order.innerHTML = getCart()

}
