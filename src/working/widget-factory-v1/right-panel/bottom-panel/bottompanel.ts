import { WidgetAlignTypes, WidgetTypes } from "../../../../index";
import { HPanel } from "../../../../ui";
import { BottomAccordion } from "./accordion";
import { BottomTabs } from "./bottomtabs";

export class BottomPanel extends HPanel {
    tabs: BottomTabs;
    accordion: BottomAccordion;
    constructor() {
        super("BottomPanel");
        this.setAlign(WidgetAlignTypes.HORIZONTAL);
        this.setType(WidgetTypes.FILL);

        this.tabs = new BottomTabs();
        this.accordion = new BottomAccordion();

        this.setLeft(this.tabs, 500);
        this.setRight(this.accordion);
    }
}
