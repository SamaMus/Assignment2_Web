document.addEventListener('DOMContentLoaded', () => {
    fetch('https://dummyjson.com/products')
        .then((response) => response.json())
        .then((data) => {
            window.productData = data.products;

            displayProducts(window.productData, 1);

            document.getElementById('searchInput').addEventListener('input', handleSearch);
            document.getElementById('categoryFilter').addEventListener('change', handleFilterChange);
            document.getElementById('minPrice').addEventListener('input', handleFilterChange);
            document.getElementById('maxPrice').addEventListener('input', handleFilterChange);

            populateCategoryFilter(data.categories);

            displaySelectedFilters();
        })
        .catch((error) => console.error('Error fetching data:', error));
});

function displayProducts(products, currentPage) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < products.length; i++) {
        const productCard = createProductCard(products[i]);
        productList.appendChild(productCard);
    }

    displayPagination(products.length, itemsPerPage, currentPage);
}

function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'results';
    productCard.innerHTML = `
        <div class="card" onclick="showProductDetail(${product.id})">
            <div class="imgBox">
                <img src="${product.thumbnail}" alt="${product.title}" class="mouse" onclick="showProductDetail(${product.id})">
            </div>
            <div class="contentBox" onclick="showProductDetail(${product.id})">
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Discount: ${product.discount}%</p>
                <p>Category: ${product.category}</p>
                <p>Stock: ${product.stock}</p>
                <a href="#" class="buy">Buy Now</a>
            </div>
        </div>
    `;

    return productCard;
}

function displayPagination(totalItems, itemsPerPage, currentPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => handlePageClick(i));
        if (i === currentPage) {
            pageButton.classList.add('active'); // Highlight the current page
        }
        pagination.appendChild(pageButton);
    }
}

function handlePageClick(pageNumber) {
    const productData = window.productData;
    displayProducts(productData, pageNumber);
}

function goBack() {
    // Remove the product detail page from the body
    const productDetailPage = document.querySelector('.productDetailPage');
    if (productDetailPage) {
        document.body.removeChild(productDetailPage);
    }

    // Show the productList and pagination
    document.getElementById('productList').style.display = 'block';
    document.getElementById('pagination').style.display = 'block';
}

function navigateGallery(direction) {
    const images = document.querySelectorAll('.galleryImage');
    let currentIndex = 0;

    images.forEach((image, index) => {
        if (image.classList.contains('active')) {
            currentIndex = index;
            image.classList.remove('active');
        }
    });

    let newIndex = currentIndex + direction;

    if (newIndex < 0) {
        newIndex = images.length - 1;
    } else if (newIndex >= images.length) {
        newIndex = 0;
    }

    images[newIndex].classList.add('active');
}
function showProductDetail(productId) {
    const product = window.productData.find((p) => p.id === productId);

    const productDetailPage = document.createElement('div');
    productDetailPage.className = 'productDetailPage';
    productDetailPage.innerHTML = `
        <h2>${product.title}</h2>
        <div class="imgGallery" id="imgGallery">
            ${product.images.map((image, index) => `<img src="${image}" alt="${product.title}" class="galleryImage${index === 0 ? ' active' : ''}">`).join('')}
        </div>
        <div class="navigationButtons">
            <button onclick="navigateGallery(-1)">Swipe Left</button>
            <button onclick="navigateGallery(1)">Swipe Right</button>
        </div>
        <p>Price: $${product.price}</p>
        <p>Discount: ${product.discount}%</p>
        <p>Category: ${product.category}</p>
        <p>Stock: ${product.stock}</p>
        <button onclick="goBack()">Go Back</button>
    `;

    document.body.appendChild(productDetailPage);

    document.getElementById('productList').style.display = 'none';
    document.getElementById('pagination').style.display = 'none';
}

function populateCategoryFilter(categories) {
    const categoryFilter = document.getElementById('categoryFilter');

    // Remove existing options
    categoryFilter.innerHTML = '<option value="">All Categories</option>';

    // Add new options based on available categories
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}
