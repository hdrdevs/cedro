import { Toolbar, IconButton } from "../ui";
import { Application, WidgetAlignTypes, WidgetTypes } from "../index";

class WorkingApp extends Application {
    toolbar: Toolbar;

    btn1: IconButton;
    btn2: IconButton;
    btn3: IconButton;
    btn4: IconButton;
    btn5: IconButton;

    constructor() {
        super("Working App - Toolbar");
        this.getRoot().setAlign(WidgetAlignTypes.HORIZONTAL);

        this.toolbar = new Toolbar("toolbar", this.getRoot(), "vertical");
        this.toolbar.setType(WidgetTypes.FILL);
        this.toolbar.setFixedSize(40);

        this.btn1 = new IconButton("btn1", "add");
        this.btn1.setH(40);

        this.btn2 = new IconButton("btn2", "hourglass_top");
        this.btn2.setH(40);

        this.btn3 = new IconButton("btn3", "av_timer");
        this.btn3.setH(40);

        this.btn4 = new IconButton("btn4", "download");
        this.btn4.setH(40);

        this.btn5 = new IconButton("btn5", "delete");
        this.btn5.setH(40);

        this.toolbar.addItem("btn5", this.btn5);
        this.toolbar.addItem("btn4", this.btn4);
        this.toolbar.addItem("btn3", this.btn3);
        this.toolbar.addItem("btn2", this.btn2);
        this.toolbar.addItem("btn1", this.btn1);
    }

    init() {
        super.init();
        this.root.render();
        this.theme.setTheme("dark");
    }
}

export const workingApp = new WorkingApp();

workingApp.init();
