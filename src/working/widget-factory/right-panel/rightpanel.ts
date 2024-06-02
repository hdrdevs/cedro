//import { WidgetTypes } from "../../../index";
import { VPanel } from "../../../ui";
import { TopPanel } from "./top-panel/toppanel";

export class RightPanel extends VPanel {
    topPanel: TopPanel;
    constructor() {
        super("rightPanel");
        this.setPadding(0);

        this.topPanel = new TopPanel();

        this.setTop(this.topPanel, 300);
        //this.setBottom(bottomPabel);
    }
}
