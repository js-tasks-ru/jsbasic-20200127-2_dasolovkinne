'use strict';

class Carousel {
  slides = [
    {
      id: 0,
      title: 'BEST LAPTOP DEALS',
      img: './assets/images/default-slide-img.jpg'
    },
    {
      id: 1,
      title: 'BEST HEADPHONES DEALS',
      img: './assets/images/default-slide-img.jpg'
    },
    {
      id: 2,
      title: 'BEST SPEAKERS DEALS',
      img: './assets/images/default-slide-img.jpg'
    }
  ];

  constructor(element) {
    this.el = element;
    this.tempCarouselIndex = 0;

    this._addCarousel(this.el); 
    
    let carouselControlPrev = this.el.querySelector('.carousel-control-prev');
    carouselControlPrev.addEventListener('click', (event) => {
      event.preventDefault();

      this.tempCarouselIndex = --this.tempCarouselIndex;
      if (this.tempCarouselIndex < 0){
        this.tempCarouselIndex = this.slides.length - 1;
      }
      this._addCarouselItem(this.slides[this.tempCarouselIndex]);
    });

    let carouselControlNext = this.el.querySelector('.carousel-control-next');
    carouselControlNext.addEventListener('click', (event) => {
      event.preventDefault();

      this.tempCarouselIndex = ++this.tempCarouselIndex;
      if (this.tempCarouselIndex > this.slides.length - 1){
        this.tempCarouselIndex = 0;
      }
      this._addCarouselItem(this.slides[this.tempCarouselIndex]);
    });

    let carouselIndicators = this.el.querySelector('.carousel-indicators');
    carouselIndicators.addEventListener('click', (event) => {      
      event.preventDefault();
      
      this._addCarouselItem(this.slides[+event.target.dataset.slideTo]);
    });
  }

  _addCarousel(parentElement){
    parentElement.insertAdjacentHTML('afterbegin', 
      `<div id="mainCarousel" class="main-carousel carousel slide">
          <ol class="carousel-indicators">
              <li data-target="#mainCarousel" data-slide-to="0" class="carousel-indicator"></li>
              <li data-target="#mainCarousel" data-slide-to="1" class="carousel-indicator"></li>
              <li data-target="#mainCarousel" data-slide-to="2" class="carousel-indicator"></li>
          </ol>
          <div class="carousel-inner">              
            
          </div>
          
          <button class="carousel-control-prev" href="#mainCarousel" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
          </button>
          <button class="carousel-control-next" href="#mainCarousel" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
          </button>
      </div>`);

    this._addCarouselItem(this.slides[this.tempCarouselIndex]);      
  }

  _addCarouselItem(slide){
    let parentElement = this.el.querySelector('.carousel-inner');    
    parentElement.insertAdjacentHTML('afterbegin',
      `<div class="carousel-item active">
          <img src="${slide.img}" alt="Activelide">
          <div class="container">
              <div class="carousel-caption">
                  <h3 class="h1">${slide.title}</h3>
                  <div>
                      <a class="btn" href="#" role="button">
                          View all DEALS
                          <img src="assets/icons/icon-angle-white.svg" class="ml-3" alt="">
                      </a>
                  </div>
              </div>
          </div>
      </div>`);

      for (let carouselIndicator of this.el.querySelectorAll('.carousel-indicators .carousel-indicator')){
        carouselIndicator.classList.remove('active');
      }

      const nextActiveIndicator = this.el.querySelector(`*[data-slide-to="${slide.id}"]`);
      nextActiveIndicator.classList.add('active');
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.Carousel = Carousel;
