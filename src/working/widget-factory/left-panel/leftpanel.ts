//import { WidgetTypes } from "../../../index";
import { Tabs, Widget } from "../../../ui";

export class LeftPanel extends Tabs {
    constructor() {
        super("Tab.leftPanel", null, "vertical");

        this.addIconTab("tab1", "home", new Widget("tab1w"));
        this.addTab("tab2", "DRIVERS", new Widget("tab2w"));
        this.addTab("tab3", "GARAGES", new Widget("tab3w"));

        this.setTab("tab1");
    }
}
