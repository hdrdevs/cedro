import { Draggable } from "./draggable.ui";
import "./styles/vpanel.css";
import { Widget, WidgetAlignTypes, WidgetTypes } from "./widget.ui";

const VPANEL_HANDLER_SIZE = 15;

export class VPanel extends Widget {
    topContent: Widget | null;
    bottomContent: Widget | null;

    topHeight: number | null;
    bottomHeight: number | null;

    handler: Widget;
    draggable: Draggable;

    constructor(id: string, parent: Widget | null = null) {
        super(id, "div", parent);
        this.setAlign(WidgetAlignTypes.VERTICAL);
        this.setType(WidgetTypes.FILL);
        this.setPadding(VPANEL_HANDLER_SIZE);

        this.handler = new Widget(id + ".handler", "div", null);
        this.handler.addClass("WUIVPanelHandler");

        this.draggable = new Draggable(this.handler, "vertical");
        this.draggable.setDraggingClass("WUIVPanelDragging");

        this.handler.subscribe({
            event: "drag",
            then: (_e, _w) => {
                this.updateSizeFromHandlerPosition();
            },
        });

        this.subscribe({
            event: "mousemove",
            then: (e, _w) => {
                this.updateHandlerOpacity(e as MouseEvent);
            },
        });

        this.topContent = null;
        this.bottomContent = null;

        this.topHeight = null;
        this.bottomHeight = null;
    }

    private updateHandlerOpacity(e: MouseEvent): void {
        const handlerY = this.handler.getY();
        const mouseY = e.clientY;
        const umbral = 100; //Distancia donde comienza a aparecer.
        const minDistance = 20; //Distancia a la que toma 100 de opacidad
        const distance = Math.abs(mouseY - handlerY);

        if (distance < umbral && distance > minDistance) {
            const ratio = 1 - distance / umbral;
            this.handler.getBody().style.opacity = ratio.toString();
        } else if (distance < minDistance) {
            this.handler.getBody().style.opacity = "1";
        } else {
            this.handler.getBody().style.opacity = "0";
        }
    }

    public setTop(content: Widget, fixHeight: number | null = null): void {
        this.topContent = content;
        this.topHeight = fixHeight;
        if (fixHeight !== null) {
            this.bottomHeight = null;
            this.topContent.setFixedSize(fixHeight);
        }
        this.addChild(content);
    }

    public setBottom(content: Widget, fixHeight: number | null = null): void {
        this.bottomContent = content;
        this.bottomHeight = fixHeight;
        if (fixHeight !== null) {
            this.topHeight = null;
            this.bottomContent.setFixedSize(fixHeight);
        }
        this.addChild(content);
    }

    private updateSizeFromHandlerPosition(): void {
        if (this.topHeight !== null) {
            this.topHeight = this.handler.getY();
        } else if (this.bottomHeight !== null) {
            this.bottomHeight = this.getH() - this.handler.getY();
        }

        this.render();
    }

    public render(): void {
        super.render();
        this.handler.setH(VPANEL_HANDLER_SIZE - 10);
        this.handler.setW(this.getW());

        if (this.topHeight !== null) {
            this.handler.setY(this.topHeight);
            this.topContent?.setFixedSize(this.topHeight);
        } else if (this.bottomHeight !== null) {
            this.handler.setY(this.getH() - this.bottomHeight);
            this.bottomContent?.setFixedSize(this.bottomHeight);
        } else {
            if (this.topHeight === null) {
                this.topHeight = this.getH() / 2 - VPANEL_HANDLER_SIZE / 2;
            }
            this.handler.setY(this.topHeight);
            this.topContent?.setFixedSize(this.topHeight);
        }

        this.handler.setX(0);
    }
}
