//import { WidgetTypes } from "../../../index";
import { Tabs, Widget } from "../../../ui";

export class LeftPanel extends Tabs {
    constructor() {
        super("Tab.leftPanel", null, "vertical");

        this.addTab("tab1", "PREFERENCIAS", new Widget("tab1w"));
        this.addTab("tab2", "SEGURIDAD", new Widget("tab2w"));
        this.addIconTab("tab3", "add", new Widget("tab3w"));

        this.setTab("tab1");
    }
}
