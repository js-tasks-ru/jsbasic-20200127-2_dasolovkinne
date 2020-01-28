/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
    "use strict";
        
    let result = n > 0 ? n : 1;

    while (n > 1){
        result *= --n;        
    }
    
    return result;
}

