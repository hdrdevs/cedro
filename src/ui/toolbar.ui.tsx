import "./styles/toolbar.css";
import { Widget } from "./widget.ui";
import { OrientationTypes } from "../types/orientation.type";
import { createWidget } from "./widget.builder";
import { UID } from "../core/uid";
import { WidgetProps } from "./widget.types";
import { normalizeWidget } from "./widget.normalize";

import { Toolbar, ToolbarVariants } from "./toolbar.class";

export { Toolbar, type ToolbarVariants };

export type ToolbarProps = WidgetProps & {
    variant?: ToolbarVariants;
    children: any;
};

export const WToolbar = (props: ToolbarProps) => {
    if (!props.id) {
        props.id = "Toolbar." + UID();
    }

    return normalizeWidget(
        <div w-toolbar id={props.id} w-variant={props.variant}>
            {props.children}
        </div>,
        props
    );
};

export function createToolbar(id: string, content: any, parent: Widget | null = null): Toolbar {
    const dataOrientation = content.getAttribute("w-orientation");
    const dataVariant = content.getAttribute("w-variant");

    let orientation: OrientationTypes = dataOrientation ? dataOrientation : "horizontal";

    let newToolbar = new Toolbar(id, parent, orientation);

    if (dataVariant) {
        newToolbar.setVariant(dataVariant);
    }

    content.childNodes.forEach((item: HTMLElement) => {
        const widget = createWidget(item);

        if (widget !== null) {
            newToolbar.addItem(widget.id, widget);
        }
    });

    return newToolbar;
}
