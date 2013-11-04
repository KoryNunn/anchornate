var crel = require('crel');

var createTextNode = document.createTextNode.bind(document);

module.exports = function linkify(text) {
    var fragment = document.createDocumentFragment(),
        exp = /(\b\w+?:\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;

    while (text.search(exp) > -1) {
        var results = exp.exec(text),
            resultURL = results[1];

        fragment.appendChild(createTextNode(text.slice(0, results.index)));

        fragment.appendChild(
            crel('a', {href:resultURL}, resultURL)
        );

        text = text.slice(results.index + resultURL.length);
    }

    text && createTextNode(text);

    return fragment;
}