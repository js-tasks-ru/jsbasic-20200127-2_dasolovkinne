'use strict';

class CheckoutProductList {
  productsStoreKey = 'cart-products';

  constructor(parentElement) {
    let productsFromStorageJSON = localStorage.getItem('cart-products');
    if (!productsFromStorageJSON){
      productsFromStorageJSON = '[]';
    }

    this.productsFromStorage = JSON.parse(productsFromStorageJSON);
    let productFromStorageHTML = '';
      for(let productFromStorage of this.productsFromStorage){
        productFromStorageHTML += this._getProductHTML(productFromStorage);
      }
      
    parentElement.insertAdjacentHTML('afterbegin', this._getProductListHTML(productFromStorageHTML));

    parentElement.addEventListener('click', (event) => {        
      if (event.target.dataset.buttonRole && 
        event.target.dataset.buttonRole == 'checkout-remove-product' &&
        confirm('Вы уверенны, что хотите удалить этот товар из корзины?')){
          this._onRemoveFromCartClick();
        }
    });
  }

  _onRemoveFromCartClick(){
    let productsFromStorageJSON = localStorage.getItem('cart-products');
    if (!productsFromStorageJSON){
      productsFromStorageJSON = '[]';
    }
        
    let selectedProduct = event.target.closest('div.product-wrapper');
    let selectedProductId = selectedProduct.dataset.productId;
    let productsFromStorage = JSON.parse(productsFromStorageJSON);
    let removedProductsFromStorage = productsFromStorage.filter(productFromStorage => { return productFromStorage.id == selectedProductId })

    for (let removedProductFromStorage of removedProductsFromStorage){
      let removedProductIndex = productsFromStorage.indexOf(removedProductFromStorage);
      productsFromStorage.splice(removedProductIndex, 1);
    }    
        
    localStorage.setItem('cart-products', JSON.stringify(productsFromStorage));
    selectedProduct.remove();
  }

  _getProductListHTML(productsHTML){
    return `<div class="product-list-box">
    ${productsHTML}
    </div>`;
  }

  _getProductHTML(product){
    return `<div data-product-id="${product.id}" class="product-wrapper box-inner-col description-col">
  
    <div class="product-image-container">
      <img class="product-image" src="${product.imageUrl}" alt="img">
    </div>
    
    <div class="product-description">
      <h4 class="col-title mb-2">${product.title}</h4>
      <div class="rate">
        <i class="icon-star ${product.rating && product.rating.stars >= 1 ? 'checked' : 'active'}"></i>
        <i class="icon-star ${product.rating && product.rating.stars >= 2 ? 'checked' : 'active'}"></i>
        <i class="icon-star ${product.rating && product.rating.stars >= 3 ? 'checked' : 'active'}"></i>
        <i class="icon-star ${product.rating && product.rating.stars >= 4 ? 'checked' : 'active'}"></i>
        <i class="icon-star ${product.rating && product.rating.stars >= 5 ? 'checked' : 'active'}"></i>
      </div>
      <p class="rate-amount d-none d-md-block mt-1">${product.rating ? product.rating.reviewsAmount : 0} reviews</p>
    </div>
    
    <div class="product-price">
      <p class="mb-0 font-weight-light">Price:</p>
      <h4 class="col-title price-text mb-2">${product.price}</h4>
    </div>
    
    <div class="product-remove-button-wrapper">
      <button type="button"
              data-button-role="checkout-remove-product"
              class="product-remove-button">
        X
      </button>
    </div>
  
  </div>`;
  }
}

window.CheckoutProductList = CheckoutProductList;
