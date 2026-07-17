const container = document.getElementById('cartItemsContainer');
const subtotalElement = document.getElementById('cartSubtotal');
const totalElement = document.getElementById('cartTotal');
const itemsCountElement = document.getElementById('cartItemsCount');
const cartICountElement = document.getElementById('cartICount');
let subtotal = 0;


fetch('https://fakestoreapi.com/carts/1')
    .then(response => response.json())
    .then(cart => {
        console.log('📦 Produtos no carrinho:', cart.products);
        itemsCountElement.textContent = `${cart.products.length} itens`;
        
        
        
        const productPromises = cart.products.map(item => {
            return fetch(`https://fakestoreapi.com/products/${item.productId}`)
                .then(res => res.json())
                .then(product => {
                    return {
                        ...product, 
                        quantity: item.quantity
                    };
                });
        });
        
        return Promise.all(productPromises);
    })
    .then(productsWithDetails => {

        container.innerHTML = '';
        productsWithDetails.forEach(product => {

            const card = document.createElement('div');
            card.className = 'cart-item'; 
            
            card.innerHTML = `
                <div class="cart-item-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="cart-item-info">    
                    <h3 class="cart-item-title">${product.title}</h3>
                    <p class="cart-item-price">R$ ${product.price.toFixed(2)}</p>
                    <p class="cart-item-quantity">Quantidade: ${product.quantity}</p>
                </div>
            `;
            
            
            container.appendChild(card);

            const result = product.price * product.quantity;
            subtotal += result;
            const total = subtotal; 
            subtotalElement.textContent = `R$ ${total.toFixed(2)}`;
            totalElement.textContent = `R$ ${total.toFixed(2)}`;
            
        });
    })
    .catch(error => console.error('❌ Erro:', error));