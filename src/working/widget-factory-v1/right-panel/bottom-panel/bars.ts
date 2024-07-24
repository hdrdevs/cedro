import { WidgetAlignTypes, WidgetTypes, Widget, ValueBar, ProgressBar } from "../../../../ui";

export class BarsForm extends Widget {
    value1: ValueBar;
    value2: ValueBar;
    value3: ValueBar;
    progress1: ProgressBar;

    constructor() {
        super("TextBoxesForm");
        this.setType(WidgetTypes.FILL);
        this.setAlign(WidgetAlignTypes.VERTICAL);
        this.setPadding(12);

        this.value1 = new ValueBar("value1");
        this.value1.setType(WidgetTypes.FILL);
        this.value1.setValue(10);
        this.value1.setFixedSize(40);

        this.value2 = new ValueBar("value2");
        this.value2.setType(WidgetTypes.FILL);
        this.value2.setValue(75);
        this.value2.setFixedSize(40);

        this.value3 = new ValueBar("value3");
        this.value3.setType(WidgetTypes.FILL);
        this.value3.setValue(50);
        this.value3.setFixedSize(40);

        this.progress1 = new ProgressBar("progress1");
        this.progress1.setType(WidgetTypes.FILL);
        this.progress1.setValue(84);
        this.progress1.setFixedSize(40);

        this.addChild(this.value1);
        this.addChild(this.value2);
        this.addChild(this.value3);
        this.addChild(this.progress1);
    }
}
