/**
 * Проверяем объект obj на пустоту
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
    if (!obj){
        return true;
    }    

    for (key in obj){
        return false;
    }

    return true;
}
/*
## Определите, пуст ли объект ##

Создайте функцию isEmpty(obj), которая возвращает true, 
если в объекте нет свойств и false – если хоть одно свойство есть.

Работать должно так:
```js
function isEmpty(obj) {
  // ваш код 
}

var schedule = {};

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "подъём";

alert( isEmpty(schedule) ); // false
```
*/