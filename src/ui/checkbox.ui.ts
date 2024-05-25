import { ToggleButton } from "./toggle.ui";
import { Widget } from "./widget.ui";

export class Checkbox extends ToggleButton {
    constructor(id: string, text: string = "", parent: Widget | null = null) {
        super(id, text, "check_box_outline_blank", "check_box_outlined", parent);
    }
}
