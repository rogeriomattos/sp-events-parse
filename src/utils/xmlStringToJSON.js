const { DOMParser } = require('xmldom');

const xmlStringToJSON = (xml) => {
    var xmlNode = new DOMParser().parseFromString(xml, 'text/xml');
    return xmlToJSON(xmlNode);
};

const xmlToJSON = (xml) => {
    var obj = {};

    if (xml.nodeType == 1) {
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) {
        obj = xml.nodeValue;
    }
    
    var textNodes =(xml.childNodes != null)? [].slice.call(xml.childNodes).filter(function(node) {
        return node.nodeType === 3;
    }): [];

    if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
        obj = [].slice.call(xml.childNodes).reduce(function(text, node) {
            return text + node.nodeValue;
        }, "");
    } else if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof obj[nodeName] == "undefined") {
                obj[nodeName] = xmlToJSON(item);
            } else {
                if (typeof obj[nodeName].push == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJSON(item));
            }
        }
    }
    return obj;
};

module.exports = { xmlToJSON, xmlStringToJSON };