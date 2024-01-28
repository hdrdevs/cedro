import { w } from "./windget.collection";
export var WidgetTypes;
(function (WidgetTypes) {
    WidgetTypes[WidgetTypes["FILL"] = 1] = "FILL";
    WidgetTypes[WidgetTypes["CUSTOM"] = 2] = "CUSTOM";
    WidgetTypes[WidgetTypes["FREE"] = 3] = "FREE";
})(WidgetTypes || (WidgetTypes = {}));
export var WidgetAlignTypes;
(function (WidgetAlignTypes) {
    WidgetAlignTypes[WidgetAlignTypes["HORIZONTAL"] = 1] = "HORIZONTAL";
    WidgetAlignTypes[WidgetAlignTypes["VERTICAL"] = 2] = "VERTICAL";
})(WidgetAlignTypes || (WidgetAlignTypes = {}));
var Widget = /** @class */ (function () {
    function Widget(id, bodyTagName, parent) {
        if (bodyTagName === void 0) { bodyTagName = "div"; }
        if (parent === void 0) { parent = null; }
        var _this = this;
        this.id = id;
        this.overflow = false;
        this.subscribers = new Map();
        this.padding = 0;
        this.left = 0;
        this.top = 0;
        this.width = 0;
        this.height = 0;
        this.initialWidth = 0;
        this.initialHeight = 0;
        this.fixedSize = null;
        this.type = WidgetTypes.FREE;
        this.align = WidgetAlignTypes.VERTICAL;
        this.visible = true;
        this.enabled = true;
        this.parent = parent;
        this.childs = [];
        this.bodyTagName = bodyTagName;
        this.body = document.createElement(this.bodyTagName);
        this.body.id = "WUI.".concat(id, ".body");
        if (parent) {
            //this.setType(WidgetTypes.CUSTOM);
            parent.addChild(this);
            parent.getBody().appendChild(this.body);
        }
        else {
            this.setType(WidgetTypes.FREE);
            document.body.appendChild(this.body);
        }
        this.body.addEventListener("click", function (e) {
            _this.subscribers.forEach(function (callback) {
                if (callback.event == "click") {
                    callback.then(e, _this);
                }
            });
        });
        this.body.addEventListener("mousedown", function (e) {
            _this.subscribers.forEach(function (callback) {
                if (callback.event == "mousedown") {
                    callback.then(e, _this);
                }
            });
        });
        this.body.addEventListener("mouseup", function (e) {
            _this.subscribers.forEach(function (callback) {
                if (callback.event == "mouseup") {
                    callback.then(e, _this);
                }
            });
        });
        this.body.addEventListener("mousemove", function (e) {
            _this.subscribers.forEach(function (callback) {
                if (callback.event == "mousemove") {
                    callback.then(e, _this);
                }
            });
        });
        this.init();
        this.getMaxZIndex();
    }
    Widget.prototype.subscribe = function (cb) {
        var randomId = Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        this.subscribers.set("".concat(randomId, ".").concat(cb.event), cb);
    };
    Widget.prototype.unsubscribe = function (event) {
        this.subscribers.delete("".concat(event));
    };
    /**
     * Sets the padding value for the object.
     *
     * @param {number} p - The padding value to set.
     * @return {void} This function does not return a value.
     */
    Widget.prototype.setPadding = function (p) {
        this.padding = p;
    };
    /**
     * Sets the value of x and updates the left position of the element.
     *
     * @param {number} x - The new value of x.
     * @return {void} This function does not return anything.
     */
    Widget.prototype.setX = function (x) {
        this.left = x;
        this.body.style.left = "".concat(x, "px");
    };
    /**
     * Sets the value of the 'y' property and updates the 'top' and 'body.style.top' properties accordingly.
     *
     * @param {number} y - The new value for the 'y' property.
     * @return {void} This function does not return a value.
     */
    Widget.prototype.setY = function (y) {
        this.top = y;
        this.body.style.top = "".concat(y, "px");
    };
    /**
     * Sets the width of the element and updates the corresponding inline style.
     *
     * @param {number} w - The new width value.
     * @return {void} This function does not return a value.
     */
    Widget.prototype.setW = function (w) {
        //this.width = w;
        this.body.style.width = "".concat(w, "px");
    };
    /**
     * Sets the initial value of the width property.
     *
     * @param {number} w - The initial width value.
     * @return {void} This function does not return a value.
     */
    Widget.prototype.setInitialW = function (w) {
        this.initialWidth = w;
    };
    /**
     * Sets the value of the height property and updates the height of the element.
     *
     * @param {number} h - The new height value.
     * @return {void} This function does not return any value.
     */
    Widget.prototype.setH = function (h) {
        //this.height = h;
        this.body.style.height = "".concat(h, "px");
    };
    /**
     * Sets the initial height of the object.
     *
     * @param {number} h - The initial height value to set.
     * @return {void} This function does not return a value.
     */
    Widget.prototype.setInitialH = function (h) {
        this.initialHeight = h;
    };
    /**
     * Sets the width and height of the element.
     *
     * @param {number} w - The width to set.
     * @param {number} h - The height to set.
     * @return {void} This function does not return anything.
     */
    Widget.prototype.setWH = function (w, h) {
        var _this = this;
        this.width = w;
        this.height = h;
        this.body.style.width = "".concat(w, "px");
        this.body.style.height = "".concat(h, "px");
        //ejecutar los subscriptores
        this.subscribers.forEach(function (callback) {
            if (callback.event == "resize") {
                callback.then(new Event("resize"), _this);
            }
        });
    };
    Widget.prototype.setFixedSize = function (s) {
        this.fixedSize = s;
    };
    /**
     * Sets the type of the widget.
     *
     * @param {WidgetTypes} type - The type of widget to set.
     * @return {void} This function does not return anything.
     */
    Widget.prototype.setType = function (type) {
        this.type = type;
        var freeStyle = false;
        if (this.type === WidgetTypes.FREE) {
            freeStyle = true;
        }
        var parent = this.getParent();
        if (parent) {
            if (parent.type === WidgetTypes.FREE) {
                freeStyle = true;
            }
        }
        if (freeStyle) {
            //this.body.style.position = "relative";
            this.addClass("WUIFixPosition");
            //this.body.style.overflow = "auto";
            this.body.style.left = "";
            this.body.style.top = "";
            this.body.style.width = "";
            this.body.style.height = "";
            this.body.style.bottom = "";
            this.body.style.right = "";
        }
        else {
            if (this.type === WidgetTypes.CUSTOM ||
                this.type === WidgetTypes.FILL) {
                this.body.style.position = "absolute";
                this.body.style.overflow = "hidden";
            }
        }
        if (this.initialWidth != 0) {
            this.body.style.width = "".concat(this.initialWidth, "px");
        }
        if (this.initialHeight != 0) {
            this.body.style.height = "".concat(this.initialHeight, "px");
        }
    };
    /**
     * Sets the alignment of the widget.
     *
     * @param {WidgetAlignTypes} align - The alignment to set.
     * @return {void}
     */
    Widget.prototype.setAlign = function (align) {
        this.align = align;
    };
    /**
     * Sets the visibility of the element.
     *
     * @param {boolean} visible - The visibility state of the element.
     * @return {void}
     */
    Widget.prototype.setVisible = function (visible) {
        this.visible = visible;
        this.body.style.display = visible ? "" : "none";
    };
    /**
     * Sets the enabled status of the object.
     *
     * @param {boolean} enabled - The new enabled status.
     * @return {void} This function does not return a value.
     */
    Widget.prototype.setEnabled = function (enabled) {
        this.enabled = enabled;
    };
    /**
     * Sets the parent of the widget.
     *
     * @param {IWidget | null} parent - The parent widget or null if there is no parent.
     * @return {void} This function does not return anything.
     */
    Widget.prototype.setParent = function (parent) {
        var _a;
        if (this.parent) {
            if (this.body) {
                if (this.body.parentNode) {
                    this.body.parentNode.removeChild(this.body);
                }
            }
        }
        this.parent = parent;
        (_a = this.parent) === null || _a === void 0 ? void 0 : _a.body.appendChild(this.body);
        //this.parent?.addChild(this);
    };
    /**
     * Sets the body of the element.
     *
     * @param {HTMLElement} body - The new body element.
     * @return {void} This function does not return anything.
     */
    Widget.prototype.setBody = function (body) {
        var _a;
        if (this.body.parentNode) {
            this.body.parentNode.removeChild(this.body);
        }
        this.body = body;
        (_a = this.parent) === null || _a === void 0 ? void 0 : _a.getBody().appendChild(this.body);
    };
    /**
     * Sets the array of child widgets for this widget.
     *
     * @param {IWidget[]} childs - The array of child widgets to set.
     * @return {void}
     */
    Widget.prototype.setChilds = function (childs) {
        this.childs = childs;
    };
    /**
     * Sets the overflow value.
     *
     * @param {boolean} overflow - The new value for the overflow.
     * @return {void} This function does not return a value.
     */
    Widget.prototype.setOverflow = function (overflow) {
        this.overflow = overflow;
        this.getBody().style.overflow = this.overflow ? "auto" : "hidden";
    };
    /**
     * Adds a CSS class to the list of CSS classes.
     *
     * @param {string} cssClass - The CSS class to add.
     * @return {void}
     */
    Widget.prototype.addClass = function (cssClass) {
        this.body.classList.add(cssClass);
    };
    /**
     * Deletes a CSS class from the list of CSS classes.
     *
     * @param {string} cssClass - The CSS class to be deleted.
     * @return {void} This function does not return a value.
     */
    Widget.prototype.deleteClass = function (cssClass) {
        this.body.classList.remove(cssClass);
    };
    Widget.prototype.deleteAllClasses = function () {
        var _this = this;
        this.body.classList.forEach(function (cssClass) {
            _this.deleteClass(cssClass);
        });
    };
    /**
     * Retrieves the padding value.
     *
     * @return {number} The padding value.
     */
    Widget.prototype.getPadding = function () {
        return this.padding;
    };
    /**
     * Retrieves the value of the 'left' property.
     *
     * @return {number} The value of the 'left' property.
     */
    Widget.prototype.getX = function () {
        return this.left;
    };
    /**
     * Retrieves the value of Y.
     *
     * @return {number} The value of Y.
     */
    Widget.prototype.getY = function () {
        return this.top;
    };
    /**
     * Get the width of the object.
     *
     * @return {number} The width of the object.
     */
    Widget.prototype.getW = function () {
        //return this.width;
        return this.getBody().clientWidth;
    };
    /**
     * Returns the value of the height property.
     *
     * @return {number} The value of the height property.
     */
    Widget.prototype.getH = function () {
        //return this.height;
        return this.getBody().clientHeight;
    };
    /**
     * Returns the position of the element relative to the viewport.
     *
     * @param {boolean} scroll - Indicates whether to account for scrolling in the position calculation. Defaults to false.
     * @return {Vector2D} An object with x and y properties representing the position of the element.
     */
    Widget.prototype.getPosition = function (scroll) {
        if (scroll === void 0) { scroll = false; }
        var box = this.getBody().getBoundingClientRect();
        var body = document.body;
        var docElem = document.documentElement;
        var scrollTop = scroll ? docElem.scrollTop || body.scrollTop : 0;
        var scrollLeft = scroll ? docElem.scrollLeft || body.scrollLeft : 0;
        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;
        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;
        return { x: Math.round(left), y: Math.round(top) };
    };
    Widget.prototype.getFixedSize = function () {
        return this.fixedSize;
    };
    /**
     * Returns the type of the widget.
     *
     * @return {WidgetTypes} The type of the widget.
     */
    Widget.prototype.getType = function () {
        return this.type;
    };
    /**
     * Retrieves the alignment of the widget.
     *
     * @return {WidgetAlignTypes} The alignment of the widget.
     */
    Widget.prototype.getAlign = function () {
        return this.align;
    };
    /**
     * Retrieves the value of the enabled flag.
     *
     * @return {boolean} The value of the enabled flag.
     */
    Widget.prototype.getEnabled = function () {
        return this.enabled;
    };
    /**
     * Returns the visibility status of the element.
     *
     * @return {boolean} The visibility status of the element.
     */
    Widget.prototype.getVisible = function () {
        return this.visible;
    };
    /**
     * Retrieves the parent widget of this widget.
     *
     * @return {IWidget | null} The parent widget or null if there is no parent.
     */
    Widget.prototype.getParent = function () {
        return this.parent;
    };
    /**
     * Returns the body element of the object.
     *
     * @return {HTMLElement} The body element.
     */
    Widget.prototype.getBody = function () {
        return this.body;
    };
    /**
     * Retrieves the array of child widgets.
     *
     * @return {IWidget[]} The array of child widgets.
     */
    Widget.prototype.getChilds = function () {
        return this.childs;
    };
    /**
     * Returns the value of the 'overflow' property.
     *
     * @return {boolean} The value of the 'overflow' property.
     */
    Widget.prototype.getOverflow = function () {
        return this.overflow;
    };
    /**
     * Adds a child widget to the current widget.
     *
     * @param {IWidget} child - The widget to be added.
     * @return {void} - This function does not return anything.
     */
    Widget.prototype.addChild = function (child) {
        if (child === void 0) { child = null; }
        if (!child)
            return;
        this.childs.push(child);
        child.setParent(this);
        child.init();
        /*child.resize();
        child.render();*/
    };
    /**
     * Disables the selection feature.
     *
     * @param {void} -
     * @return {void} -
     */
    Widget.prototype.disableSelection = function () {
        console.log("disableSelection");
    };
    /**
     * Enables selection.
     *
     */
    Widget.prototype.enableSelection = function () {
        console.log("enableSelection");
    };
    /**
     * Hides the element by setting its visibility to false.
     *
     * @param {void} -
     * @return {void} -
     */
    Widget.prototype.hide = function () {
        this.setVisible(false);
    };
    /**
     * Initializes the function.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    Widget.prototype.init = function () {
        if (this.type !== WidgetTypes.FREE) {
            this.body.style.position = "absolute";
            this.body.style.overflow = "hidden";
        }
        this.initPosition();
    };
    /**
     * Initializes the position.
     *
     * @param {void} - No parameters required.
     * @return {void} - No return value.
     */
    Widget.prototype.initPosition = function () {
        if (this.type === WidgetTypes.FILL) {
            if (!this.parent) {
                this.setX(0);
                this.setY(0);
                this.setWH(window.innerWidth, window.innerHeight);
            }
            else {
                //Si tiene padre que lo controle el padre!
                return;
            }
        }
    };
    /**
     * Renders the component.
     *
     * @return {void}
     */
    Widget.prototype.render = function () {
        //this.initPosition();
        var padding = this.padding;
        var size = this.align === WidgetAlignTypes.HORIZONTAL
            ? this.width
            : this.height;
        var currentPosition = padding;
        //Obtener el available size si hay elementos con fixed size
        var sumFixedSizes = 0;
        var totalFillElements = 0;
        for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.type === WidgetTypes.FILL) {
                totalFillElements++;
            }
        }
        var freeElements = totalFillElements;
        for (var _b = 0, _c = this.childs; _b < _c.length; _b++) {
            var child = _c[_b];
            if (child.getFixedSize() !== null) {
                sumFixedSizes += child.getFixedSize();
                freeElements--;
            }
        }
        var availableSize = size - sumFixedSizes;
        /**
         * Elementos que tienen un padre LIBRE
         * ===================================
         */
        var myParent = this.getParent();
        if (myParent) {
            if (myParent.type === WidgetTypes.FREE) {
                //this.getBody().style.position = "relative";
                this.addClass("WUIFixPosition");
                this.getBody().style.left = "";
                this.getBody().style.top = "";
                this.getBody().style.height = "";
                this.getBody().style.width = "";
                if (this.initialWidth != 0) {
                    this.getBody().style.width = "".concat(this.initialWidth, "px");
                }
                if (this.initialHeight != 0) {
                    this.getBody().style.height = "".concat(this.initialHeight, "px");
                }
            }
        }
        /************************************ */
        for (var _d = 0, _e = this.childs; _d < _e.length; _d++) {
            var child = _e[_d];
            if (child.type !== WidgetTypes.FILL) {
                child.render();
                continue;
            }
            var elementSize = (availableSize - padding) / freeElements;
            if (child.getFixedSize() !== null) {
                elementSize = child.getFixedSize();
            }
            if (this.align === WidgetAlignTypes.HORIZONTAL) {
                child.setY(padding);
                child.setX(currentPosition);
                if (child.type === WidgetTypes.FILL) {
                    child.setWH(elementSize - padding, this.getH() - padding * 2);
                }
                else {
                    child.setWH(elementSize - padding, this.getH() - padding * 2);
                }
            }
            else if (this.align === WidgetAlignTypes.VERTICAL) {
                child.setX(padding);
                child.setY(currentPosition);
                if (child.type === WidgetTypes.FILL) {
                    child.setWH(this.getW() - padding * 2, elementSize - padding);
                }
                else {
                    child.setWH(this.getW() - padding * 2, elementSize - padding);
                }
            }
            currentPosition += elementSize;
            child.render();
        }
    };
    /**
     * Resizes the element and its child elements.
     */
    Widget.prototype.resize = function () {
        // Initialize the position of the element
        this.initPosition();
        this.render();
    };
    /**
     * Displays the element on the screen.
     *
     * @return {void} - Does not return a value.
     */
    Widget.prototype.display = function () {
        this.setVisible(true);
    };
    /**
     * Toggles the visibility of something.
     *
     * @return {void} Nothing is returned.
     */
    Widget.prototype.toggle = function () {
        this.setVisible(!this.visible);
    };
    Widget.prototype.renderHTML = function (content) {
        this.body.appendChild(content);
        return content;
    };
    Widget.prototype.getMaxZIndex = function (maxZindex, node) {
        var _this = this;
        if (maxZindex === void 0) { maxZindex = 0; }
        if (node === void 0) { node = null; }
        var parent = node ? node : document.body;
        if (parent instanceof HTMLElement) {
            if (parseInt(window.getComputedStyle(parent).zIndex) > maxZindex) {
                maxZindex = parseInt(window.getComputedStyle(parent).zIndex);
            }
        }
        parent === null || parent === void 0 ? void 0 : parent.childNodes.forEach(function (child) {
            maxZindex = _this.getMaxZIndex(maxZindex, child);
        });
        return maxZindex;
    };
    Widget.prototype.setZIndex = function (zIndex) {
        this.getBody().style.zIndex = "".concat(zIndex);
    };
    Widget.prototype.raisteTop = function () {
        this.setZIndex(this.getMaxZIndex() + 1);
    };
    Widget.prototype.raiseBottom = function () {
        this.setZIndex(0);
    };
    /**
     * Attaches a widget to the current widget and delete all pre-existents widgets
     *
     * @param {IWidget} guest - The widget to attach.
     * @return {void} This function does not return anything.
     */
    Widget.prototype.attachWidget = function (guest) {
        this.removeAllChilds();
        this.addChild(guest);
        guest.setParent(this);
        guest.render();
        this.resize();
        this.render();
    };
    /**
     * Removes all child nodes from the current element.
     *
     * @return {void} No return value.
     */
    Widget.prototype.removeAllChilds = function () {
        while (this.getBody().childNodes.length > 0) {
            var child = this.getBody().firstChild;
            if (child)
                this.getBody().removeChild(child);
        }
        this.childs = [];
    };
    Widget.prototype.free = function () {
        if (this.childs) {
            for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
                var child = _a[_i];
                child.free();
            }
        }
        w.delete(this.id);
    };
    return Widget;
}());
export { Widget };
