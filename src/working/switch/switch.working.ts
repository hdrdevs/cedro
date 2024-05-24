import { Checkbox, Switch } from "../../ui";
import { Application, WidgetAlignTypes } from "../../index";

class WorkingApp extends Application {
    switch1: Switch;
    switch2: Switch;
    check1: Checkbox;
    check2: Checkbox;

    constructor() {
        super("Working App - Tab Example");
        this.getRoot().setAlign(WidgetAlignTypes.VERTICAL);

        this.switch1 = new Switch("switch1", null);
        this.switch2 = new Switch("switch2", null);

        this.check1 = new Checkbox("chk1", null);
        this.check2 = new Checkbox("chk2", null);

        this.getRoot().addChild(this.switch1);
        this.getRoot().addChild(this.switch2);

        this.getRoot().addChild(this.check1);
        this.getRoot().addChild(this.check2);
    }

    init() {
        super.init();
        this.root.render();
        this.theme.setTheme("dark");
    }
}

export const workingApp = new WorkingApp();

workingApp.init();
