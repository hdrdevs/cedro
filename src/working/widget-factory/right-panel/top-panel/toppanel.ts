import { WidgetAlignTypes, WidgetTypes } from "../../../../index";
import { Toolbar, Widget } from "../../../../ui";
import { mainToolbar } from "./toolbar";

export class TopPanel extends Widget {
    toolbar: Toolbar;

    constructor() {
        super("topPanel");
        this.setType(WidgetTypes.FILL);
        this.setAlign(WidgetAlignTypes.VERTICAL);

        this.toolbar = new mainToolbar();

        this.addChild(this.toolbar);
    }
}
