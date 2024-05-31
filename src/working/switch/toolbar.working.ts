import {
    Toolbar,
    IconButton,
    Button,
    ButtonMenu,
    IconButtonMenu,
    ButtonColor,
    Textbox,
} from "../../ui";
import { WidgetTypes } from "../../index";

class FormToolbar extends Toolbar {
    btn1: Button;
    btn2: Button;

    btn4: IconButton;
    btn5: IconButton;

    btnSel: ButtonMenu;
    iconSel: IconButtonMenu;

    textColor: ButtonColor;
    textDate: Textbox;

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

        this.btnSel = new ButtonMenu("btnSel");
        this.btnSel.setText("Menu");
        //this.btnSel.setW(200);
        this.btnSel.addItem("item1", "Item 1", "add");
        this.btnSel.addItem("item2", "Item 2", "list");
        this.btnSel.addItem("item3", "Item 3 pero este es el  ancho", "save");
        this.btnSel.addItem("item4", "Item 4", "draw");
        this.btnSel.addItem("item5", "Item 5", "list");
        this.btnSel.addItem("item6", "Item 6 tiene mas ancho", "save");

        this.iconSel = new IconButtonMenu("iconSel", "folder_open");
        this.iconSel.setW(40);

        this.iconSel.addItem("item1", "Item 1", "add");
        this.iconSel.addItem("item2", "Item 2", "list");

        this.textColor = new ButtonColor("textColor");
        this.textColor.setW(45);

        this.textDate = new Textbox("textDate");
        this.textDate.setW(300);
        this.textDate.setInputType("number");
        this.textDate.getInput().getBody().setAttribute("step", "1");

        this.addItem("btn1", this.btn1);
        this.addItem("btn5", this.btn5);
        this.addItem("btn2", this.btn2);

        this.addItem("btn4", this.btn4);
        this.addItem("btnSel", this.btnSel);
        this.addItem("iconSel", this.iconSel);

        this.addItem("selColor", this.textColor);
        this.addItem("selDate", this.textDate);
    }
}

export const formToolbar = new FormToolbar();
