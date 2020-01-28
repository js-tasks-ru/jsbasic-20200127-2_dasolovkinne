/**
 * ucFirst
 * @param {string} str
 * @returns {string}
 */
function ucFirst(str) {
    if (!str){
        return str;
    }
    
    str = str.trim();

    return str.charAt(0).toUpperCase() + str.slice(1);
}
