//import { WidgetTypes } from "../../../index";
import { VPanel } from "../../../ui";
import { BottomPanel } from "./bottom-panel/bottompanel";
import { TopPanel } from "./top-panel/toppanel";

export class RightPanel extends VPanel {
    topPanel: TopPanel;
    bottomPanel: BottomPanel;
    constructor() {
        super("rightPanel");
        this.setPadding(0);

        this.topPanel = new TopPanel();
        this.bottomPanel = new BottomPanel();

        this.setTop(this.topPanel, 300);
        this.setBottom(this.bottomPanel);
    }
}
