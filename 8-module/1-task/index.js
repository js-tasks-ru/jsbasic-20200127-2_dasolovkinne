class ProductList {
  productsUrl = '/assets/data/products.json';
  productsStoreKey = 'cart-products';

  constructor(element) {
    this.el = element;
  }

  show() {
    return fetch(this.productsUrl)
    .then((response) => response.json())
    .then((products) => {
      this.products = products;
      
      let productsHTML = '';
      for(let product of this.products){
        productsHTML += this._getProductHTML(product);
      }
      
      this.el.insertAdjacentHTML('afterbegin', this._getProductListHTML(productsHTML));

      this.el.addEventListener('click', (event) => {        
        if (event.target.dataset.buttonRole && 
          event.target.dataset.buttonRole == 'add-to-cart' &&
          confirm('Вы уверенны, что хотите добавить этот товар в корзину?')){
            this._onAddToCartClick();
          }
      });
    });     
  }

  _onAddToCartClick(){        
    let productsFromStorageJSON = localStorage.getItem('cart-products');
    if (!productsFromStorageJSON){
      productsFromStorageJSON = '[]';
    }

    let productsFromStorage = JSON.parse(productsFromStorageJSON);
    
    let selectedProductId = event.target.closest('div.products-list-product').dataset.productId;
    if (productsFromStorage.filter(productFromStorage => { return productFromStorage.id == selectedProductId }).length == 0){
      let selectedProduct = this.products.filter(product => { return product.id == selectedProductId })[0];
      productsFromStorage.push(selectedProduct);
    }
        
    localStorage.setItem('cart-products', JSON.stringify(productsFromStorage));
  }

  _getProductListHTML(productsHTML)
  {
    return `<div class="row justify-content-end">
      <div class="col-lg-9">
          <h3 class="section-title">Top Recommendations for You</h3>
          <div class="row homepage-cards">
              ${productsHTML}
          </div>
      </div>
  </div>`
  }

  _getProductHTML(product)
  {
    return `
    <div data-product-id="${product.id}" class="products-list-product col-md-6 col-lg-4 mb-4">
        <div class="card">
            <div class="card-img-wrap">
                <img class="card-img-top" src="${product.imageUrl}" alt="Card image cap">
            </div>
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <div class="rate">
                    <i class="icon-star ${product.rating && product.rating.stars >= 1 ? 'checked' : 'active'}"></i>
                    <i class="icon-star ${product.rating && product.rating.stars >= 2 ? 'checked' : 'active'}""></i>
                    <i class="icon-star ${product.rating && product.rating.stars >= 3 ? 'checked' : 'active'}""></i>
                    <i class="icon-star ${product.rating && product.rating.stars >= 4 ? 'checked' : 'active'}""></i>
                    <i class="icon-star ${product.rating && product.rating.stars >= 5 ? 'checked' : 'active'}""></i>
                    <span class="rate-amount ml-2">${product.rating ? product.rating.reviewsAmount : 0}</span>
                </div>
                <p class="card-text price-text discount"><strong>${product.price}</strong>
                ${product.oldPrice ? '<small class="ml-2">' + product.oldPrice + '</small>' : ''}
                </p>
                <button class="product-add-to-cart" data-button-role="add-to-cart">
                  Add to cart
                </button>
            </div>
        </div>
    </div>`;
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.ProductList = ProductList;
