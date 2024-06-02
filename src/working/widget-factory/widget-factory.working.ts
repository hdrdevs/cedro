import { Application, WidgetAlignTypes } from "../../index";
import { HPanel } from "../../ui";
import { header } from "./header/header";
import { LeftPanel } from "./left-panel/leftpanel";
import { RightPanel } from "./right-panel/rightpanel";

class WidgetFactory extends Application {
    hPanel: HPanel;
    leftPanel: LeftPanel;
    rightPanel: RightPanel;

    constructor() {
        super(".::cedro::. - Widget Factory");
        this.getRoot().setAlign(WidgetAlignTypes.VERTICAL);
        this.getRoot().setPadding(6);

        this.hPanel = new HPanel("hPanel");
        this.hPanel.setPadding(0);

        this.leftPanel = new LeftPanel();
        this.rightPanel = new RightPanel();

        this.hPanel.setLeft(this.leftPanel, 300);
        this.hPanel.setRight(this.rightPanel);

        this.getRoot().addChild(header);
        this.getRoot().addChild(this.hPanel);
    }

    init() {
        super.init();
        this.root.render();
        this.theme.setTheme("dark");
    }
}

export const widgetFactory = new WidgetFactory();

widgetFactory.init();
