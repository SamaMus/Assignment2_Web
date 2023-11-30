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