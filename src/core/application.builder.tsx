import { Widget, WidgetAlignTypes } from "../ui";
import { createWidget } from "../ui/widget.builder";
import Application, { ApplicationProps } from "./application.core";
import { decode } from "./html.entities";
import { getAdaptedUrl } from "./path.import.dev";

function getApplicationProps(content: any): ApplicationProps {
    let props: ApplicationProps = {
        title: content.title,
        padding: 0,
        theme: null,
        orientation: null,
        children: null,
    };

    if (content.getAttribute("w-title") !== null) {
        props.title = content.getAttribute("w-title");
    }

    if (content.getAttribute("w-padding") !== null) {
        props.padding = parseInt(content.getAttribute("w-padding"));
    }

    if (content.getAttribute("w-orientation") !== null) {
        props.orientation = content.getAttribute("w-orientation");
    }

    if (content.getAttribute("w-theme") !== null) {
        props.theme = content.getAttribute("w-theme");
    }

    return props;
}

export function createApplication(content: any): Application {
    const appProps = getApplicationProps(content);
    const newApp = new Application(appProps.title);

    if (appProps.padding) {
        newApp.getRoot().setPadding(appProps.padding);
    }

    if (appProps.orientation) {
        if (appProps.orientation === "horizontal") {
            newApp.getRoot().setAlign(WidgetAlignTypes.HORIZONTAL);
        } else {
            newApp.getRoot().setAlign(WidgetAlignTypes.VERTICAL);
        }
    }

    if (appProps.theme) {
        newApp.theme.setTheme(appProps.theme);
    }

    content.childNodes.forEach((item: HTMLElement) => {
        if (item.getAttribute("w-widget-collection")) {
            item.childNodes.forEach((ietmWidget: any) => {
                const appWidgets = createWidget(ietmWidget);

                if (appWidgets !== null) {
                    newApp.getRoot().addChild(appWidgets);
                }
            });
        } else if (item.getAttribute("w-routes")) {
            newApp.setRouterHostId(item.getAttribute("w-host-id"));
            item.childNodes.forEach((ietmRoute: any) => {
                if (ietmRoute.getAttribute("w-route-path") && ietmRoute.getAttribute("href")) {
                    newApp.router.on(decode(ietmRoute.getAttribute("href")), () => {
                        const url = decode(ietmRoute.getAttribute("href"));
                        const isProduction = process.env.NODE_ENV === "production";
                        const path = getAdaptedUrl(url);
                        import(/*@vite-ignore*/ path).then((module) => {
                            newApp.clearLoadedModule();
                            newApp.setLoadedModule(module.default);
                            const host = w.get(newApp.getRouterHostId());
                            if (host) {
                                newApp.attachWidget(newApp.getLoadedModule() as Widget, host);
                            }
                            newApp.hideLoading();
                        });

                        const loadCss = async () => {
                            try {
                                const timestamp = new Date().getTime();
                                //const cssName = "../../assets" + url + "/style.css?ts=" + timestamp;
                                const cssName = "/assets" + url + "/style.css?ts=" + timestamp;

                                // Crear un elemento <link> para cargar el CSS
                                const link = document.createElement("link");
                                link.rel = "stylesheet";
                                link.href = cssName;
                                document.head.appendChild(link);
                            } catch (error) {
                                console.log(error);
                            }
                        };

                        if (isProduction) loadCss();
                    });
                }
            });
            newApp.router.resolve();
        }
    });

    appConnections.forEach((cb) => {
        newApp.subscribe(cb);
    });

    appConnections = [];

    return newApp;
}
