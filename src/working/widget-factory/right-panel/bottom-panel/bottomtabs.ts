//import { WidgetTypes } from "../../../index";
import { Tabs, Widget } from "../../../../ui";
import { BarsForm } from "./bars";
import { ButtonsForm } from "./buttons";
import { TextBoxesForm } from "./textboxes";

export class BottomTabs extends Tabs {
    constructor() {
        super("Tab.Botttom", null);

        this.addTab(this.id + "tab1", "Text Boxes", new TextBoxesForm());
        this.addTab(this.id + "tab2", "Bars", new BarsForm());
        this.addTab(this.id + "tab3", "Buttons", new ButtonsForm());

        this.setTab(this.id + "tab1");
    }
}
