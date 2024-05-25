import { Checkbox, Switch } from "../../ui";
import { Application, WidgetAlignTypes, WidgetTypes } from "../../index";

class WorkingApp extends Application {
    switch1: Switch;
    switch2: Switch;
    switch3: Switch;
    //check1: Checkbox;
    //check2: Checkbox;

    constructor() {
        super("Working App - Tab Example");
        this.getRoot().setAlign(WidgetAlignTypes.VERTICAL);

        this.switch1 = new Switch("switch1", "Iniciar con la aplicacion", null);
        this.switch2 = new Switch("switch2", "Aplicar el modo oscuro cuando sea posible", null);
        this.switch3 = new Switch("switch3", "Otro Switch", null);

        this.switch1.setType(WidgetTypes.FILL);
        this.switch2.setType(WidgetTypes.FILL);
        this.switch3.setType(WidgetTypes.FILL);

        this.switch1.setFixedSize(40);
        this.switch2.setFixedSize(40);
        this.switch3.setFixedSize(40);

        this.switch2.getBody().style.textTransform = "initial";

        //this.check1 = new Checkbox("chk1", null);
        //this.check2 = new Checkbox("chk2", null);

        this.getRoot().addChild(this.switch1);
        this.getRoot().addChild(this.switch2);
        this.getRoot().addChild(this.switch3);

        //this.getRoot().addChild(this.check1);
        //this.getRoot().addChild(this.check2);
    }

    init() {
        super.init();
        this.root.render();
        this.theme.setTheme("dark");
    }
}

export const workingApp = new WorkingApp();

workingApp.init();
