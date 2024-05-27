import { Toolbar, IconButton, Button, Select } from "../../ui";
import { WidgetTypes } from "../../index";

class FormToolbar extends Toolbar {
    btn1: Button;
    btn2: Button;

    btn4: IconButton;
    btn5: IconButton;

    constructor() {
        super("toolbar");
        //this.setFixedSize(40);
        //this.setAlign(WidgetAlignTypes.HORIZONTAL);

        this.setOrientation("horizontal");
        this.setType(WidgetTypes.FILL);

        this.btn1 = new Button("btn1");
        this.btn1.setText("Nuevo");
        this.btn1.setW(100);

        this.btn2 = new Button("btn2");
        this.btn2.setText("Guardar");
        this.btn2.setW(120);

        this.btn4 = new IconButton("btn4", "add");
        this.btn4.setW(40);

        this.btn5 = new IconButton("btn5", "delete");
        this.btn5.setW(40);

        this.addItem("btn1", this.btn1);
        this.addItem("btn5", this.btn5);
        this.addItem("btn2", this.btn2);

        this.addItem("btn4", this.btn4);
    }
}

export const formToolbar = new FormToolbar();
