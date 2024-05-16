import "./styles/scroll.css";
import { Widget, WidgetTypes } from "./widget.ui";

const SCROLL_SIZE = 10;

export class Scroll extends Widget {
    contentArea: Widget;
    constructor(id: string, contentArea: Widget) {
        super(id, "div", contentArea.getParent());

        this.contentArea = contentArea;

        this.setType(WidgetTypes.CUSTOM);

        this.getBody().style.overflow = "hidden";
        this.getBody().style.position = "absolute";

        this.addClass("WUIScrollbar");

        this.setX(contentArea.getW() - SCROLL_SIZE);
        this.setY(1);
        this.setW(SCROLL_SIZE);
        this.setH(contentArea.getH());
    }

    public render(): void {
        super.render();

        const scrollHeight = this.contentArea.getBody().scrollHeight;
        const areaHeight = this.contentArea.getH();
        let scrollBarHeight = areaHeight * (areaHeight / scrollHeight);

        if (scrollBarHeight >= areaHeight) {
            scrollBarHeight = areaHeight;
        }

        const availablePositionSize = areaHeight - scrollBarHeight - 1;
        const ratioScroll = this.contentArea.getBody().scrollTop / scrollHeight;
        const position = availablePositionSize * ratioScroll;

        this.setX(this.contentArea.getW() - SCROLL_SIZE - 1);
        this.setY(1 + this.contentArea.getY() + position);
        this.setH(scrollBarHeight);
        this.raisteTop();
    }
}
