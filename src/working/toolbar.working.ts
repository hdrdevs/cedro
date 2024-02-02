import { Application, WidgetAlignTypes, WidgetTypes } from "../index";
import { Toolbar } from "../ui/toolbar.ui";

class WorkingApp extends Application {
    toolbar: Toolbar;

    constructor() {
        super("Working App - Toolbar");
        this.getRoot().setAlign(WidgetAlignTypes.VERTICAL);

        this.toolbar = new Toolbar("toolbar", this.getRoot());
        this.toolbar.setType(WidgetTypes.FILL);
    }

    init() {
        super.init();
        this.root.render();
    }
}

export const workingApp = new WorkingApp();

workingApp.init();
