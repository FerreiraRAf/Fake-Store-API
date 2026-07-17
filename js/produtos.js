const container = document.getElementById('productsContainer');
const categorySelect = document.getElementById('categorySelect');
const sortSelect = document.getElementById('sortSelect');
const searchInput = document.getElementById('searchInput');

let currentProducts = [];
let currentCategory = '';
let currentSort = '';

function renderProducts(products) {

    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 50px; grid-column: 1/-1; color: #999;">
                🛒 Nenhum produto encontrado
            </div>
        `;
        return;
    }

    products.forEach(product => {
        
        const card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-category">${product.category}</p>
                <div class="product-rating">
                    <span class="stars">${'★'.repeat(Math.round(product.rating.rate))}${'☆'.repeat(5 - Math.round(product.rating.rate))}</span>
                    <span class="rating-count">(${product.rating.count})</span>
                </div>
                <div class="product-price">
                    <span class="price">R$ ${product.price.toFixed(2)}</span>
                    <button class="btn-add-cart">Adicionar</button>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}


function filterProductsByText(products, searchText) {
    if (!searchText || searchText.trim() === '') {
        return products; 
    }

    const text = searchText.toLowerCase().trim();

    return products.filter(product => {

        return product.title.toLowerCase().includes(text) ||
        product.description.toLowerCase().includes(text) ||
        product.category.toLowerCase().includes(text);
    });
}

function sortProducts(products, sortType) {
    const sorted = [...products];
    
    switch(sortType) {
        case 'price-asc':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sorted.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            break;
    }
    
    return sorted;
}

function applyFilters() {

    let filtered = [...currentProducts];

    if (currentCategory) {
        filtered = filtered.filter(product => 
            product.category === currentCategory
        );
    }

    const searchText = searchInput.value;
    if (searchText && searchText.trim() !== '') {
        const text = searchText.toLowerCase().trim();
        filtered = filtered.filter(product => {
            return product.title.toLowerCase().includes(text) || product.description.toLowerCase().includes(text) || product.category.toLowerCase().includes(text);
        });
    }

    filtered = sortProducts(filtered, currentSort);

    renderProducts(filtered);
}

function loadProducts(category = '', sortType = '') {

    container.innerHTML = '<div class="loading">⏳ Carregando...</div>';
    
    let url = 'https://fakestoreapi.com/products';
    if (category) {
        url = `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;
    }
    
    fetch(url)
        .then(response => response.json())
        .then(products => {

            currentProducts = products;
            currentCategory = category;
            currentSort = sortType;

            applyFilters();
        })
        .catch(error => {
            console.error('❌ Erro:', error);
            container.innerHTML = `
                <div style="text-align: center; padding: 50px; grid-column: 1/-1; color: #ff6b6b;">
                    ❌ Erro ao carregar produtos
                </div>
            `;
        });
}

let searchTimeout;

function handleSearch() {

    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
        console.log('🔍 Buscando:', searchInput.value);
        applyFilters(); 
    }, 300);
}

categorySelect.addEventListener('change', function() {
    const categoria = this.value;
    console.log('📌 Categoria:', categoria || 'Todas');
    currentCategory = categoria;
    loadProducts(categoria, currentSort);
});

sortSelect.addEventListener('change', function() {
    const ordenacao = this.value;
    console.log('📌 Ordenação:', ordenacao || 'Nenhuma');
    currentSort = ordenacao;

    if (currentProducts.length > 0) {
        applyFilters();
    } else {
        loadProducts(currentCategory, ordenacao);
    }
});

searchInput.addEventListener('input', handleSearch);

loadProducts();