'use strict';

class Menu {
  template = `
  <ul class="list-group sidebar">
    <li class="list-group-item dropdown">
      <a class="nav-link dropdown-toggle" id="cameraphotos">Camera &amp; Photo</a>
      <ul class="dropdown-menu">   
        
       <li data-id="cameraphotos_accessories" class="dropdown-item"><a>Accessories</a></li>
    
      </ul>
    </li>
  
    <li class="list-group-item dropdown">
      <a class="nav-link dropdown-toggle" id="cinema">Home Cinema, TV &amp; Video</a>
      <ul class="dropdown-menu">   
        
       <li data-id="cinema_audio" class="dropdown-item"><a>Audio</a></li>
    
       <li data-id="cinema_video" class="dropdown-item"><a>Video</a></li>
    
      </ul>
    </li>
  </ul>
  `;

  constructor(element) {
    element.insertAdjacentHTML('afterbegin', this.template);

    for (let innerMenuItem of element.querySelectorAll('li.list-group-item')){
      innerMenuItem.addEventListener('pointerenter', () => this._onPointerenter(event));
      innerMenuItem.addEventListener('pointerleave', () => this._onPointerleave(event));      
    } 
    
    element.addEventListener('click', () => this._onClick(event));          
  }

  _onClick(event){
    let liElement = event.target.closest('li.dropdown-item');
    if (!liElement){
      return;
    }

    event.preventDefault();
    
    liElement.dispatchEvent(new CustomEvent('select', {
      bubbles: true,
      cancelable: true,
      detail: { id: liElement.dataset.id }
    }));    
  }

  _onPointerenter(event){    
    event.preventDefault();
        
    for (let innerMenuItem of event.target.querySelectorAll('li.list-group-item ul.dropdown-menu')){
      innerMenuItem.classList.add('show');
    }

    for (let backdrop of document.querySelectorAll('.backdrop')){
      backdrop.classList.add('show');
    }
  }

  _onPointerleave(event){    
    event.preventDefault();
        
    for (let innerMenuItem of event.target.querySelectorAll('li.list-group-item ul.dropdown-menu')){
      innerMenuItem.classList.remove('show');
    }

    for (let backdrop of document.querySelectorAll('.backdrop')){
      backdrop.classList.remove('show');
    }
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.Menu = Menu;