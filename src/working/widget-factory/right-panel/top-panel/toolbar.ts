import { WidgetTypes } from "../../../../index";
import { Button, ButtonMenu, IconButton, Toolbar } from "../../../../ui";

export class mainToolbar extends Toolbar {
    btn1: Button;
    btn2: Button;
    btn4: IconButton;
    btn5: IconButton;

    btnSel: ButtonMenu;

    constructor() {
        super("mainToolbar");
        this.setOrientation("horizontal");
        this.setType(WidgetTypes.FILL);
        this.setFixedSize(45);

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

        this.btnSel = new ButtonMenu("btnSel");
        this.btnSel.setText("Menu");
        //this.btnSel.setW(200);
        this.btnSel.addItem("item1", "Item 1", "add");
        this.btnSel.addItem("item2", "Item 2", "list");
        this.btnSel.addItem("item3", "Item 3 pero este es el  ancho", "save");
        this.btnSel.addItem("item4", "Item 4", "draw");
        this.btnSel.addItem("item5", "Item 5", "list");
        this.btnSel.addItem("item6", "Item 6 tiene mas ancho", "save");

        this.addItem("btn1", this.btn1);
        this.addItem("btn5", this.btn5);
        this.addItem("btn2", this.btn2);
        this.addItem("btn4", this.btn4);
        this.addItem("btnSel", this.btnSel);
    }
}
