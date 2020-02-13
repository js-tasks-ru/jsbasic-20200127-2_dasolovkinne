/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
    for (let row of table.querySelector('tbody').rows){
        let nameElement = row.cells[0];
        let ageElement = row.cells[1];
        let genderElement = row.cells[2];
        let statusElement = row.cells[3];
        if (statusElement.dataset.available){

            //Проставит класс available/unavailable, в зависимости от значения атрибута data-available у ячейки Status
            row.classList.add(statusElement.dataset.available.toUpperCase() == 'TRUE' ? 'available' : 'unavailable');             
        } else {

            //Проставит атрибут hidden, если такого атрибута нет вообще
            row.hidden = true;
        }

        //Проставит класс male/female, в зависимости от содержимого ячейки Gender
        row.classList.add(genderElement.innerHTML.toUpperCase() == 'M' ? 'male' : 'female');

        //Установит inline-стиль style="text-decoration: line-through", если значение ячейки Age меньше 18
        if (ageElement.innerHTML < 18){
            row.style.cssText = 'text-decoration: line-through;';
        }
    }    
}