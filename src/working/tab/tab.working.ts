import { Tabs } from "../../ui";
import { Application, WidgetAlignTypes } from "../../index";

class WorkingApp extends Application {
    tab: Tabs;

    constructor() {
        super("Working App - Tab Example");
        this.getRoot().setAlign(WidgetAlignTypes.VERTICAL);

        this.tab = new Tabs("tab1");

        this.getRoot().addChild(this.tab);
    }

    init() {
        super.init();
        this.root.render();
        this.theme.setTheme("dark");
    }
}

export const workingApp = new WorkingApp();

workingApp.init();
