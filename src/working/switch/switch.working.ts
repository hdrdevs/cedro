import {
    Accordion,
    Button,
    ButtonStack,
    Checkbox,
    IconButton,
    Label,
    ProgressBar,
    RadioButton,
    Switch,
    ValueBar,
} from "../../ui";
import { Application, Widget, WidgetAlignTypes, WidgetTypes } from "../../index";

class WorkingApp extends Application {
    switch1: Switch;
    switch2: Switch;
    switch3: Switch;
    check1: Checkbox;
    check2: Checkbox;
    radio1: RadioButton;
    radio2: RadioButton;

    progress1: ProgressBar;
    progress2: ProgressBar;

    valuebar1: ValueBar;
    valuebar2: ValueBar;
    valuebar3: ValueBar;

    valuebar4: ValueBar;
    valuebar5: ValueBar;
    valuebar6: ValueBar;

    verticalContainer: Widget;

    buttonStack: ButtonStack;
    buttonPage1: Button;
    buttonPage2: Button;
    buttonPage3: Button;
    buttonPage4: IconButton;

    verticalStack: ButtonStack;
    vButon1: Button;
    vButon2: Button;
    vButon3: Button;
    vButon4: IconButton;

    acordion: Accordion;
    itemAcordion: Label;
    itemAcordion2: Label;

    constructor() {
        super("Working App - Tab Example");
        this.getRoot().setAlign(WidgetAlignTypes.VERTICAL);
        this.getRoot().setPadding(4);

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

        this.check1 = new Checkbox("chk1", "Habilitar", null);
        this.check2 = new Checkbox("chk2", "Deshabilitar", null);

        this.check1.setType(WidgetTypes.FILL);
        this.check2.setType(WidgetTypes.FILL);

        this.check1.setFixedSize(40);
        this.check2.setFixedSize(40);

        this.radio1 = new RadioButton("rad1", "radio button 1", null);
        this.radio2 = new RadioButton("rad2", "este es otre opcione", null);

        this.radio1.setType(WidgetTypes.FILL);
        this.radio2.setType(WidgetTypes.FILL);

        this.radio1.setFixedSize(40);
        this.radio2.setFixedSize(40);

        this.progress1 = new ProgressBar("progress1", null);
        this.progress1.setType(WidgetTypes.FILL);
        this.progress1.setValue(75);
        this.progress1.setFixedSize(30);

        this.progress2 = new ProgressBar("progress2", null);
        this.progress2.setType(WidgetTypes.FILL);
        this.progress2.setValue(40);
        this.progress2.setFixedSize(30);
        this.progress2.setPaddingBar(4);
        this.progress2.hideLabel();

        this.valuebar1 = new ValueBar("valuebar1", "horizontal", null);
        this.valuebar1.setType(WidgetTypes.FILL);
        this.valuebar1.setFixedSize(35);
        this.valuebar1.setValue(50);

        this.valuebar2 = new ValueBar("valuebar2", "horizontal", null);
        this.valuebar2.setType(WidgetTypes.FILL);
        this.valuebar2.setFixedSize(35);
        this.valuebar2.setValue(75);

        this.valuebar3 = new ValueBar("valuebar3", "horizontal", null);
        this.valuebar3.setType(WidgetTypes.FILL);
        this.valuebar3.setFixedSize(35);
        this.valuebar3.setValue(25);

        this.verticalContainer = new Widget("verticalContainer", "div");
        this.verticalContainer.setType(WidgetTypes.FILL);
        this.verticalContainer.setAlign(WidgetAlignTypes.HORIZONTAL);
        this.verticalContainer.setPadding(4);

        this.valuebar4 = new ValueBar("valuebar4", "vertical", null);
        this.valuebar4.setType(WidgetTypes.FILL);
        this.valuebar4.setFixedSize(35);
        this.valuebar4.setValue(50);

        this.valuebar5 = new ValueBar("valuebar5", "vertical", null);
        this.valuebar5.setType(WidgetTypes.FILL);
        this.valuebar5.setFixedSize(35);
        this.valuebar5.setValue(75);

        this.valuebar6 = new ValueBar("valuebar6", "vertical", null);
        this.valuebar6.setType(WidgetTypes.FILL);
        this.valuebar6.setFixedSize(35);
        this.valuebar6.setValue(25);

        this.verticalContainer.addChild(this.valuebar4);
        this.verticalContainer.addChild(this.valuebar5);
        this.verticalContainer.addChild(this.valuebar6);

        this.buttonStack = new ButtonStack("buttonStack", "horizontal", null);
        this.buttonStack.setType(WidgetTypes.FILL);
        this.buttonStack.setFixedSize(35);

        this.buttonPage1 = new Button("buttonPage1", null);
        this.buttonPage1.setText("Page 1");

        this.buttonPage2 = new Button("buttonPage2", null);
        this.buttonPage2.setText("Page 2");

        this.buttonPage3 = new Button("buttonPage3", null);
        this.buttonPage3.setText("Page 3");

        this.buttonPage4 = new IconButton("buttonPage4", "add", null);

        this.buttonStack.addButton(this.buttonPage1);
        this.buttonStack.addButton(this.buttonPage4);
        this.buttonStack.addButton(this.buttonPage2);
        this.buttonStack.addButton(this.buttonPage3);

        this.buttonStack.setActive(this.buttonPage2.id);

        /********** */

        this.verticalStack = new ButtonStack("verticalStack", "vertical", null);
        this.verticalStack.setType(WidgetTypes.FILL);
        this.verticalStack.setFixedSize(150);

        this.vButon1 = new Button("vb1", null);
        this.vButon1.setText("Page 1");

        this.vButon2 = new Button("vb2", null);
        this.vButon2.setText("Page 2");

        this.vButon3 = new Button("vb3", null);
        this.vButon3.setText("Page 3");

        this.vButon4 = new IconButton("vb4", "add", null);

        this.verticalStack.addButton(this.vButon1);
        this.verticalStack.addButton(this.vButon2);
        this.verticalStack.addButton(this.vButon3);
        this.verticalStack.addButton(this.vButon4);

        this.verticalStack.setActive(this.vButon2.id);

        this.verticalContainer.addChild(this.verticalStack);

        /********** */

        this.acordion = new Accordion("accordion", null);
        this.acordion.setType(WidgetTypes.FILL);

        this.itemAcordion = new Label("itemAcordion", "span", null);
        this.itemAcordion.setText("Item 1");

        this.itemAcordion2 = new Label("itemAcordion2", "span", null);
        this.itemAcordion2.setText("Item 2");

        this.acordion.addItem("Lista de Objetos", "list", this.itemAcordion);
        this.acordion.addItem("Capas", "add", this.itemAcordion2);

        this.verticalContainer.addChild(this.acordion);

        /********** */
        this.getRoot().addChild(this.switch1);

        this.getRoot().addChild(this.buttonStack);

        this.getRoot().addChild(this.switch2);
        this.getRoot().addChild(this.switch3);

        this.getRoot().addChild(this.check1);
        this.getRoot().addChild(this.check2);

        this.getRoot().addChild(this.valuebar1);
        this.getRoot().addChild(this.valuebar2);
        this.getRoot().addChild(this.valuebar3);

        this.getRoot().addChild(this.radio1);

        this.getRoot().addChild(this.progress1);
        this.getRoot().addChild(this.radio2);
        this.getRoot().addChild(this.progress2);

        this.getRoot().addChild(this.verticalContainer);
    }

    init() {
        super.init();
        this.root.render();
        this.theme.setTheme("light");
    }
}

export const workingApp = new WorkingApp();

workingApp.init();
