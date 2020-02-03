/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
    if (!str){
        return str;
    }

    return str.split('-').map((item, index) => index > 0 ? item.charAt(0).toLocaleUpperCase() + item.slice(1) : item).join('');
}
