import { UID } from "../core/uid";
import { Widget, WidgetAlignTypes, WidgetTypes } from "./widget.ui";
import { addNewWidget } from "./widget.collection";
import { createTextbox } from "./Textbox.ui";
import { createButton } from "./button.ui";
import { createLabel } from "./label.ui";
import { OrientationTypes } from "../types/orientation.type";
import { createContainer } from "./container.ui";
import { createIconButton } from "./IconButton.ui";
import { createImage } from "./image.ui";
import { createCheckbox } from "./checkbox.ui";
import { createRadioButton } from "./radiobutton.ui";
import { createToolbar } from "./toolbar.ui";
import { createProgressBar } from "./progressbar.ui";
import { createValueBar } from "./valuebar.ui";
import { VPanel, createVPanel } from "./vpanel.ui";
import { HPanel, createHPanel } from "./hpanel.ui";
import { Tabs, createTab } from "./tabs.ui";
import { createSwitch } from "./switch.ui";
import { Accordion, createAccordion } from "./accordion.ui";
import { createButtonStack } from "./buttonstack.ui";
import { createButtonColor } from "./buttonColor.ui";
import { createButtonMenu } from "./buttonmenu.ui";
import { createIconButtonMenu } from "./iconButtonMenu.ui";
import { createIcon } from "./Icon.ui";
import { createTextarea } from "./textarea.ui";
import { createSelect } from "./select.ui";
import { createDialog, Dialog } from "./dialog";
import { createDataGrid, DataGrid } from "./datagrid.ui";

export type WidgetEventProps = {
    onClick?: (args: any) => {} | void;
    onResize?: (args: any) => {} | void;
    onMouseDown?: (args: any) => {} | void;
    onMouseUp?: (args: any) => {} | void;
    onMouseMove?: (args: any) => {} | void;
    onMouseOut?: (args: any) => {} | void;
    onMouseLeave?: (args: any) => {} | void;
    onWheel?: (args: any) => {} | void;
    onDrag?: (args: any) => {} | void;
    onRender?: (args: any) => {} | void;
};

export type WidgetProps = {
    id?: string | null;
    type?: WidgetTypes | null;
    padding?: number | null;
    classNames?: string | null;
    fixedSize?: number | null;
    orientation?: OrientationTypes | null;
    hidden?: boolean | null;
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
        hidden: content.getAttribute("w-hidden") !== null ? true : false,
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

    if (!widgetProps.id) {
        widgetProps.id = UID();
    }

    if (content.getAttribute("w-textbox")) {
        widget = createTextbox(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-textarea")) {
        widget = createTextarea(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-button")) {
        widget = createButton(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-icon-button")) {
        widget = createIconButton(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-button-stack")) {
        widget = createButtonStack(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-button-color")) {
        widget = createButtonColor(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-button-menu")) {
        widget = createButtonMenu(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-icon-button-menu")) {
        widget = createIconButtonMenu(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-label")) {
        widget = createLabel(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-image")) {
        widget = createImage(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-icon")) {
        widget = createIcon(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-checkbox")) {
        widget = createCheckbox(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-radiobutton")) {
        widget = createRadioButton(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-switch")) {
        widget = createSwitch(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-toolbar")) {
        widget = createToolbar(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-progressbar")) {
        widget = createProgressBar(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-valuebar")) {
        widget = createValueBar(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-tab")) {
        widget = createTab(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-accordion")) {
        widget = createAccordion(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-vpanel")) {
        widget = createVPanel(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-hpanel")) {
        widget = createHPanel(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-container")) {
        widget = createContainer(content, parent);
    } else if (content.getAttribute("w-select")) {
        widget = createSelect(widgetProps.id, content, parent);
    } else if (content.getAttribute("w-dialog")) {
        widget = createDialog(widgetProps.id, content, null);
    } else if (content.getAttribute("w-data-grid")) {
        widget = createDataGrid(widgetProps.id, content, parent);
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

        if (widget instanceof Dialog) {
            widget.setType(WidgetTypes.CUSTOM);
        }

        if (
            widgetProps.orientation &&
            !(widget instanceof VPanel) &&
            !(widget instanceof HPanel) &&
            !(widget instanceof Dialog) &&
            !(widget instanceof DataGrid) &&
            !(widget instanceof Tabs)
        ) {
            if (widgetProps.orientation === "vertical") {
                widget.setAlign(WidgetAlignTypes.VERTICAL);
            } else {
                widget.setAlign(WidgetAlignTypes.HORIZONTAL);
            }
        }

        if (widget instanceof Accordion) {
            widget.setAlign(WidgetAlignTypes.VERTICAL);
        }

        if (widget instanceof DataGrid) {
            widget.setAlign(WidgetAlignTypes.VERTICAL);
        }

        if (widgetProps.padding) widget.setPadding(widgetProps.padding);
        if (widgetProps.fixedSize) widget.setFixedSize(widgetProps.fixedSize);

        if (widgetProps.classNames) {
            const clases = widgetProps.classNames.split(" ");
            for (const clase of clases) {
                widget.addClass(clase);
            }
        }

        if (widgetProps.hidden) {
            widget.setVisible(false);
        }

        addNewWidget(widgetProps.id, widget);

        return widget;
    }

    return null;
}

export function normalizeWidget(widget: any, props: WidgetProps) {
    if (props.fixedSize !== undefined) {
        widget.setAttribute("w-fixed-size", props.fixedSize);
    }

    if (props.padding !== undefined) {
        widget.setAttribute("w-padding", props.padding);
    }

    if (props.type !== undefined) {
        widget.setAttribute("w-type", props.type);
    }

    if (props.hidden !== undefined) {
        widget.setAttribute("w-hidden", props.hidden);
    }

    if (props.classNames !== undefined) {
        widget.setAttribute("w-classes", props.classNames);
    }

    if (props.orientation !== undefined) {
        widget.setAttribute("w-orientation", props.orientation);
    }

    return widget;
}
