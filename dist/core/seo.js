var MetaData = /** @class */ (function () {
    function MetaData() {
        this.items = [];
    }
    MetaData.prototype.add = function (element) {
        this.items.push(element);
        var meta = document.createElement("meta");
        meta.setAttribute("name", element.name);
        meta.setAttribute("content", element.content);
        if (element.lang)
            meta.setAttribute("lang", element.lang);
        if (element.dir)
            meta.setAttribute("dir", element.dir);
        document.head.appendChild(meta);
    };
    MetaData.prototype.get = function (name) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].name === name) {
                return this.items[i];
            }
        }
        return null;
    };
    MetaData.prototype.deleteByName = function (name) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].name === name) {
                this.items.splice(i, 1);
                var deleteItem = document.querySelector("meta[name=\"".concat(name, "\"]"));
                if (deleteItem)
                    document.head.removeChild(deleteItem);
            }
        }
    };
    return MetaData;
}());
export { MetaData };
var Seo = /** @class */ (function () {
    function Seo(title) {
        this.title = title;
        this.meta = new MetaData();
    }
    Seo.prototype.setTitle = function (title) {
        document.title = title;
        this.title = title;
    };
    Seo.prototype.getTitle = function () {
        return this.title;
    };
    return Seo;
}());
export { Seo };
