/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
    let rowIndex = 0;
    for(let trElement of table.querySelectorAll('tr')){
        trElement.children[rowIndex++].style.backgroundColor = 'red'
    }
}
