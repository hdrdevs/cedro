import { Toolbar, IconButton, Button, Select } from "../../ui";
import { Application, WidgetAlignTypes, WidgetTypes } from "../../index";

class WorkingApp extends Application {
    toolbar: Toolbar;

    btn1: Button;
    btn2: Button;
    btn3: Select;
    btn4: IconButton;
    btn5: IconButton;

    constructor() {
        super("Working App - Toolbar");
        this.getRoot().setAlign(WidgetAlignTypes.VERTICAL);

        this.toolbar = new Toolbar("toolbar", this.getRoot());
        this.toolbar.setOrientation("horizontal");
        this.toolbar.setType(WidgetTypes.FILL);
        this.toolbar.setFixedSize(40);

        this.btn1 = new Button("btn1");
        this.btn1.setText("Nuevo");
        this.btn1.setW(100);

        this.btn2 = new Button("btn2");
        this.btn2.setText("Guardar");
        this.btn2.setW(120);

        this.btn3 = new Select("btn3");
        this.btn3.setW(200);
        this.btn3.addItem("item1", "Item 1", "");
        this.btn3.addItem("item2", "Item 2", "");
        this.btn3.addItem("item3", "Item 3", "add");
        this.btn3.addItem("item4", "Item 4", "");

        this.btn4 = new IconButton("btn4", "add");
        this.btn4.setW(40);

        this.btn5 = new IconButton("btn5", "delete");
        this.btn5.setW(40);

        this.toolbar.addItem("btn1", this.btn1);
        this.toolbar.addItem("btn5", this.btn5);
        this.toolbar.addItem("btn2", this.btn2);
        this.toolbar.addItem("btn3", this.btn3);
        this.toolbar.addItem("btn4", this.btn4);
    }

    init() {
        super.init();
        this.root.render();
        this.theme.setTheme("dark");
    }
}

export const workingApp = new WorkingApp();

workingApp.init();
