/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
    if (!friends || friends.length == 0){
        return;
    }

    let ulElement = document.createElement("ul");            

    for(let friend of friends){        
        let liElement = document.createElement("li"); 
        liElement.innerHTML = friend.firstName + " " + friend.lastName;
        ulElement.appendChild(liElement);
    }

    return ulElement;
}
