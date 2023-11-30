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
