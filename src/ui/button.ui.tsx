import "./styles/button.css";
import "./styles/stackbutton.css";
import "./styles/vstackbutton.css";
import { Colors } from "./colors.ui";
import { Widget, connectWidgetCallback, getOnlyEventProps } from "./widget.ui";
import { UID } from "../core/uid";
import { WidgetProps, WidgetTypes } from "./widget.types";
import { normalizeWidget } from "./widget.normalize";

export type ButonVariants =
    | "contained"
    | "outlined"
    | "text"
    | "stack-start"
    | "stack-middle"
    | "stack-end"
    | "stack-start-active"
    | "stack-middle-active"
    | "stack-end-active"
    | "stack-vertical-start"
    | "stack-vertical-middle"
    | "stack-vertical-end"
    | "stack-vertical-start-active"
    | "stack-vertical-middle-active"
    | "stack-vertical-end-active";
export type ButonSizes = "small" | "medium" | "large";

export class Button extends Widget {
    variant: ButonVariants;
    color: Colors;
    fullWidth: boolean;
    minWidth: boolean;
    size: ButonSizes;
    href: string;
    text: string;
    requiredWidth: number;

    constructor(id: string, parent: Widget | null = null) {
        super(id, "button", parent);

        this.requiredWidth = -1;

        this.fullWidth = false;
        this.minWidth = false;
        //this.setType(WidgetTypes.CUSTOM);
        this.variant = "text";
        this.color = "primary"; //primary";
        this.size = "medium";
        this.href = "#";
        this.text = "";

        this.configureStyles();

        this.init();
    }

    private configureStyles(): void {
        this.deleteAllClasses();
        this.addClass(`WUIButton-${this.variant}`);
        this.addClass(`WUIButton-${this.variant}-color-${this.color}`);
        if (this.type === WidgetTypes.FILL) {
            this.addClass("WUINonFreePosition");
        } else if (this.type === WidgetTypes.CUSTOM) {
            this.addClass("WUINonFreePosition");
        } else if (this.type === WidgetTypes.FREE) {
            this.addClass("WUIFixPosition");
        }
        this.updateRequiredWidth();
    }

    protected updateRequiredWidth(): void {
        const div = document.createElement("div");
        div.id = this.id + ".requiredWidth";
        div.innerHTML = this.text;
        div.classList.add(`WUIButton-${this.variant}`);
        div.classList.add(`WUIButton-${this.variant}-color-${this.color}`);
        div.style.position = "absolute";
        div.style.overflow = "hidden";
        document.body.appendChild(div);
        this.requiredWidth = div.clientWidth;
        div.parentNode?.removeChild(div);
    }

    public init(): void {
        super.init();
    }

    public setText(text: string): void {
        this.text = text;
        this.body.innerHTML = text;
        this.updateRequiredWidth();
    }

    public setVariant(variant: ButonVariants = "contained"): void {
        this.variant = variant;
        this.configureStyles();
    }

    public setColor(color: Colors = "primary"): void {
        this.color = color;
        this.configureStyles();
    }

    public setFullWidth(fullWidth: boolean = false): void {
        this.fullWidth = fullWidth;
    }

    public setMinWidth(minWidth: boolean = false): void {
        this.minWidth = minWidth;
        if (this.minWidth) {
            if (this.requiredWidth > 0) {
                this.setW(this.requiredWidth);
            }
        }
    }

    public setSize(size: ButonSizes = "medium"): void {
        this.size = size;
    }

    setHref(href: string): void {
        this.href = href;
    }

    getVariant(): ButonVariants {
        return this.variant;
    }

    getColor(): Colors {
        return this.color;
    }

    getSize(): ButonSizes {
        return this.size;
    }

    getHref(): string {
        return this.href;
    }

    getText(): string {
        return this.text;
    }

    public getRequiredWidth(): number {
        return this.requiredWidth;
    }
}

export type wButtonProps = WidgetProps & {
    text: string;
    variant?: ButonVariants | null;
    color?: Colors | null;
    width?: number | null;
    height?: number | null;
};

export const WButton = (props: wButtonProps) => {
    if (!props.id) {
        props.id = "button." + UID();
    }

    connectWidgetCallback(props.id, getOnlyEventProps(props));

    return normalizeWidget(
        <button
            id={props.id}
            w-button
            w-text={props.text}
            w-variant={props.variant}
            w-color={props.color}
            w-width={props.width}
            w-height={props.height}
        />,
        props
    );
};

export function createButton(id: string, content: any, parent: Widget | null = null): Button {
    let newButton = new Button(id, parent);

    const dataText = content.getAttribute("w-text");
    const dataVariant = content.getAttribute("w-variant");
    const dataColor = content.getAttribute("w-color");
    const dataWidth = content.getAttribute("w-width");
    const dataHeight = content.getAttribute("w-height");

    if (dataText) {
        newButton.setText(dataText);
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
