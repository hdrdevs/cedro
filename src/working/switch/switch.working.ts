import { Switch } from "../../ui";
import { Application, WidgetAlignTypes } from "../../index";

class WorkingApp extends Application {
    switch1: Switch;
    switch2: Switch;

    constructor() {
        super("Working App - Tab Example");
        this.getRoot().setAlign(WidgetAlignTypes.VERTICAL);

        this.switch1 = new Switch("switch1", null);
        this.switch2 = new Switch("switch2", null);

        this.getRoot().addChild(this.switch1);
        this.getRoot().addChild(this.switch2);
    }

    init() {
        super.init();
        this.root.render();
        this.theme.setTheme("dark");
    }
}

export const workingApp = new WorkingApp();

workingApp.init();
