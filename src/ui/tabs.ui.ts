import "./styles/tabs.css";

import { OrientationTypes } from "src/types/orientation.type";
import { Widget, WidgetAlignTypes, WidgetTypes } from "./widget.ui";
import { Toolbar } from "./toolbar.ui";
import { Label } from "./label.ui";
import { IconButton } from "./IconButton.ui";

const TAB_HEADER_SIZE = 40;

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
        this.header.setFixedSize(TAB_HEADER_SIZE);

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

        this.itemControls = new Toolbar(id + ".itemControls", this.header, orientation);
    }

    public setOrientation(orientation: OrientationTypes) {
        this.orientation = orientation;
    }

    public addTab(id: string, title: string, content: Widget) {
        this.items.set(id, { title, content });

        const itemControl = new Label(id + ".itemControl", "span");

        itemControl.setText(title);
        itemControl.addClass("WUITabControl");

        if (this.orientation === "horizontal") {
            itemControl.setH(TAB_HEADER_SIZE);
            itemControl.getBody().style.lineHeight = TAB_HEADER_SIZE + "px";
        } else if (this.orientation === "vertical") {
            itemControl.getBody().style.writingMode = "vertical-rl";
            itemControl.getBody().style.transform = "scale(-1,-1)";
            itemControl.getBody().style.paddingTop = "15px";
            itemControl.getBody().style.paddingBottom = "15px";
            itemControl.getBody().style.paddingRight = "12px";
            itemControl.setW(TAB_HEADER_SIZE);
        }

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
        itemControl.setH(TAB_HEADER_SIZE);

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
                    if (this.orientation === "horizontal") {
                        ctrlTab.deleteClass("WUITabControlActive");
                        ctrlTab.addClass("WUITabControl");
                    } else if (this.orientation === "vertical") {
                        if (ctrlTab instanceof IconButton) {
                            ctrlTab.deleteClass("WUITabControlActiveIcon_VL");
                        } else if (ctrlTab instanceof Label) {
                            ctrlTab.deleteClass("WUITabControlActive_VL");
                        }
                        ctrlTab.addClass("WUITabControl");
                    }
                }
            } else {
                const ctrlTab = window.w.get(itemId + ".itemControl");
                if (ctrlTab) {
                    if (this.orientation === "horizontal") {
                        ctrlTab.addClass("WUITabControlActive");
                    } else if (this.orientation === "vertical") {
                        if (ctrlTab instanceof IconButton) {
                            ctrlTab.addClass("WUITabControlActiveIcon_VL");
                        } else if (ctrlTab instanceof Label) {
                            ctrlTab.addClass("WUITabControlActive_VL");
                        }
                    }
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
