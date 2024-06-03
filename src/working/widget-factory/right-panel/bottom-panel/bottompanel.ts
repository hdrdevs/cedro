import { WidgetAlignTypes, WidgetTypes } from "../../../../index";
import { Widget } from "../../../../ui";
import { BottomAccordion } from "./accordion";
import { BottomTabs } from "./bottomtabs";

export class BottomPanel extends Widget {
    tabs: BottomTabs;
    accordion: BottomAccordion;
    constructor() {
        super("BottomPanel");
        this.setAlign(WidgetAlignTypes.HORIZONTAL);
        this.setType(WidgetTypes.FILL);

        this.tabs = new BottomTabs();
        this.accordion = new BottomAccordion();

        this.addChild(this.tabs);
        this.addChild(this.accordion);
    }
}
