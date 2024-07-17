import "./styles/button.css";
import "./styles/stackbutton.css";
import "./styles/vstackbutton.css";
import { Colors } from "./colors.ui";
import { Widget, connectWidgetCallback, getOnlyEventProps } from "./widget.ui";
import { normalizeWidget, WidgetProps } from "./widget.builder";

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
    size: ButonSizes;
    href: string;
    text: string;

    constructor(id: string, parent: Widget | null = null) {
        super(id, "button", parent);

        this.fullWidth = false;
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
    }

    public init(): void {
        super.init();
    }

    setText(text: string): void {
        this.text = text;
        this.body.innerHTML = text;
    }

    setVariant(variant: ButonVariants = "contained"): void {
        this.variant = variant;
        this.configureStyles();
    }

    setColor(color: Colors = "primary"): void {
        this.color = color;
        this.configureStyles();
    }

    setFullWidth(fullWidth: boolean = false): void {
        this.fullWidth = fullWidth;
    }

    setSize(size: ButonSizes = "medium"): void {
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
}

export type wButtonProps = WidgetProps & {
    text: string;
    variant?: ButonVariants | null;
    color?: Colors | null;
    width?: number | null;
    height?: number | null;
};

export const WButton = (props: wButtonProps) => {
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
