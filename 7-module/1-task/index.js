/**
 * promiseClick
 * @param {Element} button index
 * @returns {Promise}
 */

function promiseClick(button) {
    return new Promise(function(resolve, reject){
        button.addEventListener('click', function(event){
            return resolve(event);
        }, { once: true });
    });
}
