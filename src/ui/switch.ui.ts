import "./styles/switch.css";
import { Widget } from "./widget.ui";
import { IconButton } from "./IconButton.ui";

export class Switch extends IconButton {
    state: boolean;
    constructor(id: string, text: string = "", parent: Widget | null = null) {
        super(id, "toggle_off", parent);
        //super(id + ".Switch", "toggle_off", "Outlined", parent);
        this.state = false;

        if (text) {
            this.setText(text);
        }

        this.setVariant("text");

        //this.addClass("WUISwitch");

        this.subscribe({
            event: "click",
            then: () => {
                this.toggle();
            },
        });
    }

    public setState(state: boolean): void {
        this.state = state;
        this.setIcon(state ? "toggle_on" : "toggle_off");
        //this.getBody().innerHTML = state ? "toggle_on" : "toggle_off";
    }

    public toggle(): void {
        this.setState(!this.state);
    }

    public getState(): boolean {
        return this.state;
    }
}
