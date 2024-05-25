import { Widget } from "./widget.ui";
import { IconButton } from "./IconButton.ui";

export class ToggleButton extends IconButton {
    state: boolean;
    toggleOnIcon: string;
    toggleOffIcon: string;

    constructor(
        id: string,
        text: string = "",
        toggleOnIcon: string = "toggle_on",
        toggleOffIcon: string = "toggle_off",
        parent: Widget | null = null
    ) {
        super(id, toggleOffIcon, parent);

        this.toggleOnIcon = toggleOnIcon;
        this.toggleOffIcon = toggleOffIcon;

        this.state = false;

        if (text) {
            this.setText(text);
        }

        this.setVariant("text");

        this.subscribe({
            event: "click",
            then: () => {
                this.toggle();
            },
        });
    }

    public setState(state: boolean): void {
        this.state = state;
        this.setIcon(state ? this.toggleOnIcon : this.toggleOffIcon);
    }

    public toggle(): void {
        this.setState(!this.state);
    }

    public getState(): boolean {
        return this.state;
    }
}
