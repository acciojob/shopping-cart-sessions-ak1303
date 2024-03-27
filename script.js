// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
    { id: 1, name: "Product 1", price: 10 }, 
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
    { id: 4, name: "Product 4", price: 40 },
    { id: 5, name: "Product 5", price: 50 },
  ];
  
  // DOM elements
  const productList = document.getElementById("product-list");
  
  // Render product list
  function renderProducts() {
    products.forEach((product) => {
      const li = document.createElement("li");
      li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
      productList.appendChild(li);
    });
  }
  let cartList = document.getElementById('cart-list');
  // Render cart list
  function renderCart() {
      let cartProducts = JSON.parse(sessionStorage.getItem('cart')) || [];
      cartProducts.forEach((product) => {
      const li = document.createElement("li");
      li.id = product.id;
      li.innerHTML = `${product.name} - $${product.price} <button class="remove-from-cart-btn" data-id="${product.id}">Remove from Cart</button>`;
      cartList.appendChild(li);

      let removeBtn = li.querySelector('.remove-from-cart-btn');
        removeBtn.addEventListener('click', () => {
            removeFromCart(product.id);
        });
    });
  }
  
  // Add item to cart
  function addToCart(productId) {
      let product = products[productId-1];
      let obj={...product};
      let existingCart = JSON.parse(sessionStorage.getItem('cart')) || [];
      existingCart.push(obj);
      existingCart = JSON.stringify(existingCart);
      sessionStorage.setItem('cart',existingCart);

      cartList.innerHTML = '';
      renderCart();
     
  }
  
  // Remove item from cart
  function removeFromCart(productId) {
      let existingCart = JSON.parse(sessionStorage.getItem('cart')) || [];
      let index = existingCart.findIndex(product => product.id === productId);
      if(index!==-1)
          existingCart.splice(index,1);
      existingCart = JSON.stringify(existingCart);
      sessionStorage.setItem('cart',existingCart);
      
      cartList.innerHTML = '';
      renderCart();
      
  }
  
  // Clear cart
  function clearCart() {
      sessionStorage.setItem('cart',JSON.stringify([]));
      
      cartList.innerHTML = '';
  }
  
  // Initial render
  renderProducts();
  renderCart();
  
  let buttons = document.getElementsByClassName('add-to-cart-btn');
  Array.from(buttons).forEach(btn=> {
      btn.addEventListener('click',(e)=>{
            console.log(btn.dataset.id); 
          addToCart(btn.dataset.id);
      })
  })

  document.getElementById('clear-cart-btn').addEventListener('click',(e)=>{
      clearCart();
  })
  