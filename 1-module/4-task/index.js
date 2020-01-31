/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
    str = str || "";
    let strUpperCase = str.toUpperCase();

    return strUpperCase.includes('1xBet'.toUpperCase()) || strUpperCase.includes('XXX'); 
}