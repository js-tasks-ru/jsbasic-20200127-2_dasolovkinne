/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: 'Ilia',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *      },
 *
 * @constructor
 */
class ClearedTable {
  constructor(data) {
    this.data = data;

    this.el = document.createElement('table');
    this.el.classList.add('pure-table');
    
    let theadElement = document.createElement('thead');
    this.el.append(theadElement);
    
    this._addTrElement(theadElement, null, ["Name", "Age", "Salary", "City", ""]);
    
    let tbodyElement = document.createElement('tbody');
    this.el.append(tbodyElement);

    for (let dataItem of data){      
      this._addTrElement(tbodyElement, dataItem.id, [ dataItem.name, dataItem.age, dataItem.salary, dataItem.city, '<a href="#delete">X</a>' ]);
    }    

    this.el.addEventListener('click', () => this._onTableClick(event));  
  }

  _onTableClick(event){
    event.preventDefault();

    let trElement = event.target.closest('tr');
    if (!trElement || event.target.tagName != 'A'){
      return;
    }
    
    this._removeElement(trElement);                
  }

  _removeElement(deletedElement){
    let deletedElementId = deletedElement.dataset.id;

    //Удаляем HTML-элемент 
    deletedElement.remove();

    //Удаляем элемент массива
    let deletedItems = this.data.filter(item => item.id == deletedElementId );
    if (deletedItems && deletedItems.length > 0){      
      this.data.splice(this.data.indexOf(deletedItems[0]), 1);
    }

    this.onRemoved(+deletedElementId); 
  }

  _addTrElement(parentElement, id, tdValues) {
    let trElement = document.createElement('tr');
    parentElement.append(trElement);

    if (id){
      this._addAttrbute(trElement, 'data-id', id)      
    }

    for (let tdValue of tdValues){
      let tdElement = document.createElement('td');
      tdElement.innerHTML = tdValue;
      trElement.append(tdElement);
    }        
  }

  _addAttrbute(parentElement, name, value){
    let attribute = document.createAttribute(name);
    attribute.value = value;    
    parentElement.setAttributeNode(attribute);
  }

  /**
   * Метод который вызывается после удалении строки
   * @param {number} id - идентификатор удаляемого пользователя
   */
  onRemoved(id) {}
}

window.ClearedTable = ClearedTable;
