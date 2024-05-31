import "./styles/buttoncolor.css";
import { Button } from "./button.ui";
import { Widget } from "./widget.ui";

export class ButtonColor extends Button {
    inputColor: Widget;
    constructor(id: string, parent: Widget | null = null) {
        super(id, parent);

        this.inputColor = new Widget(id + ".inputColor", "input", this);
        this.inputColor.getBody().setAttribute("type", "color");
        this.inputColor.addClass("WUIButtonColorInput");
    }
}
