/*export function h(el: any, attrs: any, content: any) {
    const node = document.createElement(el);

    Object.entries(attrs || {}).forEach(([name, value]) => {
        node.setAttribute(name, value);
    });

    if (typeof content === "string") {
        content = document.createTextNode(content);
    }

    node.appendChild(content);

    return node;
}*/
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export var entityMap = {
    "&": "amp",
    "<": "lt",
    ">": "gt",
    '"': "quot",
    "'": "#39",
    "/": "#x2F",
};
export var escapeHtml = function (str) {
    return String(str).replace(/[&<>"'\/\\]/g, function (s) { return "&".concat(entityMap[s], ";"); });
};
// To keep some consistency with React DOM, lets use a mapper
// https://reactjs.org/docs/dom-elements.html
export var AttributeMapper = function (val) {
    return ({
        tabIndex: "tabindex",
        className: "class",
        readOnly: "readonly",
    }[val] || val);
};
// tslint:disable-next-line:no-default-export
export function DOMcreateElement(tag, attrs) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    attrs = attrs || {};
    var stack = __spreadArray([], children, true);
    // Support for components(ish)
    if (typeof tag === "function") {
        attrs.children = stack;
        return tag(attrs);
    }
    var elm = document.createElement(tag);
    // Add attributes
    for (var _a = 0, _b = Object.entries(attrs); _a < _b.length; _a++) {
        var _c = _b[_a], name_1 = _c[0], val = _c[1];
        name_1 = escapeHtml(AttributeMapper(name_1));
        if (name_1.startsWith("on") && name_1.toLowerCase() in window) {
            elm.addEventListener(name_1.toLowerCase().substr(2), val);
        }
        else if (name_1 === "ref") {
            val(elm);
        }
        else if (name_1 === "style") {
            Object.assign(elm.style, val);
        }
        else if (val === true) {
            elm.setAttribute(name_1, name_1);
        }
        else if (val !== false && val != null) {
            elm.setAttribute(name_1, escapeHtml(val));
        }
        else if (val === false) {
            elm.removeAttribute(name_1);
        }
    }
    // Append children
    while (stack.length) {
        var child = stack.shift();
        // Is child a leaf?
        if (!Array.isArray(child)) {
            elm.appendChild(child.nodeType == null
                ? document.createTextNode(child.toString())
                : child);
        }
        else {
            stack.push.apply(stack, child);
        }
    }
    return elm;
}
export var DOMcreateFragment = function (_attrs) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    return children;
};
