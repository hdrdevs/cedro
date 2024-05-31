import { Button, Tabs, TextArea } from "../../ui";
import { WidgetTypes } from "../../index";

class TabWidget extends Tabs {
    btn1: Button;
    btn2: Button;
    text: TextArea;

    constructor() {
        super("tab1", null, "horizontal");

        this.btn1 = new Button("btn1");
        this.btn1.setText("Nuevo");
        this.btn1.setType(WidgetTypes.FILL);

        this.btn2 = new Button("btn2");
        this.btn2.setText("Guardar");
        this.btn2.setType(WidgetTypes.FILL);

        this.text = new TextArea("btn3");
        this.text.setType(WidgetTypes.FILL);
        this.text.setText("esto es un texto para testear el area de texto.");

        this.addTab("tab1", "PREFERENCIAS", this.btn1);
        this.addTab("tab2", "SEGURIDAD", this.btn2);
        this.addIconTab("tab3", "add", this.text);

        this.setTab("tab1");
    }
}

export const tabWidget = new TabWidget();
