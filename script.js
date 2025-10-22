// Products Data
const products = [
    { id: 1, name: 'Urban Hoodie', price: 350, emoji: '👕' },
    { id: 2, name: 'Street Tee', price: 200, emoji: '👔' },
    { id: 3, name: 'Cargo Pants', price: 400, emoji: '👖' },
    { id: 4, name: 'Classic Cap', price: 150, emoji: '🧢' },
    { id: 5, name: 'Bomber Jacket', price: 550, emoji: '🧥' },
    { id: 6, name: 'Sneakers', price: 600, emoji: '👟' }
];

let cart = [];

// Load Products
function loadProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = products.map(product => `
        <article class="product-card">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price} DH</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </article>
    `).join('');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
}

// Update Cart
function updateCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
    
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
        cartTotal.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div>
                    <strong>${item.price * item.quantity} DH</strong>
                    <button onclick="removeFromCart(${item.id})" style="background:none;border:none;color:red;cursor:pointer;font-size:1.2rem;">×</button>
                </div>
            </div>
        `).join('');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('totalPrice').textContent = `${total} DH`;
        cartTotal.style.display = 'block';
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Toggle Cart
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

// Checkout
function checkout() {
    alert('شكراً على طلبك! غادي نتواصلو معاك قريب 🙏');
    cart = [];
    updateCart();
    toggleCart();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Close cart when clicking outside
    document.getElementById('cartModal').addEventListener('click', function(e) {
        if (e.target === this) {
            toggleCart();
        }
    });

    // Load products
    loadProducts();
});