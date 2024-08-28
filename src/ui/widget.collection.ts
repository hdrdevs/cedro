import WApplication from "../core/application.core";
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
    var widgetCustomConnections: Map<string, WUICallback>;
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

    if (!window.widgetCustomConnections) {
        window.widgetCustomConnections = new Map<string, WUICallback>();
    }
};

export const addNewWidget = (id: string, widget: IWidget) => {
    initWidgetCollection();
    if (!w.get(id)) w.set(id, widget);
    setTimeout(() => {
        run("widget-added-" + id);
        runCustom("widget-custom-added-" + id);
    });
};

export const connectWidget = (id: string, callback: WUICallback) => {
    initWidgetConnections();
    widgetConnections.set(id, callback);
};

export const connectCustomWidget = (id: string, callback: WUICallback) => {
    initWidgetConnections();
    widgetCustomConnections.set(id, callback);
};

export const run = (eventId: string) => {
    for (const [key, value] of widgetConnections.entries()) {
        if (key == eventId) {
            value.then(new Event(eventId), null);
        }
    }
    widgetConnections.delete(eventId);
};

export const runCustom = (eventId: string) => {
    for (const [key, value] of widgetCustomConnections.entries()) {
        if (key == eventId) {
            value.then(new Event(eventId), null);
        }
    }
    widgetCustomConnections.delete(eventId);
};
