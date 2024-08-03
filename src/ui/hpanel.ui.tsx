import { Draggable } from "./draggable.ui";
import "./styles/hpanel.css";
import { WidgetProps, createWidget, normalizeWidget } from "./widget.builder";
import { Widget, WidgetAlignTypes, WidgetTypes } from "./widget.ui";

const HPANEL_HANDLER_SIZE = 4;

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

        this.handler = new Widget(id + ".handler", "div", null);
        this.handler.addClass("WUIHPanelHandler");

        this.draggable = new Draggable(this.handler, "horizontal");
        this.draggable.setDraggingClass("WUIHPanelDragging");
        this.draggable.setBackgroundCursor("col-resize");

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

        const spacer = new Widget("spacer." + Date.now().toString(), "div", null);
        spacer.setType(WidgetTypes.FILL);
        spacer.setFixedSize(HPANEL_HANDLER_SIZE);
        this.addChild(spacer);
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
            const leftX = this.leftContent ? this.leftContent.getX(true) : 0;
            this.leftWidth = this.handler.getX() - leftX;
        } else if (this.rightWidth !== null) {
            this.rightWidth = this.getW() - this.handler.getX();
        }

        this.render();
    }

    public render(): void {
        super.render();
        this.handler.setW(HPANEL_HANDLER_SIZE);
        this.handler.setH(this.getH());

        if (this.leftWidth !== null) {
            const leftX = this.leftContent ? this.leftContent.getX(true) : 0;
            this.handler.setX(leftX + this.leftWidth);
            this.leftContent?.setFixedSize(this.leftWidth);
        } else if (this.rightWidth !== null) {
            const rightX = this.rightContent ? this.rightContent.getX(true) : 0;
            this.handler.setX(rightX + this.rightWidth);
            this.rightContent?.setFixedSize(this.rightWidth);
        } else {
            if (this.leftWidth === null) {
                this.leftWidth = this.getW() / 2 - HPANEL_HANDLER_SIZE / 2;
            }
            const leftX = this.leftContent ? this.leftContent.getX(true) : 0;
            this.handler.setX(leftX + this.leftWidth);
            this.leftContent?.setFixedSize(this.leftWidth);
        }

        this.handler.setY(this.getY(true));
    }

    public free(): void {
        this.handler.free();
        this.leftContent?.free();
        this.rightContent?.free();
        //this.draggable.free();
        super.free();
    }
}

export type WHPanelProps = WidgetProps & {
    children: any;
};

export const WHPanel = (props: WHPanelProps) => {
    return normalizeWidget(<div w-hpanel>{props.children}</div>, props);
};

export function createHPanel(id: string, content: any, parent: Widget | null = null): HPanel {
    let newPanel = new HPanel(id, parent);

    content.childNodes.forEach((item: HTMLElement, index: number) => {
        const widget = createWidget(item);

        if (widget !== null) {
            if (index === 0) {
                newPanel.setLeft(widget, widget.getFixedSize());
            } else if (index === 1) {
                newPanel.setRight(widget);
            }
        }
    });

    return newPanel;
}
