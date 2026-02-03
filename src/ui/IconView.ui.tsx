import "./styles/icon.css";

import { Widget } from "./widget.ui";
import { WidgetAlignTypes, WidgetTypes } from "./widget.types";
import { Scroll } from "./scroll.ui";
import { IconViewItem } from "./IconViewItem.ui";

export class IconView extends Widget {
    container: Widget;
    verticalScrollbar: Scroll;
    items: Array<IconViewItem> = [];
    itemWidth: number = 100;

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
        //item.icon.setIconSize("large");
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
}

/*
export type wIconProps = WidgetProps & {
    icon: string;
    variant?: IconVariants | null;
    color?: Colors | null;
    size?: IconSizes | null;
};


export const WIcon = (props: wIconProps) => {
    if (!props.id) {
        props.id = "Icon." + UID();
    }

    connectWidgetCallback(props.id, getOnlyEventProps(props));

    return normalizeWidget(
        <div
            id={props.id}
            w-icon
            w-icon-name={props.icon}
            w-variant={props.variant}
            w-color={props.color}
            w-size={props.size}
        ></div>,
        props
    );
};

export function createIcon(id: string, content: any, parent: Widget | null = null): Icon {
    const dataIcon = content.getAttribute("w-icon-name");
    const dataVariant = content.getAttribute("w-variant") || "Filled";
    const dataColor = content.getAttribute("w-color") || "primary";
    const dataSize = content.getAttribute("w-size") || "medium";

    let newIcon = new Icon(id, dataIcon, dataVariant, parent);

    if (dataColor) {
        newIcon.setColor(dataColor);
    }

    if (dataSize) {
        newIcon.setIconSize(dataSize);
    }

    return newIcon;
}*/
