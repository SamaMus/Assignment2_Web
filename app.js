const productsContainer = document.getElementById('products-container');
const paginationContainer = document.getElementById('pagination');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const productsPerPage = 6;
let data;
//fetch products when the page loads
fetch('https://dummyjson.com/products')
    .then((response) => response.json())
    .then((responseData) => {
        data = responseData.products;
//populate categories when the page loads
        populateCategories(data);

        const totalProducts = data.length;
        const totalPages = Math.ceil(totalProducts / productsPerPage);

        renderProducts(1, data);
        renderPagination(totalPages);
    });

//rendering products based on the opened page
    const renderProducts = (page, products) => {
    productsContainer.innerHTML = '';

    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    for (let i = startIndex; i < endIndex && i < products.length; i++) {
        const product = products[i];
        renderProductCard(product);
    }
};

//rendering a product card
const renderProductCard = (product) => {
    const productCard = document.createElement('div');
    productCard.className = 'card';

    const productImage = document.createElement('img');
    productImage.src = product.thumbnail;
    productImage.alt = product.title;

    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    const title = document.createElement('h2');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = `Price: ${product.price} Afg`;

    const discount = document.createElement('p');
    discount.className = 'discount';
    discount.textContent = `Discount: ${product.discountPercentage}%`;

    const category = document.createElement('p');
    category.className = 'category';
    category.textContent = `Category: ${product.category}`;

    const stock = document.createElement('p');
    stock.className = 'stock';
    stock.textContent = `In Stock: ${product.stock} units`;

    cardContent.appendChild(title);
    cardContent.appendChild(price);
    cardContent.appendChild(discount);
    cardContent.appendChild(category);
    cardContent.appendChild(stock);

    productCard.appendChild(productImage);
    productCard.appendChild(cardContent);

    productCard.addEventListener('click', () => showDetails(product));

    productsContainer.appendChild(productCard);
};

//rendering pagination links
const renderPagination = (totalPages) => {
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.className = 'page-link';
        pageLink.textContent = i;
        pageLink.addEventListener('click', () => renderProducts(i, getCurrentProducts()));

        paginationContainer.appendChild(pageLink);
    }
};

//details of products
const showDetails = (product) => {
    const detailsPageUrl = `details.html?productId=${product.id}`;
    window.location.href = detailsPageUrl;
};

const populateCategories = (products) => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    const categoryOptions = uniqueCategories.map(category => `<option value="${category}">${category}</option>`);
    categoryFilter.innerHTML += categoryOptions.join('');
};
//filter products based on the selected category
const filterProductsByCategory = () => {
    const selectedCategory = categoryFilter.value;
    const filteredProducts = data.filter(product => selectedCategory === '' || product.category === selectedCategory);
    renderProducts(1, filteredProducts);
    renderPagination(Math.ceil(filteredProducts.length / productsPerPage));
};

//searching products based on the entered keyword
const searchProducts = () => {
    const keyword = searchInput.value.toLowerCase();
    const filteredProducts = data.filter(product =>
        product.title.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword)
    );
    renderProducts(1, filteredProducts);
    renderPagination(Math.ceil(filteredProducts.length / productsPerPage));
};

//get the current products based on the search and filter criteria
const getCurrentProducts = () => {
    const selectedCategory = categoryFilter.value;
    const keyword = searchInput.value.toLowerCase();

    return data.filter(product =>
        (selectedCategory === '' || product.category === selectedCategory) &&
        (keyword === '' || product.title.toLowerCase().includes(keyword) ||
            product.description.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword))
    );
};
