/**
 * truncate
 * @param {string} str
 * @param {number} maxlength
 * @returns {string}
 */
function truncate(str, maxlength) {
    if (!str){
        return str;
    }
        
    return maxlength > 0
        ? str.length > maxlength
            ? str.substr(0, maxlength - 1) + "…"
            : str
        : "";
}