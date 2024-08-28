import { OrientationTypes } from "../types/orientation.type";
import "./styles/scroll.css";
import { Widget, WidgetTypes } from "./widget.ui";
import { Draggable } from "./draggable.ui";

const SCROLL_SIZE = 10;

type ScrollData = {
    scrollHeight: number;
    areaHeight: number;
    scrollBarHeight: number;
    scrollWidth: number;
    areaWidth: number;
    scrollBarWidth: number;
    scrollWidt: number;
    availablePositionSize: number;
    ratioScroll: number;
    position: number;
    scrollPositionY: number;
};

export class Scroll extends Widget {
    contentArea: Widget;
    orientation: OrientationTypes;
    drag: Draggable;

    constructor(id: string, contentArea: Widget, orientation: OrientationTypes = "vertical") {
        super(id, "div");

        this.contentArea = contentArea;
        this.orientation = orientation;

        this.setType(WidgetTypes.CUSTOM);

        this.getBody().style.overflow = "hidden";
        this.getBody().style.position = "fixed";

        this.addClass("WUIScrollbar");

        this.drag = new Draggable(this, orientation);

        this.contentArea.subscribe({
            event: "wheel",
            then: (e, _w) => {
                const wheel = e as WheelEvent;
                this.contentArea.getBody().scrollBy(0, wheel.deltaY);
                this.render();
            },
        });

        this.subscribe({
            event: "drag",
            then: (_e, _w) => {
                this.updateScrollPositionByScrollbar();
            },
        });
    }

    private getScrollData(): ScrollData {
        let returnData: ScrollData = {
            scrollHeight: 0,
            areaHeight: 0,
            scrollBarHeight: 0,
            scrollWidth: 0,
            areaWidth: 0,
            scrollBarWidth: 0,
            scrollWidt: 0,
            availablePositionSize: 0,
            ratioScroll: 0,
            position: 0,
            scrollPositionY: 0,
        };

        if (this.orientation === "vertical") {
            returnData.scrollHeight = this.contentArea.getBody().scrollHeight;
            returnData.areaHeight = this.contentArea.getH();
            returnData.scrollBarHeight =
                returnData.areaHeight * (returnData.areaHeight / returnData.scrollHeight);
            returnData.availablePositionSize =
                returnData.areaHeight - returnData.scrollBarHeight - 1;
            returnData.ratioScroll =
                this.contentArea.getBody().scrollTop /
                (returnData.areaHeight - returnData.scrollBarHeight);
            returnData.position = returnData.availablePositionSize * returnData.ratioScroll;

            if (returnData.scrollBarHeight >= returnData.areaHeight) {
                returnData.scrollBarHeight = returnData.areaHeight;
            }
        } else if (this.orientation === "horizontal") {
            returnData.scrollWidth = this.contentArea.getBody().scrollWidth;
            returnData.areaWidth = this.contentArea.getW();
            returnData.scrollBarWidth =
                returnData.areaWidth * (returnData.areaWidth / returnData.scrollWidth);
            returnData.availablePositionSize = returnData.areaWidth - returnData.scrollBarWidth - 1;
            returnData.ratioScroll =
                this.contentArea.getBody().scrollLeft /
                (returnData.areaWidth - returnData.scrollBarWidth);
            returnData.position = returnData.availablePositionSize * returnData.ratioScroll;
            returnData.scrollPositionY = this.contentArea.getH() + this.contentArea.getY();
            if (returnData.scrollBarWidth >= returnData.areaWidth) {
                returnData.scrollBarWidth = returnData.areaWidth;
            }
        }
        return returnData;
    }

    private updateScrollPositionByScrollbar(): void {
        const scrollData = this.getScrollData();

        if (this.orientation === "vertical") {
            const recorrido = scrollData.scrollHeight - scrollData.areaHeight;
            const maxY = this.drag.maxY ? this.drag.maxY : 1;
            const ratio = (this.getY() - this.contentArea.getY(true)) / maxY;
            this.contentArea.getBody().scrollTop = recorrido * ratio;
        } else if (this.orientation === "horizontal") {
            const recorrido = scrollData.scrollWidth - scrollData.areaWidth;
            const maxX = this.drag.maxX ? this.drag.maxX : 1;
            const ratio = (this.getX() - this.contentArea.getX(true)) / maxX;
            this.contentArea.getBody().scrollLeft = recorrido * ratio;
        }
        this.run("scroll");
    }

    public render(): void {
        super.render();

        const scrollData = this.getScrollData();

        if (this.orientation === "vertical") {
            if (scrollData.areaHeight < scrollData.scrollHeight) {
                this.setVisible(true);
            } else {
                this.setVisible(false);
                return;
            }

            this.setX(this.contentArea.getX(true) + this.contentArea.getW() - SCROLL_SIZE - 1);
            this.setY(1 + this.contentArea.getY(true) + scrollData.position);
            this.setH(scrollData.scrollBarHeight);
            this.setW(SCROLL_SIZE);
            this.raisteTop();

            const minY = 1 + this.contentArea.getY(true);
            const maxY = this.contentArea.getY(true) + scrollData.availablePositionSize;

            this.drag.setMinY(minY);
            this.drag.setMaxY(maxY);

            if (this.getY() > maxY) {
                this.setY(maxY);
            }

            if (this.getY() < minY) {
                this.setY(minY);
            }
        } else if (this.orientation === "horizontal") {
            if (scrollData.areaWidth < scrollData.scrollWidth) {
                this.setVisible(true);
            } else {
                this.setVisible(false);
                return;
            }

            this.setX(1 + this.contentArea.getX(true) + scrollData.position);
            this.setY(this.contentArea.getY(true) + scrollData.scrollPositionY - SCROLL_SIZE - 1);
            this.setW(scrollData.scrollBarWidth);
            this.setH(SCROLL_SIZE);
            this.raisteTop();

            const minX = 1 + this.contentArea.getX(true);
            const maxX = this.contentArea.getX(true) + scrollData.availablePositionSize;

            this.drag.setMinX(minX);
            this.drag.setMaxX(maxX);

            if (this.getX() > maxX) {
                this.setX(maxX);
            }

            if (this.getX() < minX) {
                this.setX(minX);
            }
        }
    }
}
