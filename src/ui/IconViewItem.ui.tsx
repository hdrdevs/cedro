import "./styles/iconviewitem.css";
import { Colors } from "./colors.ui";
import { addNewWidget } from "./widget.collection";
import { connectWidgetCallback, getOnlyEventProps, Widget } from "./widget.ui";
import { UID } from "../core/uid";
import { WidgetAlignTypes, WidgetProps, WidgetTypes } from "./widget.types";
import { normalizeWidget } from "./widget.normalize";
import { Icon, iconPixelSizesMap, IconSizes, IconVariants } from "./Icon.ui";
import { Label } from "./label.ui";
import { Container } from "./container.ui";

export class IconViewItem extends Widget {
    variant: IconVariants;
    color: Colors | null = null;
    iconSize: IconSizes = "medium";
    container: Container;

    icon: Icon;
    text: Label;

    constructor(
        id: string,
        icon: string,
        text: string,
        variant: IconVariants = "Filled",
        parent: Widget | null = null
    ) {
        super(id, "span", parent);

        this.variant = variant;
        this.setType(WidgetTypes.CUSTOM);
        this.setAlign(WidgetAlignTypes.VERTICAL);

        this.container = new Container({ id: id + ".container", orientation: "vertical" });

        this.icon = new Icon(this.id + ".icon", icon, variant, this.container);
        this.icon.setIconSize(this.iconSize);

        this.text = new Label(id + ".text", "h4", this.container);
        this.text.setText(text);

        this.container.addChild(this.icon);
        this.container.addChild(this.text);

        this.addClass("WUI-icon-view-item");

        this.addChild(this.container);

        this.init();
    }

    public render(): void {
        super.render();
    }

    public setWH(w: number, h: number): void {
        super.setWH(w, h);
    }

    public setW(w: number): void {
        super.setWH(w, this.getH());
    }

    public setH(h: number): void {
        super.setWH(this.getW(), h);

        this.container.setH(h);
        this.text.setH(h - this.icon.getH());
    }

    public init(): void {
        super.init();
    }

    public setIconSize(size: IconSizes = "medium"): void {
        this.icon.setIconSize(size);
    }

    public setIcon(icon: string): void {
        this.icon.setIcon(icon);
    }

    public setVariant(variant: IconVariants = "Filled"): void {
        this.variant = variant;
        this.icon.setVariant(variant);
    }

    public setColor(color: Colors = "primary"): void {
        this.icon.setColor(color);
    }

    public getVariant(): IconVariants {
        return this.variant;
    }

    public getColor(): Colors {
        return this.icon.getColor();
    }

    public getIcon(): string {
        return this.icon.getIcon();
    }

    public getIconSize(): IconSizes {
        return this.icon.getIconSize();
    }

    public getRequiredWidth(): number {
        const sizeString = iconPixelSizesMap[this.iconSize];
        const size = parseInt(sizeString.split("px")[0]);
        return size;
    }
}

export type wIconViewItemProps = WidgetProps & {
    icon: string;
    text: string;
    variant?: IconVariants | null;
    color?: Colors | null;
    size?: IconSizes | null;
};

export const WIconViewItem = (props: wIconViewItemProps) => {
    if (!props.id) {
        props.id = "IconViewItem." + UID();
    }

    connectWidgetCallback(props.id, getOnlyEventProps(props));

    return normalizeWidget(
        <div
            id={props.id}
            w-icon-view-item
            w-icon-name={props.icon}
            w-icon-text={props.text}
            w-variant={props.variant}
            w-color={props.color}
            w-size={props.size}
        ></div>,
        props
    );
};

export function createIconViewItem(
    id: string,
    content: any,
    parent: Widget | null = null
): IconViewItem {
    const dataIcon = content.getAttribute("w-icon-name");
    const dataText = content.getAttribute("w-icon-text");
    const dataVariant = content.getAttribute("w-variant") || "Filled";
    const dataColor = content.getAttribute("w-color") || "primary";
    const dataSize = content.getAttribute("w-size") || "medium";

    let newIconViewItem = new IconViewItem(id, dataIcon, dataText, dataVariant, parent);

    if (dataColor) {
        newIconViewItem.setColor(dataColor);
    }

    if (dataSize) {
        newIconViewItem.setIconSize(dataSize);
    }

    //Agregamos el widget para que puedan ser inicializados los eventos asociados
    addNewWidget(id, newIconViewItem);

    return newIconViewItem;
}
