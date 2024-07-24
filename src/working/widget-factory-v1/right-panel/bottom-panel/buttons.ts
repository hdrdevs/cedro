import { WidgetAlignTypes, WidgetTypes, Widget, Button } from "../../../../ui";

export class ButtonsForm extends Widget {
    column1: Widget;
    column2: Widget;

    btn1: Button;
    btn2: Button;
    btn3: Button;

    btn4: Button;
    btn5: Button;
    btn6: Button;

    constructor() {
        super("TextBoxesForm");
        this.setType(WidgetTypes.FILL);
        this.setAlign(WidgetAlignTypes.HORIZONTAL);
        this.setPadding(12);

        this.column1 = new Widget("column1");
        this.column1.setType(WidgetTypes.FILL);
        this.column1.setAlign(WidgetAlignTypes.VERTICAL);
        this.column1.setPadding(12);

        this.column2 = new Widget("column2");
        this.column2.setType(WidgetTypes.FILL);
        this.column2.setAlign(WidgetAlignTypes.VERTICAL);
        this.column2.setPadding(12);

        this.btn1 = new Button("btn1");
        this.btn1.setText("Button 1");
        this.btn1.setVariant("text");
        this.btn1.setType(WidgetTypes.FILL);
        this.btn1.setFixedSize(40);

        this.btn2 = new Button("btn2");
        this.btn2.setText("Button 2");
        this.btn2.setVariant("outlined");
        this.btn2.setType(WidgetTypes.FILL);
        this.btn2.setFixedSize(40);

        this.btn3 = new Button("btn3");
        this.btn3.setText("Button 3");
        this.btn3.setVariant("contained");
        this.btn3.setType(WidgetTypes.FILL);
        this.btn3.setFixedSize(40);

        this.btn4 = new Button("btn4");
        this.btn4.setText("Button 4");
        this.btn4.setVariant("contained");
        this.btn4.setColor("success");
        this.btn4.setType(WidgetTypes.FILL);
        this.btn4.setFixedSize(40);

        this.btn5 = new Button("btn5");
        this.btn5.setText("Button 5");
        this.btn5.setVariant("contained");
        this.btn5.setColor("error");
        this.btn5.setType(WidgetTypes.FILL);
        this.btn5.setFixedSize(40);

        this.btn6 = new Button("btn5");
        this.btn6.setText("Button 6");
        this.btn6.setVariant("contained");
        this.btn6.setColor("warning");
        this.btn6.setType(WidgetTypes.FILL);
        this.btn6.setFixedSize(40);

        this.column1.addChild(this.btn1);
        this.column1.addChild(this.btn2);
        this.column1.addChild(this.btn3);

        this.column2.addChild(this.btn4);
        this.column2.addChild(this.btn5);
        this.column2.addChild(this.btn6);

        this.addChild(this.column1);
        this.addChild(this.column2);
    }
}
