const productsContainer = document.getElementById('products-container');
const paginationContainer = document.getElementById('pagination');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const productsPerPage = 6;
let data;

fetch('https://dummyjson.com/products')
    .then((response) => response.json())
    .then((responseData) => {
        data = responseData.products;

        // Populate categories in the filter dropdown
        populateCategories(data);

        const totalProducts = data.length;
        const totalPages = Math.ceil(totalProducts / productsPerPage);

        renderProducts(1, data);
        renderPagination(totalPages);
    });

    const renderProducts = (page, products) => {
    productsContainer.innerHTML = '';

    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    for (let i = startIndex; i < endIndex && i < products.length; i++) {
        const product = products[i];
        renderProductCard(product);
    }
};
