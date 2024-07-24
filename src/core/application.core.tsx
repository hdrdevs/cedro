import "../ui/styles/main.css";
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
import { IWidget, WUICallback, WUIEvent } from "../interfaces/widget.interface";
import Navigo from "navigo";
import { Dialog } from "../ui/dialog";
import { Label } from "../ui/label.ui";
import { Seo } from "./seo";
import { DarkTheme, LightTheme, ThemeManager } from "./themes.core";
import { Loading } from "../ui/loading.ui";
import { OrientationTypes } from "../types/orientation.type";

class WApplication implements IApplication {
    seo: Seo;

    subscribers: Map<string, WUICallback>;

    screen: Screen;
    root: Widget;
    router: Navigo;
    routerHostId: string;

    alertDialog: Dialog;
    confirmDialog: Dialog;
    loading: Loading;

    mediaQueries: Map<string, IScreenSize>;

    theme: ThemeManager;

    constructor(title: string) {
        this.seo = new Seo(title);

        this.subscribers = new Map<string, WUICallback>();

        this.root = new Widget("root");

        this.root.setType(WidgetTypes.FILL);
        this.screen = new Screen();
        this.router = new Navigo("/");
        this.routerHostId = this.getRoot().id;

        this.mediaQueries = new Map<string, IScreenSize>();

        this.theme = new ThemeManager();
        this.theme.add(LightTheme);
        this.theme.add(DarkTheme);

        this.screen.onResize(() => {
            this.getRoot().resize();
        });

        window.addEventListener("load", () => {
            this.screen.updateSize();
            this.getRoot().resize();
            this.run("load");
        });

        this.alertDialog = new Dialog("Dialog.alert", null);
        this.confirmDialog = new Dialog("Dialog.confirm", null);

        this.loading = new Loading("loading", null);

        this.theme.load();
    }

    public setRouterHostId(id: string | null): void {
        if (!id) {
            this.routerHostId = this.getRoot().id;
            return;
        }
        this.routerHostId = id;
    }

    public getRouterHostId(): string {
        return this.routerHostId;
    }

    public run(eventId: WUIEvent): void {
        this.subscribers.forEach((callback) => {
            if (callback.event == eventId) {
                callback.then(new Event(eventId), null);
            }
        });
    }

    public subscribe(cb: WUICallback) {
        const randomId =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);

        this.subscribers.set(`${randomId}.${cb.event}`, cb);
    }

    public unsubscribe(event: WUIEvent) {
        this.subscribers.delete(`${event}`);
    }

    public alert(msg: string, onOk: () => void = () => {}, onCancell: () => void = () => {}): void {
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

    public confirm(
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

    public attachWidget(guest: IWidget, host: IWidget): void {
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

    public addMediaQuery(
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
    public init(): void {
        this.root.subscribe({
            event: "resize",
            then: () => {
                const app = this;

                for (let query of app.mediaQueries.entries()) {
                    const { minWidth, maxWidth, cb } = query[1];
                    if (minWidth <= app.screen.dimensions.x && maxWidth > app.screen.dimensions.x) {
                        cb(this as IApplication);
                        //break; quite el break para dar soporte a mas de un media quiery del mismo tipo.
                    }
                }
            },
        });

        this.root.render();
        this.seo.setTitle(this.seo.getTitle());
    }

    /**
     * Retrieves the root widget of the application.
     *
     * @return {Widget} The root widget of the application.
     */
    public getRoot(): Widget {
        return this.root;
    }

    /**
     * Sets the root widget of the object.
     *
     * @param {Widget} root - The root widget to set.
     * @return {void}
     */
    public setRoot(root: Widget): void {
        this.root = root;
    }

    public showLoading(): void {
        this.loading.setVisible(true);
        this.loading.raisteTop();
    }

    public hideLoading(): void {
        this.loading.setVisible(false);
    }

    public goTo(path: string): void {
        this.router.navigate(path);
    }
}

export type ApplicationProps = {
    title: string;
    padding?: number | null;
    orientation?: OrientationTypes | null;
    children: any;
};

export const Application = (props: ApplicationProps) => {
    return (
        <div title={props.title} w-padding={props.padding} w-orientation={props.orientation}>
            {props.children}
        </div>
    );
};

export type WidgetsProps = {
    children: any;
};

export const Widgets = (props: WidgetsProps) => {
    return <div w-widget-collection>{props.children}</div>;
};

export type RoutesProps = {
    hostId: string;
    children: any;
};

export const Routes = (props: RoutesProps) => {
    return (
        <div w-routes w-host-id={props.hostId}>
            {props.children}
        </div>
    );
};

export type RouteProps = {
    src: string;
};

export const Route = (props: RouteProps) => {
    return <a w-route-path href={props.src}></a>;
};

export default WApplication;
