/**
 * Компонент, который реализует сортируемую таблицу
 * @param {Array} items - данные, которые нужно отобразить
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
function SortableTable(items) {
  /**
   * @property {Element} - обязательно свойство, которое ссылается на элемент <table>
   */
  this.el = document.createElement('table');
  
  let hteadElement = document.createElement('thead');
  this.el.append(hteadElement);

  let tdElement = createTrElement('Name', 'Age', 'Salary', 'City');
  hteadElement.append(tdElement);

  let tbodyElement = document.createElement('tbody');
  this.el.append(tbodyElement);
  
  for(let item of items){
    let trElement = createTrElement(item.name, item.age, item.salary, item.city);
    tbodyElement.append(trElement);
  }  

  /**
   * Метод выполняет сортировку таблицы
   * @param {number} column - номер колонки, по которой
   * нужно выполнить сортировку (отсчет начинается от 0)
   * @param {boolean} desc - признак того, что сортировка должна идти в обратном порядке
   */
  this.sort = function(column, desc = false) {    
    let tbodyElement = this.el.querySelector('tbody');    
    let rowsArray = Array.from(tbodyElement.rows);

    rowsArray.sort((row1, row2) => {
      if (column == 0 || column == 3){
        let sortResult = desc 
          ? row2.cells[column].innerHTML > row1.cells[column].innerHTML 
          : row1.cells[column].innerHTML > row2.cells[column].innerHTML;
        return sortResult ? 1 : -1;
      } else {        
        return desc 
          ? row2.cells[column].innerHTML - row1.cells[column].innerHTML
          : row1.cells[column].innerHTML - row2.cells[column].innerHTML;                
      }
      
    });
    
    tbodyElement.append(...rowsArray);
  };
}

function createTrElement(...cellInfo){  
  let trElement = document.createElement('tr');

  for (let cellInfoItem of cellInfo){    
    let tdElement = document.createElement('td');
    tdElement.innerHTML = cellInfoItem;
    trElement.append(tdElement);
  }

  return trElement;
}