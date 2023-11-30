document.addEventListener('DOMContentLoaded', () => {
    // Fetch data from the API
    fetch('https://dummyjson.com/products')
        .then((response) => response.json())
        .then((data) => {
            // Store the product data globally for search and filter functionality
            window.productData = data.products;

            // Display products on the home page
            displayProducts(window.productData, 1); // Display the first page initially

            // Implement search, filter, and pagination functionality
            // You can add event listeners and functions here
            document.getElementById('searchInput').addEventListener('input', handleSearch);
            document.getElementById('categoryFilter').addEventListener('change', handleFilterChange);
            document.getElementById('minPrice').addEventListener('input', handleFilterChange);
            document.getElementById('maxPrice').addEventListener('input', handleFilterChange);

            // Populate category filter options
            populateCategoryFilter(data.categories);

            // Display the selected filters
            displaySelectedFilters();
        })
        .catch((error) => console.error('Error fetching data:', error));
});
