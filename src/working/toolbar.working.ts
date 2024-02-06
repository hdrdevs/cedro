import { Button } from "../ui/button.ui";
import { Application, WidgetAlignTypes, WidgetTypes } from "../index";
import { Toolbar } from "../ui/toolbar.ui";

class WorkingApp extends Application {
    button1: Button;
    button2: Button;
    button3: Button;
    toolbar: Toolbar;

    constructor() {
        super("Working App - Toolbar");
        this.getRoot().setAlign(WidgetAlignTypes.VERTICAL);

        this.button1 = new Button("button1", null);
        this.button1.setText("Button 1");
        this.button1.setType(WidgetTypes.FILL);
        this.button1.setVariant("contained");
        this.button1.setColor("success");

        this.button2 = new Button("button2", null);
        this.button2.setText("Button 2");
        this.button2.setType(WidgetTypes.FILL);
        this.button2.setVariant("contained");

        this.button3 = new Button("button3", null);
        this.button3.setText("Button 3");
        this.button3.setType(WidgetTypes.FILL);
        this.button3.setVariant("contained");

        this.toolbar = new Toolbar("toolbar", null);
        this.toolbar.setType(WidgetTypes.FILL);
        this.toolbar.setAlign(WidgetAlignTypes.HORIZONTAL);
        this.toolbar.setFixedSize(80);
        this.toolbar.setPadding(4);

        this.toolbar.addItem("button1", this.button1);
        this.toolbar.addItem("button2", this.button2);
        this.toolbar.addItem("button3", this.button3);

        this.getRoot().attachWidget(this.toolbar);
    }

    init() {
        super.init();
        this.root.render();
    }
}

export const workingApp = new WorkingApp();

workingApp.init();
