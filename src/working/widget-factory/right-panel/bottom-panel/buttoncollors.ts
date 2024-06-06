import { WidgetAlignTypes, WidgetTypes, Widget, Label, ButtonColor } from "../../../../ui";

export class ColorButtonsForm extends Widget {
    btn1: ButtonColor;
    btn2: ButtonColor;
    btn3: ButtonColor;
    btn4: ButtonColor;

    constructor() {
        super("ButtonColorsForm");
        this.setType(WidgetTypes.FILL);
        this.setAlign(WidgetAlignTypes.VERTICAL);
        //this.setPadding(5);

        this.btn1 = new ButtonColor(this.id + ".btn1");
        this.btn1.setType(WidgetTypes.FILL);
        this.btn1.setValue("#90caf9");

        this.btn2 = new ButtonColor(this.id + ".btn2");
        this.btn2.setType(WidgetTypes.FILL);
        this.btn2.setValue("#42a5f5");

        this.btn3 = new ButtonColor(this.id + ".btn3");
        this.btn3.setType(WidgetTypes.FILL);
        this.btn3.setValue("#ce93d8");

        this.btn4 = new ButtonColor(this.id + ".btn4");
        this.btn4.setType(WidgetTypes.FILL);
        this.btn4.setValue("#ab47bc");

        this.addChild(this.btn1);
        this.addChild(this.btn2);
        this.addChild(this.btn3);
        this.addChild(this.btn4);
    }
}
