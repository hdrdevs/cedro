import { ToggleButton } from "./toggle.ui";
import { Widget } from "./widget.ui";

export class RadioButton extends ToggleButton {
    constructor(id: string, text: string = "", parent: Widget | null = null) {
        super(id, text, "radio_button_unchecked", "radio_button_checked", parent);
    }
}
