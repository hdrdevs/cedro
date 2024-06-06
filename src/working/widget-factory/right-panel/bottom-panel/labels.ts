import { WidgetAlignTypes, WidgetTypes, Widget, Label } from "../../../../ui";

export class LabelsForm extends Widget {
    label1: Label;
    label2: Label;
    label3: Label;
    label4: Label;

    constructor() {
        super("LabelsForm");
        this.setType(WidgetTypes.FILL);
        this.setAlign(WidgetAlignTypes.VERTICAL);
        //this.setPadding(5);

        this.label1 = new Label(this.id + "label1", "h1");
        this.label1.setText("Label 1");
        this.label1.setType(WidgetTypes.FILL);

        this.label2 = new Label(this.id + "label2", "h2");
        this.label2.setText("Label 2");
        this.label2.setType(WidgetTypes.FILL);

        this.label3 = new Label(this.id + "label3", "h3");
        this.label3.setText("Label 3");
        this.label3.setType(WidgetTypes.FILL);

        this.label4 = new Label(this.id + "label4", "h4");
        this.label4.setText("Label 4");
        this.label4.setType(WidgetTypes.FILL);

        this.addChild(this.label1);
        this.addChild(this.label2);
        this.addChild(this.label3);
        this.addChild(this.label4);
    }
}
