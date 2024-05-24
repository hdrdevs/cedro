import "./styles/checkbox.css";
import { Icon } from "./Icon.ui";
import { Widget } from "./widget.ui";

export class Checkbox extends Icon {
    state: boolean;
    constructor(id: string, parent: Widget | null = null) {
        super(id + ".Switch", "check_box_outline_blank", "Outlined", parent);
        this.state = false;

        this.addClass("WUICheckbox");

        this.subscribe({
            event: "click",
            then: () => {
                this.toggle();
            },
        });
    }

    public setState(state: boolean): void {
        this.state = state;
        this.getBody().innerHTML = state ? "check_box_outlined" : "check_box_outline_blank";
    }

    public toggle(): void {
        this.setState(!this.state);
    }

    public getState(): boolean {
        return this.state;
    }
}
