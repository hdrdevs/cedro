import { OrientationTypes } from "src/types/orientation.type";
import "./styles/draggable.css";
import { Widget, WidgetTypes } from "./widget.ui";

export type DragOrientation = OrientationTypes | "both";

export class Draggable {
    target: Widget;
    background: Widget;

    dragging: boolean = false;
    dragDistX: number;
    dragDistY: number;
    dragOrientation: DragOrientation;

    minX: number | null;
    minY: number | null;
    maxX: number | null;
    maxY: number | null;

    draggingClass: string | null;

    constructor(widget: Widget, orientation: DragOrientation = "both") {
        this.target = widget;

        this.background = new Widget(this.target.id + ".Draggable.Background", "div", null);
        this.background.setType(WidgetTypes.CUSTOM);
        this.background.addClass("WUIDraggableBackground");

        this.draggingClass = null;

        this.dragDistX = 0;
        this.dragDistY = 0;

        this.maxX = null;
        this.maxY = null;

        this.minX = null;
        this.minY = null;

        this.dragOrientation = orientation;

        this.target.subscribe({
            event: "mousedown",
            then: (e, _w) => {
                this.startDrag(e as MouseEvent);
            },
        });

        this.background.subscribe({
            event: "mousemove",
            then: (e, _w) => {
                this.draggingTarget(e as MouseEvent);
            },
        });

        this.background.subscribe({
            event: "mouseup",
            then: (_e, _w) => {
                this.endDrag();
            },
        });

        this.background.subscribe({
            event: "mouseout",
            then: (_e, _w) => {
                this.endDrag();
            },
        });

        this.background.subscribe({
            event: "mouseleave",
            then: (_e, _w) => {
                this.endDrag();
            },
        });

        this.background.setVisible(false);
    }

    public setDraggingClass(draggingClass: string | null): void {
        this.draggingClass = draggingClass;
    }

    private startDrag(e: MouseEvent): void {
        e.preventDefault();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        this.dragDistX = Math.abs(this.target.getX() - mouseX);
        this.dragDistY = Math.abs(this.target.getY() - mouseY);
        this.dragging = true;
        this.background.setVisible(true);
        this.background.raisteTop();

        if (this.draggingClass) {
            this.target.addClass(this.draggingClass);
        }
    }

    private draggingTarget(e: MouseEvent): void {
        if (!this.dragging) {
            return;
        }

        e.preventDefault();

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        if (this.dragOrientation === "both" || this.dragOrientation === "horizontal") {
            let newX = mouseX - this.dragDistX;
            if (this.maxX != null && newX > this.maxX) {
                newX = this.maxX;
            }

            if (this.minX != null && newX < this.minX) {
                newX = this.minX;
            }
            this.target.setX(newX);
        }

        if (this.dragOrientation === "both" || this.dragOrientation === "vertical") {
            let newY = mouseY - this.dragDistY;
            if (this.maxY != null && newY > this.maxY) {
                newY = this.maxY;
            }

            if (this.minY != null && newY < this.minY) {
                newY = this.minY;
            }
            this.target.setY(newY);
        }

        this.target.run("drag");
    }

    private endDrag(): void {
        this.dragging = false;
        this.background.setVisible(false);

        if (this.draggingClass) {
            this.target.deleteClass(this.draggingClass);
        }
    }

    public setMaxX(x: number | null): void {
        this.maxX = x;
    }

    public setMaxY(y: number | null): void {
        this.maxY = y;
    }

    public setMinX(x: number | null): void {
        this.minX = x;
    }

    public setMinY(y: number | null): void {
        this.minY = y;
    }
}
