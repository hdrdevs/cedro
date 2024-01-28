import { Colors } from "./colors.ui";
import { Widget } from "./widget.ui";

export type LabelVariants =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span";

export class Label extends Widget {
    variant: LabelVariants;
    color: Colors;
    text: string;

    constructor(
        id: string,
        variant: LabelVariants = "span",
        parent: Widget | null = null
    ) {
        super(id, variant, parent);

        this.variant = variant;
        this.color = "primary";
        this.text = "";

        this.init();
    }

    public init(): void {
        super.init();
    }

    setText(text: string): void {
        this.text = text;
        this.body.innerHTML = text;
    }

    setVariant(variant: LabelVariants = "span"): void {
        this.variant = variant;
    }

    setColor(color: Colors = "primary"): void {
        this.color = color;
    }

    getVariant(): LabelVariants {
        return this.variant;
    }

    getColor(): Colors {
        return this.color;
    }

    getText(): string {
        return this.text;
    }
}
