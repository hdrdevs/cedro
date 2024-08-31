import "./styles/valuebar.css";
import { OrientationTypes } from "../types/orientation.type";
import { Widget, connectWidgetCallback, getOnlyEventProps } from "./widget.ui";
import { Draggable } from "./draggable.ui";
import { UID } from "../core/uid";
import { WidgetProps } from "./widget.types";
import { normalizeWidget } from "./widget.normalize";

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

    public getValue(): number {
        return this.value;
    }

    public updateValueFromHandlerPosition(): void {
        if (this.orientation === "horizontal") {
            const maxX = this.draggable.maxX ? this.draggable.maxX : 1;
            const ratio = this.handler.getX() / maxX;
            this.value = Math.round(ratio * 100);
        } else if (this.orientation === "vertical") {
            const maxY = this.draggable.maxY ? this.draggable.maxY : 1;
            const ratio = this.handler.getY() / maxY;
            this.value = Math.round(ratio * 100);
        }

        this.render();
    }

    public render(): void {
        super.render();

        if (this.orientation === "horizontal") {
            const handlerSize = 24;
            const heightBar = 14;
            const width = this.getW() - 3;
            const height = this.getH();
            const widthBar = width * (this.value / 100);

            this.containerBar.setX(0);
            this.containerBar.setY(height / 2 - heightBar / 2);
            this.containerBar.setH(heightBar);
            this.containerBar.setW(width);

            this.bar.setX(0);
            this.bar.setY(0);
            this.bar.setW(widthBar);
            this.bar.setH(heightBar - 4);

            this.handler.setX(widthBar - handlerSize + 2);
            this.handler.setY(height / 2 - handlerSize / 2);
            this.handler.setWH(handlerSize, handlerSize);

            this.draggable.setMinX(0);
            this.draggable.setMaxX(width - handlerSize + 2);
        } else if (this.orientation === "vertical") {
            const handlerSize = 24;
            const widthBar = 14;
            const height = this.getH() - 3;
            const width = this.getW();
            const heightBar = height * (this.value / 100);

            this.containerBar.setY(0);
            this.containerBar.setX(width / 2 - widthBar / 2);
            this.containerBar.setW(widthBar);
            this.containerBar.setH(height);

            this.bar.setX(0);
            this.bar.setY(0);
            this.bar.setH(heightBar);
            this.bar.setW(widthBar - 4);

            this.handler.setY(heightBar - handlerSize + 2);
            this.handler.setX(width / 2 - handlerSize / 2);
            this.handler.setWH(handlerSize, handlerSize);

            this.draggable.setMinY(0);
            this.draggable.setMaxY(height - handlerSize + 2);
        }
    }
}

export type wValueBarProps = WidgetProps & {
    value: number;
};

export const WValueBar = (props: wValueBarProps) => {
    if (!props.id) {
        props.id = "ValueBar." + UID();
    }

    connectWidgetCallback(props.id, getOnlyEventProps(props));

    return normalizeWidget(<div id={props.id} w-valuebar w-value={props.value}></div>, props);
};

export function createValueBar(id: string, content: any, parent: Widget | null = null): ValueBar {
    const dataOrientation = content.getAttribute("w-orientation");
    const dataValue = content.getAttribute("w-value");
    let orientation: OrientationTypes = dataOrientation ? dataOrientation : "horizontal";

    let newValueBar = new ValueBar(id, orientation, parent);

    if (dataValue) {
        newValueBar.setValue(parseInt(dataValue));
    }

    return newValueBar;
}
