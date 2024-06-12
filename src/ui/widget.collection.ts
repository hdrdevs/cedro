import WApplication from "src/core/application.core";
import { IWidget, WUICallback } from "../interfaces/widget.interface";

declare global {
    interface Window {
        app: WApplication | undefined;
        w: Map<string, IWidget>;
        widgetConnections: Map<string, WUICallback>;
    }

    var w: Map<string, IWidget>;
    var app: WApplication | undefined;
    var widgetConnections: Map<string, WUICallback>;
}

export const initWidgetCollection = () => {
    if (!window.w) {
        window.w = new Map<string, IWidget>();
        w = window.w;
    }

    initWidgetConnections();
};

export const initWidgetConnections = () => {
    if (!window.widgetConnections) {
        window.widgetConnections = new Map<string, WUICallback>();
    }
};

export const addNewWidget = (id: string, widget: IWidget) => {
    initWidgetCollection();
    w.set(id, widget);
    run("widget-added-" + id);
};

export const connectWidget = (id: string, callback: WUICallback) => {
    initWidgetConnections();
    widgetConnections.set(id, callback);
};

export const run = (eventId: string) => {
    for (const [key, value] of widgetConnections.entries()) {
        if (key == eventId) {
            value.then(new Event(eventId), null);
        }
    }
    widgetConnections.delete(eventId);
};
