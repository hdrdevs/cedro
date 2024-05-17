import { OrientationTypes } from "src/types/orientation.type";
import "./styles/scroll.css";
import { Widget, WidgetTypes } from "./widget.ui";
import { Draggable } from "./draggable.ui";

const SCROLL_SIZE = 10;

export class Scroll extends Widget {
    contentArea: Widget;
    orientation: OrientationTypes;

    drag: Draggable;

    constructor(id: string, contentArea: Widget, orientation: OrientationTypes = "vertical") {
        super(id, "div", contentArea.getParent());

        this.contentArea = contentArea;
        this.orientation = orientation;

        this.setType(WidgetTypes.CUSTOM);

        this.getBody().style.overflow = "hidden";
        this.getBody().style.position = "absolute";

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
    }

    public render(): void {
        super.render();

        if (this.orientation === "vertical") {
            const scrollHeight = this.contentArea.getBody().scrollHeight;
            const areaHeight = this.contentArea.getH();
            let scrollBarHeight = areaHeight * (areaHeight / scrollHeight);

            if (scrollBarHeight >= areaHeight) {
                scrollBarHeight = areaHeight;
            }

            const availablePositionSize = areaHeight - scrollBarHeight - 1;
            const ratioScroll = this.contentArea.getBody().scrollTop / (areaHeight - scrollBarHeight);
            const position = availablePositionSize * ratioScroll;

            if (areaHeight < scrollHeight) {
                this.setVisible(true);
            } else {
                this.setVisible(false);
                return;
            }

            this.setX(this.contentArea.getW() - SCROLL_SIZE - 1);
            this.setY(1 + this.contentArea.getY() + position);
            this.setH(scrollBarHeight);
            this.setW(SCROLL_SIZE);
            this.raisteTop();

            this.drag.setMinY(1 + this.contentArea.getY());
            this.drag.setMaxY(this.contentArea.getY() + availablePositionSize);
        } else if (this.orientation === "horizontal") {
            const scrollWidth = this.contentArea.getBody().scrollWidth;
            const areaWidth = this.contentArea.getW();
            let scrollBarWidth = areaWidth * (areaWidth / scrollWidth);

            if (scrollBarWidth >= areaWidth) {
                scrollBarWidth = areaWidth;
            }

            const availablePositionSize = areaWidth - scrollBarWidth - 1;
            const ratioScroll = this.contentArea.getBody().scrollLeft / (areaWidth - scrollBarWidth);
            const position = availablePositionSize * ratioScroll;

            if (areaWidth < scrollWidth) {
                this.setVisible(true);
            } else {
                this.setVisible(false);
                return;
            }

            const scrollPositionY = this.contentArea.getH() + this.contentArea.getY();

            this.setX(1 + this.contentArea.getX() + position);
            this.setY(scrollPositionY - SCROLL_SIZE - 1);
            this.setW(scrollBarWidth);
            this.setH(SCROLL_SIZE);
            this.raisteTop();

            this.drag.setMinX(1 + this.contentArea.getX());
            this.drag.setMaxX(this.contentArea.getX() + availablePositionSize);
        }
    }
}
