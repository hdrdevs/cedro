import { IWidget } from "src/interfaces/widget.interface";
import { Widget, WidgetTypes } from "./widget.ui";

export type ToolbarOrientationTypes = "horizontal" | "vertical";
const TOOLBAR_SIZE = 40;

export class Toolbar extends Widget {
    orientation: ToolbarOrientationTypes;
    items: Map<string, IWidget>;
    size: number; //Indica el alto o ancho de la toolbar.

    constructor(id: string, parent: Widget | null = null, orientationType: ToolbarOrientationTypes = "horizontal") {
        super(id, "div", parent);
        this.orientation = orientationType;
        this.size = TOOLBAR_SIZE;
        this.items = new Map<string, IWidget>();

        this.setType(WidgetTypes.FILL);
    }

    /**
     * Set the orientation of the toolbar.
     *
     * @param {ToolbarOrientationTypes} orientationType - the type of orientation to set
     * @return {void}
     */
    public setOrientation(orientationType: ToolbarOrientationTypes, size: number = TOOLBAR_SIZE): void {
        this.orientation = orientationType;
        this.size = size;
    }

    public setSize(size: number): void {
        this.size = size;
    }

    /**
     * Adds an item to the collection.
     *
     * @param {string} id - The ID of the item.
     * @param {IWidget} widget - The widget to be added.
     */
    addItem(id: string, widget: IWidget) {
        widget.setParent(this);

        widget.setType(WidgetTypes.CUSTOM);

        if (this.orientation === "vertical") {
            widget.setW(this.size);
        } else {
            widget.setH(this.size);
        }

        this.items.set(id, widget);
    }

    public init(): void {
        super.init();
    }

    public render(): void {
        let currentPosition: number = 0;
        for (const item of this.items.values()) {
            if (this.orientation === "vertical") {
                item.setY(currentPosition);
                currentPosition += item.getH();
                item.setX(0);
            } else {
                item.setX(currentPosition);
                item.setY(0);
                currentPosition += item.getW();
            }
            item.render();
        }

        super.render();
    }
}
