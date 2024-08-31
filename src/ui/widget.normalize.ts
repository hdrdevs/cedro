import { WidgetProps } from "./widget.types";

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
