import { Draggable } from "./draggable.ui";
import "./styles/hpanel.css";
import { Widget, WidgetAlignTypes, WidgetTypes } from "./widget.ui";

const HPANEL_HANDLER_SIZE = 15;

export class HPanel extends Widget {
    leftContent: Widget | null;
    rightContent: Widget | null;

    leftWidth: number | null;
    rightWidth: number | null;

    handler: Widget;
    draggable: Draggable;

    constructor(id: string, parent: Widget | null = null) {
        super(id, "div", parent);
        this.setAlign(WidgetAlignTypes.HORIZONTAL);
        this.setType(WidgetTypes.FILL);
        this.setPadding(HPANEL_HANDLER_SIZE);

        this.handler = new Widget(id + ".handler", "div", null);
        this.handler.addClass("WUIHPanelHandler");

        this.draggable = new Draggable(this.handler, "horizontal");
        this.draggable.setDraggingClass("WUIHPanelDragging");

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

        this.leftContent = null;
        this.rightContent = null;

        this.leftWidth = null;
        this.rightWidth = null;
    }

    private updateHandlerOpacity(e: MouseEvent): void {
        const handlerX = this.handler.getX();
        const mouseX = e.clientX;
        const umbral = 100; //Distancia donde comienza a aparecer.
        const minDistance = 20; //Distancia a la que toma 100 de opacidad
        const distance = Math.abs(mouseX - handlerX);

        if (distance < umbral && distance > minDistance) {
            const ratio = 1 - distance / umbral;
            this.handler.getBody().style.opacity = ratio.toString();
        } else if (distance < minDistance) {
            this.handler.getBody().style.opacity = "1";
        } else {
            this.handler.getBody().style.opacity = "0";
        }
    }

    public setLeft(content: Widget, fixWidth: number | null = null): void {
        this.leftContent = content;
        this.leftWidth = fixWidth;
        if (fixWidth !== null) {
            this.rightWidth = null;
            this.leftContent.setFixedSize(fixWidth);
        }
        this.addChild(content);
    }

    public setRight(content: Widget, fixWidth: number | null = null): void {
        this.rightContent = content;
        this.rightWidth = fixWidth;
        if (fixWidth !== null) {
            this.leftWidth = null;
            this.rightContent.setFixedSize(fixWidth);
        }
        this.addChild(content);
    }

    private updateSizeFromHandlerPosition(): void {
        if (this.leftWidth !== null) {
            this.leftWidth = this.handler.getX();
        } else if (this.rightWidth !== null) {
            this.rightWidth = this.getW() - this.handler.getX();
        }

        this.render();
    }

    public render(): void {
        super.render();
        this.handler.setW(HPANEL_HANDLER_SIZE - 10);
        this.handler.setH(this.getH());

        if (this.leftWidth !== null) {
            this.handler.setX(this.leftWidth);
            this.leftContent?.setFixedSize(this.leftWidth);
        } else if (this.rightWidth !== null) {
            this.handler.setX(this.getW() - this.rightWidth);
            this.rightContent?.setFixedSize(this.rightWidth);
        } else {
            if (this.leftWidth === null) {
                this.leftWidth = this.getW() / 2 - HPANEL_HANDLER_SIZE / 2;
            }
            this.handler.setX(this.leftWidth);
            this.leftContent?.setFixedSize(this.leftWidth);
        }

        this.handler.setY(0);
    }
}