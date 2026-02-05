import "./styles/icon.css";

import { connectWidgetCallback, getOnlyEventProps, Widget } from "./widget.ui";
import { WidgetAlignTypes, WidgetProps, WidgetTypes } from "./widget.types";
import { Scroll } from "./scroll.ui";
import { createIconViewItem, IconViewItem } from "./IconViewItem.ui";
import { IconSizes, IconVariants } from "./Icon.ui";
import { Colors } from "./colors.ui";
import { UID } from "../core/uid";
import { normalizeWidget } from "./widget.normalize";

export class IconView extends Widget {
    container: Widget;
    verticalScrollbar: Scroll;
    items: Array<IconViewItem> = [];
    itemWidth: number = 100;
    variant: IconVariants = "Outlined";
    color: Colors = "primary";
    size: IconSizes = "medium";

    constructor(id: string, parent: Widget | null = null) {
        super(id, "div", parent);

        this.setType(WidgetTypes.FILL);
        this.setAlign(WidgetAlignTypes.VERTICAL);

        this.container = new Widget(id + ".container", "div");
        this.container.setType(WidgetTypes.FILL);

        this.verticalScrollbar = new Scroll(id + ".VerticalScrollbar", this.container);

        this.items = [];

        this.addChild(this.container);

        this.init();
    }

    public addItem(item: IconViewItem): void {
        item.setWH(this.itemWidth, this.itemWidth);
        this.items.push(item);
        this.container.addChild(item);
    }

    public init(): void {
        super.init();
    }

    private renderIcons(): void {
        let currentLeft = 0;
        let currentTop = 0;
        const margin = 10;
        const itemWidth = this.itemWidth + margin * 2;

        let itemsByRow = Math.floor(this.getW() / itemWidth);
        if (itemsByRow == 0) {
            itemsByRow = 1;
        }
        const rows = Math.ceil(this.items.length / itemsByRow);
        const rowsHeight: Array<number> = Array(rows).fill(0);

        //Reseteamos las dimensiones de los items antes de calcular su tamanio.
        for (const item of this.items) {
            item.setH(item.getW());
        }

        //Calculamos el tamanio de cada fila.
        for (let i = 0; i < rows; i++) {
            for (let x = 0; x < this.items.length; x++) {
                const item = this.items[x];
                const isItemInRow = i * itemsByRow <= x && x < (i + 1) * itemsByRow;
                if (isItemInRow) {
                    if (item.text.getBody().scrollHeight + item.icon.getH() > rowsHeight[i]) {
                        rowsHeight[i] = item.text.getBody().scrollHeight + item.icon.getH();
                    }
                }
            }
        }

        //Aplicamos las dimensiones a los items.
        for (let i = 0; i < rows; i++) {
            for (let x = 0; x < this.items.length; x++) {
                const item = this.items[x];
                const isItemInRow = i * itemsByRow <= x && x < (i + 1) * itemsByRow;
                if (isItemInRow) {
                    item.setX(currentLeft + margin);
                    item.setY(currentTop + margin);
                    item.setH(rowsHeight[i]);

                    item.text.setHCentered(true);

                    item.render();
                    currentLeft += itemWidth;
                    if (currentLeft + itemWidth > this.container.getW()) {
                        currentLeft = 0;
                        currentTop += rowsHeight[i] + margin * 2;
                    }
                }
            }
        }
    }

    public render(): void {
        super.render();
        this.renderIcons();
        this.verticalScrollbar.render();
    }

    public setItemWidth(itemWidth: number): void {
        this.itemWidth = itemWidth;
    }

    public setVariant(variant: IconVariants): void {
        this.variant = variant;
        for (const icon of this.items) {
            icon.setVariant(variant);
        }
    }

    public setColor(color: Colors): void {
        this.color = color;
        for (const icon of this.items) {
            icon.setColor(color);
        }
    }

    public setSize(size: IconSizes): void {
        this.size = size;
        for (const icon of this.items) {
            icon.setIconSize(size);
        }
    }
}

export type wIconViewProps = WidgetProps & {
    id?: string | null;
    variant?: IconVariants | null;
    color?: Colors | null;
    size?: IconSizes | null;
    itemWidth?: number | null;
    children?: any;
};

export const WIconView = (props: wIconViewProps) => {
    if (!props.id) {
        props.id = "IconView." + UID();
    }

    connectWidgetCallback(props.id, getOnlyEventProps(props));

    return normalizeWidget(
        <div
            id={props.id}
            w-icon-view
            w-variant={props.variant}
            w-color={props.color}
            w-size={props.size}
            w-item-width={props.itemWidth}
        >
            {props.children}
        </div>,
        props
    );
};

export function createIconView(id: string, content: any, parent: Widget | null = null): IconView {
    const dataVariant = content.getAttribute("w-variant") || "Filled";
    const dataColor = content.getAttribute("w-color") || "primary";
    const dataSize = content.getAttribute("w-size") || "medium";
    const dataItemWidth = content.getAttribute("w-item-width") || 100;

    let newIconView = new IconView(id, parent);

    content.childNodes.forEach((iconItem: HTMLElement, index: number) => {
        if (iconItem.getAttribute("w-icon-view-item") !== null) {
            const itemId = iconItem.getAttribute("id") || "icon-view-item." + index;

            const newItem = createIconViewItem(itemId, iconItem, null);

            if (itemId !== null) {
                newIconView.addItem(newItem);
            }
        }
    });

    if (dataVariant) {
        newIconView.setVariant(dataVariant);
    }

    if (dataColor) {
        newIconView.setColor(dataColor);
    }

    if (dataSize) {
        newIconView.setSize(dataSize);
    }

    if (dataItemWidth) {
        newIconView.setItemWidth(parseInt(dataItemWidth));
    }

    return newIconView;
}
