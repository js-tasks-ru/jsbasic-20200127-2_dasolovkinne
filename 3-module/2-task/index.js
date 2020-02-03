/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
    if (!str){
        return {
            min: 0,
            max: 0
        }
    }

    let stringNumbers = str.split(',').join(' ').split(' ').filter(item => isFinite(item)).map(item => +item);
    let minValue = stringNumbers.reduce(function(previousValue, item, index, array) {
        return previousValue < item ? previousValue : item;
      });

    let maxValue = stringNumbers.reduce(function(previousValue, item, index, array) {
        return previousValue > item ? previousValue : item;
      });

    return {
        min: minValue,
        max: maxValue
    } 
}
