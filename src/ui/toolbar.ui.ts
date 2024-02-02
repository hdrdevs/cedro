import { IWidget } from "src/interfaces/widget.interface";
import { Widget } from "./widget.ui";

export type ToolbarOrientationTypes = "horizontal" | "vertical";

export class Toolbar extends Widget {
    orientation: ToolbarOrientationTypes;
    items: Map<string, IWidget>;

    constructor(
        id: string,
        parent: Widget | null = null,
        orientationType: ToolbarOrientationTypes = "horizontal"
    ) {
        super(id, "div", parent);
        this.orientation = orientationType;

        this.items = new Map<string, IWidget>();
    }

    /**
     * Set the orientation of the toolbar.
     *
     * @param {ToolbarOrientationTypes} orientationType - the type of orientation to set
     * @return {void}
     */
    public setOrientation(orientationType: ToolbarOrientationTypes): void {
        this.orientation = orientationType;
    }

    /**
     * Adds an item to the collection.
     *
     * @param {string} id - The ID of the item.
     * @param {IWidget} widget - The widget to be added.
     */
    addItem(id: string, widget: IWidget) {
        widget.setParent(this);
        this.items.set(id, widget);
    }
}
