import "./styles/tabs.css";

import { OrientationTypes } from "src/types/orientation.type";
import { Widget, WidgetAlignTypes, WidgetTypes } from "./widget.ui";
import { Toolbar } from "./toolbar.ui";
import { Label } from "./label.ui";
import { IconButton } from "./IconButton.ui";

const TAB_HEADER_HEIGHT = 40;

export type TabItem = {
    title: string;
    content: Widget;
};

class TabControl extends Label {
    constructor(id: string, parent: Widget | null = null, text: string) {
        super(id, "span", parent);
        this.setText(text);
        this.addClass("WUITabControl");
        this.getBody().style.lineHeight = TAB_HEADER_HEIGHT + "px";
    }
}
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

        this.content = new Widget(id + ".content", "div");
        this.content.setType(WidgetTypes.FILL);
        this.content.addClass("WUITabContainer");

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

        const itemControl = new TabControl(id + ".itemControl", null, title);
        //itemControl.setW(100);
        itemControl.setH(TAB_HEADER_HEIGHT);

        itemControl.subscribe({
            event: "click",
            then: (_e, _w) => {
                this.setTab(id);
            },
        });

        this.itemControls.addItem(id, itemControl);
    }

    public addIconTab(id: string, icon: string, content: Widget) {
        this.items.set(id, { title: icon, content });

        const itemControl = new IconButton(id + ".itemControl", icon);
        itemControl.setW(40);
        itemControl.setH(TAB_HEADER_HEIGHT);

        itemControl.subscribe({
            event: "click",
            then: (_e, _w) => {
                this.setTab(id);
            },
        });

        this.itemControls.addItem(id, itemControl);
    }

    public setTab(id: string) {
        this.content.removeAllChilds();
        const actualTab = this.items.get(id);

        for (const itemId of this.items.keys()) {
            if (itemId != id) {
                this.items.get(itemId)?.content.setVisible(false);
                const ctrlTab = window.w.get(itemId + ".itemControl");
                if (ctrlTab) {
                    ctrlTab.deleteClass("WUITabControlActive");
                    ctrlTab.addClass("WUITabControl");
                }
            } else {
                const ctrlTab = window.w.get(itemId + ".itemControl");
                if (ctrlTab) {
                    ctrlTab.addClass("WUITabControlActive");
                }
            }
        }

        if (actualTab) {
            this.items.get(id)?.content.setVisible(true);
            this.content.addChild(actualTab.content);
        }

        this.render();
    }
}
