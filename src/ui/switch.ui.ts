import { ToggleButton } from "./toggle.ui";
import { Widget } from "./widget.ui";
export class Switch extends ToggleButton {
    constructor(id: string, text: string = "", parent: Widget | null = null) {
        super(id, text, "toggle_off", "toggle_on", parent);
    }
}