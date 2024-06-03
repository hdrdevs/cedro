import { WidgetAlignTypes, WidgetTypes, Widget, Textbox } from "../../../../ui";

export class TextBoxesForm extends Widget {
    strTextbox: Textbox;
    numberTextbox: Textbox;
    dateTextbox: Textbox;
    constructor() {
        super("TextBoxesForm");
        this.setType(WidgetTypes.FILL);
        this.setAlign(WidgetAlignTypes.VERTICAL);
        this.setPadding(12);

        this.strTextbox = new Textbox("strTextbox");
        this.strTextbox.setTitle("Model Name");
        this.strTextbox.setType(WidgetTypes.FILL);
        this.strTextbox.setFixedSize(50);

        this.numberTextbox = new Textbox("numberTextbox");
        this.numberTextbox.setInputType("number");
        this.numberTextbox.setTitle("Year");
        this.numberTextbox.setType(WidgetTypes.FILL);
        this.numberTextbox.setFixedSize(50);

        this.dateTextbox = new Textbox("dateTextbox");
        this.dateTextbox.setInputType("date");
        this.dateTextbox.setTitle("Date");
        this.dateTextbox.setType(WidgetTypes.FILL);
        this.dateTextbox.setFixedSize(50);

        this.addChild(this.strTextbox);
        this.addChild(this.numberTextbox);
        this.addChild(this.dateTextbox);
    }
}
