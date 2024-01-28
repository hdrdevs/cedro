import "@webui/ui/styles/main.css";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import "material-icons/iconfont/material-icons.css";
import { Widget, WidgetAlignTypes, WidgetTypes } from "../ui/widget.ui";
import { Screen } from "./screeen.core";
import Navigo from "navigo";
import { Dialog } from "../ui/dialog";
import { Label } from "../ui/label.ui";
import { Seo } from "./seo";
import { DarkTheme, LightTheme, ThemeManager } from "./themes.core";
var WebUIApplication = /** @class */ (function () {
    function WebUIApplication(title) {
        var _this = this;
        this.seo = new Seo(title);
        this.root = new Widget("root");
        this.root.setType(WidgetTypes.FILL);
        this.screen = new Screen();
        this.router = new Navigo("/");
        this.mediaQueries = new Map();
        this.theme = new ThemeManager();
        this.theme.add(LightTheme);
        this.theme.add(DarkTheme);
        this.screen.onResize(function () {
            _this.getRoot().resize();
        });
        window.addEventListener("load", function () {
            _this.screen.updateSize();
        });
        this.alertDialog = new Dialog("Dialog.alert", null);
        this.confirmDialog = new Dialog("Dialog.confirm", null);
        this.theme.load();
    }
    WebUIApplication.prototype.alert = function (msg, onOk, onCancell) {
        if (onOk === void 0) { onOk = function () { }; }
        if (onCancell === void 0) { onCancell = function () { }; }
        var mesageLabel = new Label("alert.label", "span");
        mesageLabel.setType(WidgetTypes.FILL);
        mesageLabel.setAlign(WidgetAlignTypes.VERTICAL);
        mesageLabel.setText(msg);
        this.alertDialog.setOkCallback({ event: "click", then: onOk });
        this.alertDialog.setCancellCallback({
            event: "click",
            then: onCancell,
        });
        this.alertDialog.getContentCntainer().attachWidget(mesageLabel);
        this.alertDialog.show();
    };
    WebUIApplication.prototype.confirm = function (msg, onOk, onCancell) {
        if (onOk === void 0) { onOk = function () { }; }
        if (onCancell === void 0) { onCancell = function () { }; }
        var mesageLabel = new Label("alert.label", "span");
        mesageLabel.setType(WidgetTypes.FILL);
        mesageLabel.setAlign(WidgetAlignTypes.VERTICAL);
        mesageLabel.setText(msg);
        this.confirmDialog.setOkCallback({ event: "click", then: onOk });
        this.confirmDialog.setCancellCallback({
            event: "click",
            then: onCancell,
        });
        this.confirmDialog.getContentCntainer().attachWidget(mesageLabel);
        this.confirmDialog.show();
    };
    WebUIApplication.prototype.attachWidget = function (guest, host) {
        var _a;
        if (!host) {
            console.log("guest:", guest);
        }
        for (var _i = 0, _b = host.getBody().childNodes; _i < _b.length; _i++) {
            var child = _b[_i];
            (_a = child.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(child);
        }
        for (var _c = 0, _d = host.childs; _c < _d.length; _c++) {
            var child = _d[_c];
            child.free();
        }
        host.removeAllChilds();
        host.addChild(guest);
        guest.setParent(host);
        guest.render();
        this.root.resize();
        this.root.render();
    };
    WebUIApplication.prototype.addMediaQuery = function (query, minWidth, maxWidth, cb) {
        this.mediaQueries.set(query, { minWidth: minWidth, maxWidth: maxWidth, cb: cb });
    };
    /**
     * Initializes the application.
     *
     * @return {void} This function does not return a value.
     */
    WebUIApplication.prototype.init = function () {
        var _this = this;
        this.root.subscribe({
            event: "resize",
            then: function () {
                var app = _this;
                for (var _i = 0, _a = app.mediaQueries.entries(); _i < _a.length; _i++) {
                    var query = _a[_i];
                    var _b = query[1], minWidth = _b.minWidth, maxWidth = _b.maxWidth, cb = _b.cb;
                    if (minWidth <= app.screen.dimensions.x &&
                        maxWidth > app.screen.dimensions.x) {
                        cb(_this);
                        //break; quite el break para dar soporte a mas de un media quiery del mismo tipo.
                    }
                }
            },
        });
        this.root.render();
    };
    /**
     * Retrieves the root widget of the application.
     *
     * @return {Widget} The root widget of the application.
     */
    WebUIApplication.prototype.getRoot = function () {
        return this.root;
    };
    /**
     * Sets the root widget of the object.
     *
     * @param {Widget} root - The root widget to set.
     * @return {void}
     */
    WebUIApplication.prototype.setRoot = function (root) {
        this.root = root;
    };
    return WebUIApplication;
}());
export default WebUIApplication;
