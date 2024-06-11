import Navigo from "navigo";
import { IScreen } from "./screen.interface";
import { IWidget, WUICallback, WUIEvent } from "./widget.interface";
import { Dialog } from "../ui/dialog";
import { Seo } from "../core/seo";
import { ThemeManager } from "../core/themes.core";
import { Vector2D } from "src/types/vector2d.type";

export interface IScreenSize {
    minWidth: number;
    maxWidth: number;
    cb: (app: IApplication) => void;
}

export enum WUIThemes {
    LIGHT = "light",
    DARK = "dark",
}

export interface IApplication {
    seo: Seo;
    screen: IScreen;
    root: IWidget;
    router: Navigo;
    alertDialog: Dialog;
    confirmDialog: Dialog;
    mediaQueries: Map<string, IScreenSize>;

    subscribers: Map<string, WUICallback>;

    theme: ThemeManager;

    attachWidget(guest: IWidget, host: IWidget): void;

    subscribe: (cb: WUICallback) => void;
    unsubscribe: (event: WUIEvent) => void;
    run(eventId: WUIEvent): void;

    addMediaQuery(
        query: string,
        minWidth: number,
        maxWidth: number,
        cb: (app: IApplication) => void
    ): void;

    init(): void;
    setRoot(root: IWidget): void;
    getRoot(): IWidget;

    confirm(msg: string): void;
    alert(msg: string): void;

    showLoading(): void;
    hideLoading(): void;
}
