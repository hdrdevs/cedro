import "./styles/button.css";
import {
    Widget,
    WidgetAlignTypes,
    WidgetTypes,
    connectWidgetCallback,
    getOnlyEventProps,
} from "./widget.ui";
import { Button, wButtonProps } from "./button.ui";
import { Icon } from "./Icon.ui";
import { Label } from "./label.ui";
import { normalizeWidget } from "./widget.builder";
import { UID } from "../core/uid";

export class IconButton extends Button {
    icon: Icon;
    label: Label;

    showIcon: boolean;
    showText: boolean;

    constructor(id: string, icon: string = "dark_mode", parent: Widget | null = null) {
        super(id, parent);

        this.setAlign(WidgetAlignTypes.HORIZONTAL);
        this.icon = new Icon(id + ".icon", icon, undefined, this);
        this.label = new Label(id + ".label", undefined, this);

        this.showIcon = true;
        this.showText = true;

        this.init();
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

        const iconWidth = 24;
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

            const labelHeight = this.label.getBody().clientHeight;

            const startX = padding; //this.getBody().clientWidth / 2 - (iconWidth + labelWidth) / 2;
            const startLabelX = startX + iconWidth + padding;
            let startY = this.getH() / 2 - iconWidth / 2;
            let startLabelY = this.getH() / 2 - labelHeight / 2;

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
            this.label.setX(startLabelX + padding);

            this.icon.setY(startY);
            this.label.setY(startLabelY);
        }
    }

    public setText(text: string): void {
        //super.setText(text);
        this.label.setText(text);
    }

    public setIcon(icon: string): void {
        this.icon.setIcon(icon);
    }
}

export type wIconButtonProps = Omit<wButtonProps, "text"> & {
    icon?: string | null;
    text?: string | null;
    onlyIcon?: boolean | null;
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

    return newIconButton;
}
