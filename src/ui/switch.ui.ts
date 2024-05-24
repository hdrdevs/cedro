import "./styles/switch.css";
import { Icon } from "./Icon.ui";
import { Widget } from "./widget.ui";

export class Switch extends Icon {
    state: boolean;
    constructor(id: string, parent: Widget | null = null) {
        super(id + ".Switch", "toggle_off", "Outlined", parent);
        this.state = false;

        this.addClass("WUISwitch");

        this.subscribe({
            event: "click",
            then: () => {
                this.toggle();
            },
        });
    }

    public setState(state: boolean): void {
        this.state = state;
        this.getBody().innerHTML = state ? "toggle_on" : "toggle_off";
    }

    public toggle(): void {
        this.setState(!this.state);
    }

    public getState(): boolean {
        return this.state;
    }
}
