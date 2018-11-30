
var cors_api_url = 'https://cors-anywhere.herokuapp.com/';

export function doCORSRequest(options, resolve, reject) {
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    x.setRequestHeader("Content-type", 'application/json')
    x.onload = function () {
        console.log('doCORSRequest', x)
        if (x.status === 200) {
            resolve && resolve(x.responseText)
        } else {
            reject && reject({
                error: x.status,
                message: x.statusText
            })
        }
    }
    x.onerror = function (error) {
        reject && reject({
            error: -1,
            message: 'readyState: ' + x.readyState
        })
    };
    if (/^POST/i.test(options.method)) {
        x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    x.send(options.data);
}

