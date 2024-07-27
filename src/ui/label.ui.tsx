import "./styles/label.css";
import { normalizeWidget, WidgetProps } from "./widget.builder";
import { Colors } from "./colors.ui";
import { Widget, connectWidgetCallback, getOnlyEventProps } from "./widget.ui";
import { UID } from "../core/uid";

export type LabelVariants = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

export class Label extends Widget {
    variant: LabelVariants;
    color: Colors;
    text: string;

    isHCentered: boolean;
    isVCentered: boolean;

    constructor(id: string, variant: LabelVariants = "span", parent: Widget | null = null) {
        super(id, variant, parent);

        this.isHCentered = false;
        this.isVCentered = false;

        this.variant = variant;
        this.color = "primary";
        this.text = "";

        this.getBody().style.margin = "0px";

        this.setVariant(this.variant);

        this.init();
    }

    public init(): void {
        super.init();
    }

    public setHCentered(isHCentered: boolean = true): void {
        this.isHCentered = isHCentered;
    }

    public setVCentered(isVCentered: boolean = true): void {
        this.isVCentered = isVCentered;
    }

    public render(): void {
        super.render();

        if (this.isHCentered) {
            this.centerH();
        }
        if (this.isVCentered) {
            this.centerV();
        }
    }

    private centerV(): void {
        this.getBody().style.lineHeight = this.getH() + "px";
    }

    private centerH(): void {
        this.getBody().style.textAlign = "center";
    }

    public setText(text: string): void {
        this.text = text;
        this.body.innerHTML = text;
    }

    public setVariant(variant: LabelVariants = "span"): void {
        if (this.variant !== variant) {
            this.deleteClass("WUILabel-" + this.variant);
        }

        this.variant = variant;
        this.addClass("WUILabel-" + this.variant);
    }

    public setColor(color: Colors = "primary"): void {
        this.color = color;
    }

    public getVariant(): LabelVariants {
        return this.variant;
    }

    public getColor(): Colors {
        return this.color;
    }

    public getText(): string {
        return this.text;
    }
}

export type wLabelProps = WidgetProps & {
    variant?: string | null;
    color?: Colors | null;
    text?: string | null;
    centerX?: boolean | null;
    centerY?: boolean | null;
};

export const WLabel = (props: wLabelProps) => {
    if (!props.id) {
        props.id = "Label." + UID();
    }

    connectWidgetCallback(props.id, getOnlyEventProps(props));

    return normalizeWidget(
        <div
            id={props.id}
            w-label
            w-text={props.text}
            w-variant={props.variant}
            w-color={props.color}
            w-centerX={props.centerX}
            w-centerY={props.centerY}
        ></div>,
        props
    );
};

export function createLabel(id: string, content: any, parent: Widget | null = null): Label {
    const dataText = content.getAttribute("w-text");
    const dataVariant = content.getAttribute("w-variant");
    const dataColor = content.getAttribute("w-color");
    let tag = dataVariant ? dataVariant : "span";

    let newLabel = new Label(id, tag, parent);

    if (dataText) {
        newLabel.setText(dataText);
    }

    if (dataVariant) {
        newLabel.setVariant(dataVariant);
    }

    if (dataColor) {
        newLabel.setColor(dataColor);
    }

    if (content.getAttribute("w-centerX")) {
        newLabel.setHCentered(true);
    }

    if (content.getAttribute("w-centerY")) {
        newLabel.setVCentered(true);
    }

    return newLabel;
}
