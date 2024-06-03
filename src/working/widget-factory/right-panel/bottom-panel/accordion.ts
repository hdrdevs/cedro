import { Widget, WidgetTypes } from "../../../../index";
import { Accordion } from "../../../../ui";

export class BottomAccordion extends Accordion {
    constructor() {
        super("Botttom.Stack");
        this.setType(WidgetTypes.FILL);

        this.addItem("Important Data", "list", new Widget(this.id + "w1"));
        this.addItem("Another Data", "list", new Widget(this.id + "w2"));
    }
}
