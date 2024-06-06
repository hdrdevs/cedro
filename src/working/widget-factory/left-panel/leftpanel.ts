//import { WidgetTypes } from "../../../index";
import { Tabs, Widget } from "../../../ui";

import homeTab from "./hometab";
import driversTab from "./driverstab";
import circuitsTab from "./circuitstab";

export class LeftPanel extends Tabs {
    constructor() {
        super("Tab.leftPanel", null, "vertical");

        this.addIconTab("tab1", "home", homeTab as Widget, true);
        this.addTab("tab2", "DRIVERS", driversTab as Widget);
        this.addTab("tab3", "CIRCUITS", circuitsTab as Widget, true);

        this.setTab("tab1");
    }
}
