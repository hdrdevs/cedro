import { Button, Tabs } from "../../ui";
import { WidgetTypes } from "../../index";

class TabWidget extends Tabs {
    btn1: Button;
    btn2: Button;
    btn3: Button;

    constructor() {
        super("tab1", null, "horizontal");

        this.btn1 = new Button("btn1");
        this.btn1.setText("Nuevo");
        this.btn1.setType(WidgetTypes.FILL);

        this.btn2 = new Button("btn2");
        this.btn2.setText("Guardar");
        this.btn2.setType(WidgetTypes.FILL);

        this.btn3 = new Button("btn3");
        this.btn3.setText("TEST");
        this.btn3.setType(WidgetTypes.FILL);

        this.addTab("tab1", "PREFERENCIAS", this.btn1);
        this.addTab("tab2", "SEGURIDAD", this.btn2);
        this.addIconTab("tab3", "add", this.btn3);

        this.setTab("tab1");
    }
}

export const tabWidget = new TabWidget();
