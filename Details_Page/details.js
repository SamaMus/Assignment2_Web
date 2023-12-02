document.addEventListener('DOMContentLoaded', function() {
    // from the query parameter we get the product ID 
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('productId');

    // Based on the product ID we can fetch product details 
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => {
            const product = data.products.find(p => p.id == productId);

            // now we have product details
            renderProductDetails(product);
        })
        .catch(error => console.error('Error fetching product details:', error));
});