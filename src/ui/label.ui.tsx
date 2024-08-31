import "./styles/label.css";
import { Colors } from "./colors.ui";
import { Widget, connectWidgetCallback, getOnlyEventProps } from "./widget.ui";
import { UID } from "../core/uid";
import { WidgetProps } from "./widget.types";
import { normalizeWidget } from "./widget.normalize";

export type LabelVariants = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

export class Label extends Widget {
    variant: LabelVariants;
    color: Colors;
    text: string;

    requiredWidth: number;

    isHCentered: boolean;
    isVCentered: boolean;

    constructor(id: string, variant: LabelVariants = "span", parent: Widget | null = null) {
        super(id, variant, parent);

        this.requiredWidth = -1;

        this.isHCentered = false;
        this.isVCentered = false;

        this.variant = variant;
        this.color = "primary";
        this.text = "";

        this.setColor(this.color);

        //this.getBody().style.margin = "0px";

        this.setVariant(this.variant);

        this.init();
    }

    public init(): void {
        super.init();
    }

    private updateRequiredWidth(): void {
        const div = document.createElement("div");
        div.id = this.id + ".requiredWidth";
        div.innerHTML = this.text;
        div.classList.add("WUILabel" + this.variant);
        div.classList.add("WUILabel-" + this.color);
        div.style.position = "absolute";
        div.style.overflow = "hidden";
        document.body.appendChild(div);
        this.requiredWidth = div.clientWidth;
        div.parentNode?.removeChild(div);
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
        this.updateRequiredWidth();
    }

    public setVariant(variant: LabelVariants = "span"): void {
        if (this.variant !== variant) {
            this.deleteClass("WUILabel" + this.variant);
        }

        this.variant = variant;
        this.addClass("WUILabel-" + this.variant);
        this.updateRequiredWidth();
    }

    public setColor(color: Colors = "primary"): void {
        if (this.color !== color) {
            this.deleteClass("WUILabel-" + this.color);
        }
        this.color = color;
        this.addClass("WUILabel-" + this.color);
        this.updateRequiredWidth();
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

    public getRequiredWidth(): number {
        return this.requiredWidth;
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
