document.addEventListener("DOMContentLoaded",function(){
    const products = [
        {id : 1, name : "Product 1", price : 99.999},
        {id : 2, name : "Product 2", price : 90.999},
        {id : 3, name : "Product 3", price : 89.999},
    ];

    let cart = [];

    const productListDisplay = document.getElementById("product-list");

    const cartItemsDisplay = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");

    const cartTotalDisplay = document.getElementById("cart-total");
    const totalPrice = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");

    products.forEach(ele => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
        <span>${ele.name} - ${ele.price.toFixed(2)}</span>
        <button data-id=${ele.id}>Add to cart</button>
        `;
        productListDisplay.appendChild(productDiv);
    });

    productListDisplay.addEventListener("click",function(e){
        if(e.target.tagName === "BUTTON"){
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find((p) => p.id === productId);
            addProduct(product);
        }
    });

    function addProduct(product){
        cart.push(product);
        console.log(product);
        renderCart();
    }


    function renderCart(){
        cartItemsDisplay.innerText = "";
        let total = 0;

        if(cart.length > 0){
            emptyCartMessage.classList.add("hidden");
            cartTotalDisplay.classList.remove("hidden");
            cart.forEach((ele,index) => {
                total += ele.price;
                const cartItem = document.createElement("div");
                cartItem.innerHTML =`${ele.name} - ${ele.price.toFixed(2)}`;
                cartItemsDisplay.appendChild(cartItem);
                totalPrice.textContent = `${total.toFixed(2)}`;
            });
        }else{
            emptyCartMessage.classList.remove("hidden");
            cartTotalDisplay.classList.add("hidden");
        }
    }

    checkoutBtn.addEventListener("click",function(){
        cart.length = 0;
        alert("CheckoutSuccessfull");
        renderCart();
    });
});

