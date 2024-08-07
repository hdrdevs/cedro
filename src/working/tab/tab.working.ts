import { Button, Tabs } from "../../ui";
import { Application, WidgetAlignTypes, WidgetTypes } from "../../index";

class WorkingApp extends Application {
    tab: Tabs;

    btn1: Button;
    btn2: Button;
    btn3: Button;

    constructor() {
        super("Working App - Tab Example");
        this.getRoot().setAlign(WidgetAlignTypes.VERTICAL);

        this.tab = new Tabs("tab1", null, "vertical");

        this.btn1 = new Button("btn1");
        this.btn1.setText("Nuevo");
        this.btn1.setType(WidgetTypes.FILL);

        this.btn2 = new Button("btn2");
        this.btn2.setText("Guardar");
        this.btn2.setType(WidgetTypes.FILL);

        this.btn3 = new Button("btn3");
        this.btn3.setText("TEST");
        this.btn3.setType(WidgetTypes.FILL);

        this.tab.addTab("tab1", "PREFERENCIAS", this.btn1);
        this.tab.addTab("tab2", "SEGURIDAD", this.btn2);
        this.tab.addIconTab("tab3", "add", this.btn3);

        this.tab.setTab("tab1");

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
