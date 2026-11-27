
const products = [
    {
        id: 1,
        name: "Мужская футболка",
        description: "Стильная футболка на каждый день.",
        price: 1200,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
    },
    {
        id: 2,
        name: "Кожаная куртка",
        description: "Современный дизайн и комфорт.",
        price: 4500,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600"
    },
    {
        id: 3,
        name: "Спортивные кроссовки",
        description: "Удобная обувь для прогулок.",
        price: 3800,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
    },
    {
        id: 4,
        name: "Классическая рубашка",
        description: "Подходит для повседневного образа.",
        price: 2100,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600"
    },
    {
        id: 5,
        name: "Модная толстовка",
        description: "Мягкая и удобная толстовка.",
        price: 2600,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600"
    },
    {
        id: 6,
        name: "Джинсы",
        description: "Универсальная модель для любого стиля.",
        price: 3200,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600"
    }
];


function getCart() {
    return JSON.parse(localStorage.getItem("urbanCart")) || [];
}


function saveCart(cart) {
    localStorage.setItem("urbanCart", JSON.stringify(cart));
    updateCartCount();
}


function updateCartCount() {
    const cart = getCart();

    const count = cart.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);

    const element = document.getElementById("cart-count");

    if (element) {
        element.textContent = count;
    }
}


function addToCart(id) {
    const cart = getCart();

    const product = products.find(item => item.id === id);

    if (!product) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart(cart);

    alert("Товар успешно добавлен в корзину!");
}


function renderProducts() {
    const container = document.getElementById("products");

    if (!container) return;

    container.innerHTML = products.map(product => `
        <div class="col-md-6 col-lg-4">
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">

                <div class="product-info">
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>

                    <div class="product-price">
                        ${product.price.toLocaleString("ru-RU")} сом
                    </div>

                    <button onclick="addToCart(${product.id})">
                        Добавить в корзину
                    </button>
                </div>
            </div>
        </div>
    `).join("");
}


function setupContactForm() {
    const form = document.getElementById("contact-form");

    if (!form) return;

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("contact-name").value.trim();

        const result = document.getElementById("form-result");

        result.textContent = `Спасибо, ${name}! Ваше сообщение заполнено.`;

        result.style.color = "green";

        form.reset();
    });
}


document.addEventListener("DOMContentLoaded", function() {
    renderProducts();
    updateCartCount();
    setupContactForm();
});
