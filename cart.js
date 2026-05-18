
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();

    
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            const img = this.getAttribute('data-img');

            addToCart(name, price, img);
        });
    });

    // Обробка відправки форми замовлення
    const orderForm = document.getElementById('orderForm');
    if(orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if(cart.length === 0) {
                alert('Ваш кошик порожній!');
                return;
            }

            // Імітація успішного замовлення
            alert('Дякуємо за замовлення! Найближчим часом ми з вами зв\'яжемося.');
            
            // Очищення кошика
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            renderCart();
            
            // Закриваємо модальне вікно та очищаємо форму
            orderForm.reset();
            const orderModal = bootstrap.Modal.getInstance(document.getElementById('orderModal'));
            orderModal.hide();
        });
    }
});

// Функція додавання товару
function addToCart(name, price, img) {
    cart.push({ name, price, img });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
    
    alert(`Товар "${name}" додано у кошик!`);
}

// Оновлення лічильника на кнопці кошика
function updateCartCount() {
    const countElements = document.querySelectorAll('.cart-count');
    countElements.forEach(el => {
        el.innerText = cart.length;
    });
}

// Відмальовування товарів всередині модального вікна кошика
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if(!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center text-muted my-4">Ваш кошик порожній</p>';
        checkoutBtn.disabled = true;
    } else {
        checkoutBtn.disabled = false;
        cart.forEach((item, index) => {
            total += item.price;
            cartItemsContainer.innerHTML += `
                <div class="d-flex align-items-center mb-3 border-bottom pb-3">
                    <img src="${item.img}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover;" class="me-3 rounded shadow-sm">
                    <div class="flex-grow-1">
                        <h6 class="mb-1 fw-bold">${item.name}</h6>
                        <span class="text-primary">${item.price} ₴</span>
                    </div>
                    <button class="btn btn-sm btn-outline-danger border-0" onclick="removeFromCart(${index})">
                        <strong>✕</strong>
                    </button>
                </div>
            `;
        });
    }
    
    cartTotalElement.innerText = `${total} ₴`;
}

// Видалення конкретного товару
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}