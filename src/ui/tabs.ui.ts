import { OrientationTypes } from "src/types/orientation.type";
import { Widget, WidgetAlignTypes, WidgetTypes } from "./widget.ui";
import { Toolbar } from "./toolbar.ui";

const TAB_HEADER_HEIGHT = 40;

export type TabItem = {
    title: string;
    content: Widget;
};

export class Tabs extends Widget {
    orientation: OrientationTypes;

    header: Widget;
    content: Widget;

    itemControls: Toolbar;

    items: Map<string, TabItem>;

    constructor(
        id: string,
        parent: Widget | null = null,
        orientation: OrientationTypes = "horizontal"
    ) {
        super(id, "div", parent);
        this.orientation = orientation;

        this.header = new Widget(id + ".header", "div");
        this.header.setType(WidgetTypes.FILL);
        this.header.setFixedSize(TAB_HEADER_HEIGHT);
        this.header.getBody().style.backgroundColor = "#ff9900";

        this.content = new Widget(id + ".content", "div");
        this.content.setType(WidgetTypes.FILL);
        this.content.getBody().style.backgroundColor = "red";

        this.setType(WidgetTypes.FILL);

        if (this.orientation === "horizontal") {
            this.setAlign(WidgetAlignTypes.VERTICAL);
        } else {
            this.setAlign(WidgetAlignTypes.HORIZONTAL);
        }

        this.addChild(this.header);
        this.addChild(this.content);

        this.items = new Map<string, TabItem>();

        this.itemControls = new Toolbar(id + ".itemControls", this.header);
    }

    public setOrientation(orientation: OrientationTypes) {
        this.orientation = orientation;
    }

    public addTab(id: string, title: string, content: Widget) {
        this.items.set(id, { title, content });
    }

    public setTab(id: string) {
        for (const item of this.items.values()) {
            item.content.setVisible(false);
        }
        this.items.get(id)?.content.setVisible(true);
    }
}
