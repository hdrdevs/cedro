//import { WidgetTypes } from "../../../index";
import { Tabs, Widget } from "../../../../ui";

export class BottomTabs extends Tabs {
    constructor() {
        super("Tab.Botttom", null);

        this.addTab(this.id + "tab1", "Text Boxes", new Widget("btab1w"));
        this.addTab(this.id + "tab2", "Bars", new Widget("btab2w"));
        this.addTab(this.id + "tab3", "Buttons", new Widget("btab3w"));

        this.setTab(this.id + "tab1");
    }
}
