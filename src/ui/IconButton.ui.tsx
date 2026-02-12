import "./styles/button.css";
import { Widget, connectWidgetCallback, getOnlyEventProps } from "./widget.ui";
import { Button, wButtonProps } from "./button.ui";
import { Icon } from "./Icon.ui";
import { Label } from "./label.ui";
import { UID } from "../core/uid";
import { WidgetAlignTypes, WidgetTypes } from "./widget.types";
import { normalizeWidget } from "./widget.normalize";

export type IconButtonIconPosition = "left" | "right";

export class IconButton extends Button {
    icon: Icon;
    label: Label;

    showIcon: boolean;
    showText: boolean;
    centerX: boolean;

    iconPosition: IconButtonIconPosition = "left";

    constructor(id: string, icon: string = "dark_mode", parent: Widget | null = null) {
        super(id, parent);

        this.centerX = false;
        this.iconPosition = "left";

        this.setAlign(WidgetAlignTypes.HORIZONTAL);
        this.icon = new Icon(id + ".icon", icon, undefined, this);
        this.label = new Label(id + ".label", undefined, this);

        this.showIcon = true;
        this.showText = true;

        this.init();
    }

    protected updateRequiredWidth(): void {
        if (!this.label) return;
        if (!this.icon) return;

        const labelWidth = this.label.getRequiredWidth();
        const iconWith = this.icon.getRequiredWidth();

        this.requiredWidth = labelWidth + iconWith + 70;
    }

    public displayIcon(): void {
        this.showIcon = true;
        this.icon.setVisible(true);
        this.render();
    }

    public hideIcon(): void {
        this.showIcon = false;
        this.icon.setVisible(false);
        this.render();
    }

    public displayText(): void {
        this.showText = true;
        this.label.setVisible(true);
        this.render();
    }

    public hideText(): void {
        this.showText = false;
        this.label.setVisible(false);
        this.render();
    }

    public init(): void {
        super.init();
    }

    public onlyIcon(): boolean {
        if (this.label.getText().length > 0) return false;
        return true;
    }

    public render(): void {
        super.render();

        const labelWidth = this.label.getRequiredWidth();
        const iconWidth = this.icon.getRequiredWidth();
        const padding = 5;

        if (this.onlyIcon()) {
            this.icon.getBody().style.position = "absolute";

            const startX = this.getBody().clientWidth / 2 - iconWidth / 2;
            const startY = this.getH() / 2 - this.icon.getH() / 2;

            this.icon.setX(startX);
            this.icon.setY(startY);
        } else {
            this.label.getBody().style.position = "absolute";
            this.icon.getBody().style.position = "absolute";

            const availableWidth = this.getW() - padding * 5; //Doble padding a la derecha e izquierda y uno de separacion entre label y icon.
            const requiredWidth = labelWidth + iconWidth + padding * 5;

            const labelHeight = this.label.getBody().clientHeight;
            let startX = 0;
            let startY = 0;
            let startLabelX = 0;
            let startLabelY = 0;
            let spaceBetLabelAndIcon = padding * 2;

            if (this.iconPosition == "left") {

                startX = availableWidth / 2 - (iconWidth + spaceBetLabelAndIcon + labelWidth) / 2;

                if (availableWidth < requiredWidth) {
                    startX = padding * 2;
                }

                if (!this.centerX) {
                    startX = padding * 2;
                }

                startLabelX = startX + iconWidth + spaceBetLabelAndIcon;

                startY = this.getH() / 2 - iconWidth / 2;
                startLabelY = this.getH() / 2 - labelHeight / 2;


            } else if (this.iconPosition == "right") {

                startLabelX = availableWidth / 2 - (iconWidth / 2 + spaceBetLabelAndIcon + labelWidth) / 2;

                if (!this.centerX) {
                    startLabelX = padding * 2;
                }

                startX = startLabelX + labelWidth + spaceBetLabelAndIcon;

                if (availableWidth < requiredWidth) {
                    startLabelX = padding * 2;
                }

                startY = this.getH() / 2 - iconWidth / 2;
                startLabelY = this.getH() / 2 - labelHeight / 2;

            }

            if (this.getType() !== WidgetTypes.FILL) {
                startY = this.getH() / 2 - this.icon.getH() / 2;
                this.label.getBody().style.lineHeight = this.getH() + "px";
                startLabelY = this.getH() / 2 - this.label.getH() / 2;
            }

            if (startX < 0 || startY < 0) {
                setTimeout(() => {
                    this.render();
                }, 500);
                return;
            }

            this.icon.setX(startX);
            this.label.setX(startLabelX);

            this.icon.setY(startY);
            this.label.setY(startLabelY);
        }
    }

    public setText(text: string): void {
        //super.setText(text);
        this.label.setText(text);
        this.updateRequiredWidth();
    }

    public setIcon(icon: string): void {
        this.icon.setIcon(icon);
        this.updateRequiredWidth();
    }

    public setCenterX(centerX: boolean): void {
        this.centerX = centerX;
    }

    public setIconPosition(position: IconButtonIconPosition = "left") {
        this.iconPosition = position;
    }
}

export type wIconButtonProps = Omit<wButtonProps, "text"> & {
    icon?: string | null;
    text?: string | null;
    onlyIcon?: boolean | null;
    centerX?: boolean | null;
    iconPosition?: IconButtonIconPosition | null;
};

export const WIconButton = (props: wIconButtonProps) => {
    if (!props.id) {
        props.id = "IconButton." + UID();
    }

    connectWidgetCallback(props.id, getOnlyEventProps(props));

    return normalizeWidget(
        <button
            id={props.id}
            w-icon-button
            w-icon={props.icon}
            w-text={props.text}
            w-only-icon={props.onlyIcon}
            w-variant={props.variant}
            w-color={props.color}
            w-width={props.width}
            w-height={props.height}
            w-center-x={props.centerX}
            w-icon-position={props.iconPosition}
        />,
        props
    );
};

export function createIconButton(
    id: string,
    content: any,
    parent: Widget | null = null
): IconButton {
    const dataIcon = content.getAttribute("w-icon");
    const dataText = content.getAttribute("w-text");
    const dataVariant = content.getAttribute("w-variant");
    const dataColor = content.getAttribute("w-color");
    const dataWidth = content.getAttribute("w-width");
    const dataHeight = content.getAttribute("w-height");
    const dataOnlyIcon = content.getAttribute("w-only-icon");
    const dataCenterX = content.getAttribute("w-center-x");
    const dataIconPosition = content.getAttribute("w-icon-position");

    let newIconButton = new IconButton(id, dataIcon, parent);

    if (dataText) {
        newIconButton.setText(dataText);
    }

    if (dataVariant) {
        newIconButton.setVariant(dataVariant);
    }

    if (dataColor) {
        newIconButton.setColor(dataColor);
    }

    if (dataWidth) {
        newIconButton.setInitialW(dataWidth);
    }

    if (dataHeight) {
        newIconButton.setInitialH(dataHeight);
    }

    if (dataOnlyIcon) {
        newIconButton.onlyIcon();
    }

    if (dataCenterX) {
        newIconButton.setCenterX(true);
    }

    if (dataIconPosition) {
        newIconButton.setIconPosition(dataIconPosition);
    }

    return newIconButton;
}
