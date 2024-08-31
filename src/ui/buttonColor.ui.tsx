import "./styles/buttoncolor.css";
import { Button, wButtonProps } from "./button.ui";
import { connectWidgetCallback, getOnlyEventProps, Widget } from "./widget.ui";
import { UID } from "../core/uid";
import { normalizeWidget } from "./widget.normalize";

export class ButtonColor extends Button {
    inputColor: Widget;
    constructor(id: string, parent: Widget | null = null) {
        super(id, parent);

        this.inputColor = new Widget(id + ".inputColor", "input", this);
        this.inputColor.getBody().setAttribute("type", "color");
        this.inputColor.addClass("WUIButtonColorInput");
    }

    public setValue(value: string): void {
        this.inputColor.getBody().setAttribute("value", value);
    }

    public getValue(): string {
        const value = this.inputColor.getBody().getAttribute("value");

        return value ? value : "";
    }
}

export type wButtonColorProps = Omit<wButtonProps, "text"> & {
    value: string;
};

export const WButtonColor = (props: wButtonColorProps) => {
    if (!props.id) {
        props.id = "ButtonColor." + UID();
    }

    connectWidgetCallback(props.id, getOnlyEventProps(props));

    return normalizeWidget(
        <button
            id={props.id}
            w-button-color
            w-value={props.value}
            w-variant={props.variant}
            w-color={props.color}
            w-width={props.width}
            w-height={props.height}
        />,
        props
    );
};

export function createButtonColor(
    id: string,
    content: any,
    parent: Widget | null = null
): ButtonColor {
    let newButton = new ButtonColor(id, parent);

    const dataValue = content.getAttribute("w-value");
    const dataVariant = content.getAttribute("w-variant");
    const dataColor = content.getAttribute("w-color");
    const dataWidth = content.getAttribute("w-width");
    const dataHeight = content.getAttribute("w-height");

    if (dataValue) {
        newButton.setValue(dataValue);
    }

    if (dataVariant) {
        newButton.setVariant(dataVariant);
    }

    if (dataColor) {
        newButton.setColor(dataColor);
    }

    if (dataWidth) {
        newButton.setInitialW(dataWidth);
    }

    if (dataHeight) {
        newButton.setInitialH(dataHeight);
    }

    return newButton;
}
