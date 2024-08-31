import "./styles/tabs.css";

import { OrientationTypes } from "../types/orientation.type";
import { Widget } from "./widget.ui";
import { Toolbar } from "./toolbar.ui";
import { Label } from "./label.ui";
import { Icon } from "./Icon.ui";
import { Scroll } from "./scroll.ui";
import { createWidget } from "./widget.builder";
import { UID } from "../core/uid";
import { WidgetAlignTypes, WidgetProps, WidgetTypes } from "./widget.types";
import { normalizeWidget } from "./widget.normalize";

const TAB_HEADER_SIZE = 40;

export type TabItem = {
    title: string;
    content: Widget;
};

export class Tabs extends Widget {
    orientation: OrientationTypes;

    content: Widget;
    itemControls: Toolbar;

    items: Map<string, TabItem>;
    itemsScrollable: Map<string, boolean>;
    verticalScrollbar: Scroll | null;

    constructor(
        id: string,
        parent: Widget | null = null,
        orientation: OrientationTypes = "horizontal"
    ) {
        super(id, "div", parent);
        this.orientation = orientation;

        this.content = new Widget(id + ".content", "div");
        this.content.setType(WidgetTypes.FILL);

        this.setType(WidgetTypes.FILL);

        if (this.orientation === "horizontal") {
            this.setAlign(WidgetAlignTypes.VERTICAL);
            this.content.addClass("WUITabContainer-horizontal");
        } else {
            this.setAlign(WidgetAlignTypes.HORIZONTAL);
            this.content.addClass("WUITabContainer-vertical");
        }

        this.items = new Map<string, TabItem>();
        this.itemsScrollable = new Map<string, boolean>();
        this.verticalScrollbar = null;

        this.itemControls = new Toolbar(id + ".itemControls", null, orientation);
        this.itemControls.setVariant("contained");
        this.itemControls.setFixedSize(TAB_HEADER_SIZE);

        this.addChild(this.itemControls);
        this.addChild(this.content);

        this.addClass("WUITab");
    }

    public setOrientation(orientation: OrientationTypes) {
        if (this.orientation !== orientation) {
            this.content.deleteClass("WUITabContainer-" + this.orientation);
        }
        this.orientation = orientation;
        this.content.addClass("WUITabContainer-" + this.orientation);
    }

    public addTab(id: string, title: string, content: Widget, scrollable: boolean = false) {
        this.items.set(id, { title, content });
        this.itemsScrollable.set(id, scrollable);

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

    public addIconTab(id: string, icon: string, content: Widget, scrollable: boolean = false) {
        this.items.set(id, { title: icon, content });
        this.itemsScrollable.set(id, scrollable);

        const itemControl = new Icon(id + ".itemControl", icon);

        if (this.orientation === "horizontal") {
            itemControl.setH(TAB_HEADER_SIZE);
            itemControl.getBody().style.lineHeight = TAB_HEADER_SIZE + "px";
        } else if (this.orientation === "vertical") {
            itemControl.getBody().style.writingMode = "vertical-rl";
            itemControl.getBody().style.transform = "scale(-1,-1)";
            itemControl.getBody().style.paddingTop = "12px";
            itemControl.getBody().style.paddingBottom = "12px";
            itemControl.getBody().style.paddingRight = "10px";
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
                        if (ctrlTab instanceof Icon) {
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
                        if (ctrlTab instanceof Icon) {
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
            const scrollable = this.itemsScrollable.get(id);

            this.content.addChild(actualTab.content);

            if (scrollable) {
                if (this.verticalScrollbar == null) {
                    this.verticalScrollbar = new Scroll(
                        actualTab.content.id + ".verticalScrollbar",
                        this.content,
                        "vertical"
                    );
                }
            } else {
                if (this.verticalScrollbar) {
                    this.verticalScrollbar.free();
                    this.verticalScrollbar = null;
                }
            }
        }

        this.render();
    }

    public render(): void {
        super.render();
        if (this.verticalScrollbar) {
            this.verticalScrollbar.render();
        }
    }
}

export type TabItemType = "text" | "icon-tab";

export type WTabProps = Omit<WidgetProps, "orientation"> & {
    orientation?: OrientationTypes;
    selectedTab?: number | null;
    children: any;
};

export type WTabItemProps = {
    title?: string | null;
    icon?: string | null;
    type?: TabItemType | null;
    scrollable?: boolean | null;
    children: any;
};

export const WTab = (props: WTabProps) => {
    if (!props.id) {
        props.id = "Tabs." + UID();
    }
    return normalizeWidget(
        <div id={props.id} w-tab w-class={props.classNames} w-selected-tab={props.selectedTab}>
            {props.children}
        </div>,
        props
    );
};

export const WTabItem = (props: WTabItemProps) => {
    return (
        <div w-tab-item w-title={props.title} w-icon={props.icon} w-type={props.type}>
            {props.children}
        </div>
    );
};

export function createTab(id: string, content: any, parent: Widget | null = null): Tabs {
    const dataOrientation = content.getAttribute("w-orientation");
    const dataScrollable = content.getAttribute("w-scrollable") ? true : false;
    const dataSelectedTab = content.getAttribute("w-selected-tab");

    let orientation: OrientationTypes = dataOrientation ? dataOrientation : "horizontal";

    let newTab = new Tabs(id, parent, orientation);

    content.childNodes.forEach((tabItem: HTMLElement, index: number) => {
        if (tabItem.getAttribute("w-tab-item") !== null) {
            const tabTitle = tabItem.getAttribute("w-title");
            const tabIcon = tabItem.getAttribute("w-icon");
            const tabType = tabItem.getAttribute("w-type") || "text";

            if (!tabItem.firstChild) {
                throw new Error("Tab Item must have a content");
            }

            const widget = createWidget(tabItem.firstChild);

            if (widget !== null) {
                if (tabType === "text") {
                    newTab.addTab(
                        newTab.id + ".Item." + index,
                        tabTitle || "Untitled",
                        widget,
                        dataScrollable
                    );
                } else if (tabType === "icon-tab") {
                    newTab.addIconTab(
                        newTab.id + ".Item." + index,
                        tabIcon || "home",
                        widget,
                        dataScrollable
                    );
                }
            }
        }
    });

    if (dataSelectedTab !== null) {
        const selectedTab = parseInt(dataSelectedTab);
        if (selectedTab < newTab.items.size) {
            newTab.setTab(newTab.id + ".Item." + selectedTab);
        }
    } else {
        newTab.setTab(newTab.id + ".Item.0");
    }

    return newTab;
}
