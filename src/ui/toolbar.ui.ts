import "./styles/toolbar.css";
import { IWidget } from "src/interfaces/widget.interface";
import { Widget, WidgetAlignTypes, WidgetTypes } from "./widget.ui";
import { IconButton } from "./IconButton.ui";
import { OrientationTypes } from "src/types/orientation.type";

const TOOLBAR_SIZE = 48;
const TOOLBAR_BUTTON_SIZE = 40;

export class Toolbar extends Widget {
    orientation: OrientationTypes;
    items: Map<string, IWidget>;
    size: number; //Indica el alto o ancho de la toolbar.

    itemsContainer: Widget;
    btnLeft: IconButton;
    btnRight: IconButton;

    constructor(
        id: string,
        parent: Widget | null = null,
        orientationType: OrientationTypes = "horizontal"
    ) {
        super(id, "div", parent);
        this.orientation = orientationType;
        this.size = TOOLBAR_SIZE;
        this.items = new Map<string, IWidget>();

        if (this.orientation === "vertical") {
            this.setAlign(WidgetAlignTypes.VERTICAL);
        } else {
            this.setAlign(WidgetAlignTypes.HORIZONTAL);
        }

        this.setType(WidgetTypes.FILL);
        this.setFixedSize(TOOLBAR_SIZE);
        this.addClass("WUIToolbar");

        this.itemsContainer = new Widget(this.id + ".itemsContainer", "div", this);
        this.itemsContainer.setType(WidgetTypes.CUSTOM);
        this.itemsContainer.getBody().style.position = "absolute";
        this.itemsContainer.getBody().style.overflow = "hidden";

        this.getBody().style.overflow = "hidden";

        this.btnLeft = new IconButton(this.id + ".btnLeft", this.getIconLeft());
        this.btnLeft.setType(WidgetTypes.CUSTOM);
        this.btnLeft.getBody().style.position = "absolute";
        this.btnLeft.setW(TOOLBAR_BUTTON_SIZE);
        this.btnLeft.setH(TOOLBAR_SIZE);
        this.addChild(this.btnLeft);

        this.btnRight = new IconButton(this.id + ".btnRight", this.getIconRight());
        this.btnRight.setType(WidgetTypes.CUSTOM);
        this.btnRight.getBody().style.position = "absolute";
        this.btnRight.setW(TOOLBAR_BUTTON_SIZE);
        this.btnRight.setH(TOOLBAR_SIZE);
        this.addChild(this.btnRight);

        this.btnLeft.subscribe({
            event: "click",
            then: () => {
                if (this.orientation === "horizontal") {
                    this.itemsContainer.getBody().scrollLeft -= TOOLBAR_SIZE;
                } else {
                    this.itemsContainer.getBody().scrollTop -= TOOLBAR_SIZE;
                }
            },
        });

        this.btnRight.subscribe({
            event: "click",
            then: () => {
                if (this.orientation === "horizontal") {
                    this.itemsContainer.getBody().scrollLeft += TOOLBAR_SIZE;
                } else {
                    this.itemsContainer.getBody().scrollTop += TOOLBAR_SIZE;
                }
            },
        });
    }

    public getIconLeft(): string {
        if (this.orientation === "horizontal") {
            return "arrow_left";
        }
        return "arrow_drop_up";
    }

    public getIconRight(): string {
        if (this.orientation === "horizontal") {
            return "arrow_right";
        }
        return "arrow_drop_down";
    }

    /**
     * Set the orientation of the toolbar.
     *
     * @param {ToolbarOrientationTypes} orientationType - the type of orientation to set
     * @return {void}
     */
    public setOrientation(orientationType: OrientationTypes, size: number = TOOLBAR_SIZE): void {
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
        widget.setParent(this.itemsContainer);

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

    public getFullSize(): number {
        //Devuelve el tamaño que tiene la toolbar para mostrar todos los botones.

        let size = 0;
        for (const item of this.items.values()) {
            if (this.orientation === "horizontal") {
                size += item.getW();
            } else if (this.orientation === "vertical") {
                size += item.getH();
            }
        }
        return size;
    }

    public render(): void {
        const fullSize = this.getFullSize();
        const availableSize = this.orientation === "horizontal" ? this.getW() : this.getH();
        super.render();
        if (fullSize > availableSize) {
            this.btnLeft.setVisible(true);
            this.btnRight.setVisible(true);

            if (this.orientation === "horizontal") {
                this.itemsContainer.setY(0);
                this.itemsContainer.setX(TOOLBAR_BUTTON_SIZE);
                this.itemsContainer.setW(availableSize - TOOLBAR_BUTTON_SIZE * 2);
                this.itemsContainer.setH(TOOLBAR_SIZE);

                this.btnLeft.setX(0);
                this.btnLeft.setW(TOOLBAR_BUTTON_SIZE);
                this.btnLeft.setH(TOOLBAR_SIZE);
                this.btnRight.setX(availableSize - TOOLBAR_BUTTON_SIZE);
                this.btnRight.setW(TOOLBAR_BUTTON_SIZE);
                this.btnRight.setH(TOOLBAR_SIZE);
            } else {
                this.itemsContainer.setY(TOOLBAR_BUTTON_SIZE);
                this.itemsContainer.setX(0);
                this.itemsContainer.setW(TOOLBAR_SIZE);
                this.itemsContainer.setH(availableSize - TOOLBAR_BUTTON_SIZE * 2);

                this.btnLeft.setY(0);
                this.btnLeft.setW(TOOLBAR_SIZE);
                this.btnLeft.setH(TOOLBAR_BUTTON_SIZE);
                this.btnRight.setY(availableSize - TOOLBAR_BUTTON_SIZE);
                this.btnRight.setW(TOOLBAR_SIZE);
                this.btnRight.setH(TOOLBAR_BUTTON_SIZE);
            }
        } else {
            this.btnLeft.setVisible(false);
            this.btnRight.setVisible(false);

            if (this.orientation === "horizontal") {
                this.itemsContainer.setY(0);
                this.itemsContainer.setX(0);
                this.itemsContainer.setW(fullSize);
                this.itemsContainer.setH(TOOLBAR_SIZE);
            } else {
                this.itemsContainer.setY(0);
                this.itemsContainer.setX(0);
                this.itemsContainer.setW(TOOLBAR_SIZE);
                this.itemsContainer.setH(fullSize);
            }
        }

        let currentPosition: number = 0;

        for (const item of this.items.values()) {
            if (this.orientation === "vertical") {
                item.setY(currentPosition);
                currentPosition += item.getH();
                item.setX(0);
                item.setW(TOOLBAR_BUTTON_SIZE);
            } else {
                item.setX(currentPosition);
                item.setY(0);
                item.setH(TOOLBAR_BUTTON_SIZE);
                currentPosition += item.getW();
            }
            item.render();
        }
    }
}
