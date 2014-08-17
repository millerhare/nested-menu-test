/*
 * Fetches the requested JSON object and executes the callback on it 
 * if successfully retrieved.
 */

function loader(url, callback) {
    'use strict';
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        var result;

        if (request.readyState === request.DONE) {
            if (request.status === 200) {
                result = JSON.parse(request.responseText);
                callback(result);
            } else {
                console.error('Bad request status: ', request.status);
            }
        }
    };

    request.open('GET', url, true);
    request.send();
}
