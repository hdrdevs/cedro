var Screen = /** @class */ (function () {
    function Screen() {
        var _this = this;
        this.dimensions = {
            x: 0,
            y: 0,
        };
        this.onResizeCB = function () { };
        window.addEventListener("resize", function () {
            _this.updateSize();
            _this.onResizeCB();
        });
        this.updateSize();
    }
    Screen.prototype.onResize = function (cb) {
        this.onResizeCB = cb;
    };
    /**
     * Populates the size of the object.
     *
     * @return {void} This function does not return anything.
     */
    Screen.prototype.populateSize = function () {
        console.log("populateSize", this.dimensions);
    };
    Screen.prototype.updateSize = function () {
        this.setWidth(window.innerWidth);
        this.setHeight(window.innerHeight);
    };
    /**
     * Retrieves the width of the object.
     *
     * @return {number} The width of the object.
     */
    Screen.prototype.getWidth = function () {
        return this.dimensions.x;
    };
    /**
     * Get the height of the object.
     *
     * @return {number} The height of the object.
     */
    Screen.prototype.getHeight = function () {
        return this.dimensions.y;
    };
    /**
     * Sets the width of the object.
     *
     * @param {number} width - The width value to set.
     * @return {void} This function does not return anything.
     */
    Screen.prototype.setWidth = function (width) {
        this.dimensions.x = width;
    };
    /**
     * Sets the height of the object.
     *
     * @param {number} height - The height value to set.
     * @return {void} This function does not return a value.
     */
    Screen.prototype.setHeight = function (height) {
        this.dimensions.y = height;
    };
    return Screen;
}());
export { Screen };
