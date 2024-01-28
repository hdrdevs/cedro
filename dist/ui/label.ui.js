var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Widget } from "./widget.ui";
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label(id, variant, parent) {
        if (variant === void 0) { variant = "span"; }
        if (parent === void 0) { parent = null; }
        var _this = _super.call(this, id, variant, parent) || this;
        _this.variant = variant;
        _this.color = "primary";
        _this.text = "";
        _this.init();
        return _this;
    }
    Label.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    Label.prototype.setText = function (text) {
        this.text = text;
        this.body.innerHTML = text;
    };
    Label.prototype.setVariant = function (variant) {
        if (variant === void 0) { variant = "span"; }
        this.variant = variant;
    };
    Label.prototype.setColor = function (color) {
        if (color === void 0) { color = "primary"; }
        this.color = color;
    };
    Label.prototype.getVariant = function () {
        return this.variant;
    };
    Label.prototype.getColor = function () {
        return this.color;
    };
    Label.prototype.getText = function () {
        return this.text;
    };
    return Label;
}(Widget));
export { Label };
