//import { createWidget } from "src/ui/builder/widget.builder";
import { WidgetAlignTypes } from "../ui";
import { createWidget } from "../ui/builder/widget.builder";
import Application, { ApplicationProps } from "./application.core";

function getApplicationProps(content: any): ApplicationProps {
    let props: ApplicationProps = {
        title: content.title,
        padding: 0,
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

    content.childNodes.forEach((item: HTMLElement) => {
        if (item.getAttribute("w-widget-collection")) {
            item.childNodes.forEach((ietmWidget: any) => {
                const appWidgets = createWidget(ietmWidget);

                if (appWidgets !== null) {
                    newApp.getRoot().addChild(appWidgets);
                }
            });
        } else if (item.getAttribute("w-routes")) {
            console.log("routes:", item);
        }
    });

    return newApp;
}
