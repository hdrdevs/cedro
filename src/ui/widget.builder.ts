import { UID } from "../core/uid";
import { Widget, WidgetAlignTypes, WidgetTypes } from "./widget.ui";
import { createTextbox } from "./textbox.ui";
import { createButton } from "./button.ui";
import { addNewWidget } from "./widget.collection";
import { createLabel } from "./label.ui";
import { OrientationTypes } from "src/types/orientation.type";
import { createContainer } from "./container.ui";
import { createIconButton } from "./IconButton.ui";
import { createImage } from "./image.ui";
import { createCheckbox } from "./checkbox.ui";
import { createRadioButton } from "./radiobutton";
import { createToolbar } from "./toolbar.ui";
import { createProgressBar } from "./progressbar.ui";
import { createValueBar } from "./valuebar.ui";
import { VPanel, createVPanel } from "./vpanel.ui";
import { HPanel, createHPanel } from "./hpanel.ui";
import { Tabs, createTab } from "./tabs.ui";

export type WidgetEventProps = {
    onClick?: () => {} | void;
    onResize?: () => {} | void;
    onMouseDown?: () => {} | void;
    onMouseUp?: () => {} | void;
    onMouseMove?: () => {} | void;
    onMouseOut?: () => {} | void;
    onMouseLeave?: () => {} | void;
    onWheel?: () => {} | void;
    onDrag?: () => {} | void;
};

export type WidgetProps = {
    id: string;
    type?: WidgetTypes | null;
    padding?: number | null;
    classNames?: string | null;
    fixedSize?: number | null;
    orientation?: OrientationTypes | null;
} & WidgetEventProps;

export function createWidget(
    content: any,
    parent: Widget | null = null,
    freedom: boolean = false
): Widget | null {
    if (!content.tagName) {
        return null;
    }

    let widget: Widget | null = null;
    let widgetProps: WidgetProps = {
        id: content.id ? content.id : UID(),
        type:
            content.getAttribute("w-type") === null
                ? WidgetTypes.FILL
                : parseInt(content.getAttribute("w-type")),
        orientation:
            content.getAttribute("w-orientation") === null
                ? "horizontal"
                : content.getAttribute("w-orientation"),
        padding:
            content.getAttribute("w-padding") === null
                ? 0
                : parseInt(content.getAttribute("w-padding")),
        fixedSize:
            content.getAttribute("w-fixed-size") === null
                ? null
                : parseInt(content.getAttribute("w-fixed-size")),
        classNames:
            content.getAttribute("w-classes") === null ? null : content.getAttribute("w-classes"),
    };

    if (content.getAttribute("w-textbox")) {
        widget = createTextbox(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-button")) {
        widget = createButton(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-icon-button")) {
        widget = createIconButton(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-label")) {
        widget = createLabel(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-image")) {
        widget = createImage(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-checkbox")) {
        widget = createCheckbox(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-radiobutton")) {
        widget = createRadioButton(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-toolbar")) {
        widget = createToolbar(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-progressbar")) {
        widget = createProgressBar(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-valuebar")) {
        widget = createValueBar(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-tab")) {
        widget = createTab(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-vpanel")) {
        widget = createVPanel(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-hpanel")) {
        widget = createHPanel(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-container")) {
        widget = createContainer(content, parent);
    } else {
        widget = new Widget(widgetProps.id, content.tagName, parent);

        if (widgetProps.type === WidgetTypes.FREE) {
            freedom = true;
        }

        content.getAttributeNames().forEach((key: string) => {
            if (widget) widget.getBody().setAttribute(key, content.getAttribute(key));
        });

        (content as HTMLElement).childNodes.forEach((child) => {
            if (child.hasChildNodes() == true) {
                createWidget(child, widget, freedom);
            } else {
                if (widget) widget.getBody().appendChild(child);
            }
        });
    }

    if (widget) {
        if (!freedom && widgetProps.type) {
            widget.setType(widgetProps.type);
        } else {
            widget.setType(WidgetTypes.FREE);
        }

        if (
            widgetProps.orientation &&
            !(widget instanceof VPanel) &&
            !(widget instanceof HPanel) &&
            !(widget instanceof Tabs)
        ) {
            if (widgetProps.orientation === "vertical") {
                widget.setAlign(WidgetAlignTypes.VERTICAL);
            } else {
                widget.setAlign(WidgetAlignTypes.HORIZONTAL);
            }
        }
        if (widgetProps.padding) widget.setPadding(widgetProps.padding);
        if (widgetProps.fixedSize) widget.setFixedSize(widgetProps.fixedSize);

        if (widgetProps.classNames) {
            const clases = widgetProps.classNames.split(" ");
            for (const clase of clases) {
                widget.addClass(clase);
            }
        }

        addNewWidget(widgetProps.id, widget);

        return widget;
    }

    return null;
}
