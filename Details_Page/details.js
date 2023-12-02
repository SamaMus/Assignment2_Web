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

const renderProductDetails = (product) => {
    const productTitle = document.getElementById('product-title');
    productTitle.textContent = `${product.title} Details`;

    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = '';

    const detailsCard = document.createElement('div');
    detailsCard.className = 'details-card';

    const detailsImage = document.createElement('img');
    detailsImage.src = product.thumbnail;
    detailsImage.alt = product.title;

    const detailsContent = document.createElement('div');
    detailsContent.className = 'details-content';

    const title = document.createElement('h2');
    title.textContent = product.title;

    const description = document.createElement('h3');
    description.textContent = product.description;

    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = `Price: ${product.price} Afg`;

    const discount = document.createElement('p');
    discount.className = 'discount';
    discount.textContent = `Discount: ${product.discountPercentage}%`;

    const stock = document.createElement('p');
    stock.className = 'stock';
    stock.textContent = `In Stock: ${product.stock} units`;

    const rating = document.createElement('p');
    rating.className = 'rating';
    rating.textContent = `Rating: ${product.rating}/5`;

    detailsContent.appendChild(title);
    detailsContent.appendChild(description);
    detailsContent.appendChild(price);
    detailsContent.appendChild(discount);
    detailsContent.appendChild(stock);
    detailsContent.appendChild(rating);

    const gallery = document.createElement('div');
    gallery.className = 'gallery';

    product.images.forEach(image => {
        const galleryImage = document.createElement('img');
        galleryImage.src = image;
        galleryImage.alt = product.title;
        galleryImage.addEventListener('click', () => showImageDetails(image));
        gallery.appendChild(galleryImage);
    });

    detailsCard.appendChild(detailsImage);
    detailsCard.appendChild(detailsContent);
    detailsCard.appendChild(gallery);

    detailsContainer.appendChild(detailsCard);
};
