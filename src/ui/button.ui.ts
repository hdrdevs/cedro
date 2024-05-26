import "./styles/button.css";
import "./styles/stackbutton.css";
import "./styles/vstackbutton.css";
import { Colors } from "./colors.ui";
import { Widget } from "./widget.ui";

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
