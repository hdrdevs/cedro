import "./styles/valuebar.css";
import { OrientationTypes } from "src/types/orientation.type";
import { Widget } from "./widget.ui";
import { Draggable } from "./draggable.ui";

export class ValueBar extends Widget {
    orientation: OrientationTypes;
    value: number;

    containerBar: Widget;
    bar: Widget;
    handler: Widget;

    draggable: Draggable;

    constructor(
        id: string,
        orientation: OrientationTypes = "horizontal",
        parent: Widget | null = null
    ) {
        super(id, "div", parent);

        this.containerBar = new Widget(id + ".containerBar", "div", this);
        this.bar = new Widget(id + ".bar", "div", this.containerBar);
        this.handler = new Widget(id + ".handler", "div", this);

        this.addClass("WUIValueBar");
        this.containerBar.addClass("WUIValueBarContainer");
        this.bar.addClass("WUIValueBarBar");
        this.handler.addClass("WUIValueBarHandler");

        this.draggable = new Draggable(this.handler, orientation);

        this.handler.subscribe({
            event: "drag",
            then: (_e, _w) => {
                this.updateValueFromHandlerPosition();
            },
        });

        this.orientation = orientation;
        this.value = 10;
        this.handler.raisteTop();
    }

    public setValue(value: number): void {
        this.value = value;
        this.render();
    }

    public updateValueFromHandlerPosition(): void {
        const maxX = this.draggable.maxX ? this.draggable.maxX : 1;
        const ratio = this.handler.getX() / maxX;
        this.value = Math.round(ratio * 100);

        this.render();
    }

    public render(): void {
        super.render();

        const handlerSize = 24;
        const heightBar = 10;
        const width = this.getW() - 2;
        const height = this.getH();
        const widthBar = width * (this.value / 100);

        this.containerBar.setX(0);
        this.containerBar.setY(height / 2 - heightBar / 2);
        this.containerBar.setH(heightBar);
        this.containerBar.setW(width);

        this.bar.setX(0);
        this.bar.setY(0);
        this.bar.setW(widthBar);
        this.bar.setH(heightBar);

        this.handler.setX(widthBar - handlerSize + 2);
        this.handler.setY(height / 2 - handlerSize / 2 + 2);
        this.handler.setWH(handlerSize, handlerSize);

        this.draggable.setMinX(0);
        this.draggable.setMaxX(width - handlerSize + 2);
    }
}
