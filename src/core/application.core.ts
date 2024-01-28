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
import { IApplication, IScreenSize } from "../interfaces/application.interface";
import { IWidget } from "../interfaces/widget.interface";
import Navigo from "navigo";
import { Dialog } from "../ui/dialog";
import { Label } from "../ui/label.ui";
import { Seo } from "./seo";
import { DarkTheme, LightTheme, ThemeManager } from "./themes.core";

class WebUIApplication implements IApplication {
    seo: Seo;

    screen: Screen;
    root: Widget;
    router: Navigo;

    alertDialog: Dialog;
    confirmDialog: Dialog;

    mediaQueries: Map<string, IScreenSize>;

    theme: ThemeManager;

    constructor(title: string) {
        this.seo = new Seo(title);

        this.root = new Widget("root");
        this.root.setType(WidgetTypes.FILL);
        this.screen = new Screen();
        this.router = new Navigo("/");

        this.mediaQueries = new Map<string, IScreenSize>();

        this.theme = new ThemeManager();
        this.theme.add(LightTheme);
        this.theme.add(DarkTheme);

        this.screen.onResize(() => {
            this.getRoot().resize();
        });

        window.addEventListener("load", () => {
            this.screen.updateSize();
        });

        this.alertDialog = new Dialog("Dialog.alert", null);
        this.confirmDialog = new Dialog("Dialog.confirm", null);

        this.theme.load();
    }

    alert(
        msg: string,
        onOk: () => void = () => {},
        onCancell: () => void = () => {}
    ): void {
        const mesageLabel = new Label("alert.label", "span");

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
    }

    confirm(
        msg: string,
        onOk: () => void = () => {},
        onCancell: () => void = () => {}
    ): void {
        const mesageLabel = new Label("alert.label", "span");

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
    }

    attachWidget(guest: IWidget, host: IWidget): void {
        if (!host) {
            console.log("guest:", guest);
        }
        for (const child of host.getBody().childNodes) {
            child.parentNode?.removeChild(child);
        }

        for (const child of host.childs) {
            child.free();
        }

        host.removeAllChilds();

        host.addChild(guest);
        guest.setParent(host);
        guest.render();
        this.root.resize();
        this.root.render();
    }

    addMediaQuery(
        query: string,
        minWidth: number,
        maxWidth: number,
        cb: (app: IApplication) => void
    ): void {
        this.mediaQueries.set(query, { minWidth, maxWidth, cb });
    }

    /**
     * Initializes the application.
     *
     * @return {void} This function does not return a value.
     */
    init(): void {
        this.root.subscribe({
            event: "resize",
            then: () => {
                const app = this;

                for (let query of app.mediaQueries.entries()) {
                    const { minWidth, maxWidth, cb } = query[1];
                    if (
                        minWidth <= app.screen.dimensions.x &&
                        maxWidth > app.screen.dimensions.x
                    ) {
                        cb(this as IApplication);
                        //break; quite el break para dar soporte a mas de un media quiery del mismo tipo.
                    }
                }
            },
        });

        this.root.render();
    }

    /**
     * Retrieves the root widget of the application.
     *
     * @return {Widget} The root widget of the application.
     */
    getRoot(): Widget {
        return this.root;
    }

    /**
     * Sets the root widget of the object.
     *
     * @param {Widget} root - The root widget to set.
     * @return {void}
     */
    setRoot(root: Widget): void {
        this.root = root;
    }
}

export default WebUIApplication;
