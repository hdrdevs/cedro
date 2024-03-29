import "./styles/button.css";
import { Widget, WidgetTypes } from "./widget.ui";
import { Button } from "./button.ui";
import { Icon } from "./Icon.ui";
import { Label } from "./label.ui";

export class IconButton extends Button {
    icon: Icon;
    label: Label;

    constructor(
        id: string,
        icon: string = "dark_mode",
        parent: Widget | null = null
    ) {
        super(id, parent);

        this.icon = new Icon(id + ".icon", icon, undefined, this);
        this.label = new Label(id + ".label", undefined, this);

        this.icon.setType(WidgetTypes.FREE);
        this.label.setType(WidgetTypes.FREE);

        this.init();
    }

    public init(): void {
        super.init();
    }

    public render(): void {
        super.render();

        this.label.getBody().style.position = "absolute";
        this.icon.getBody().style.position = "absolute";

        const labelHeight = this.label.getBody().clientHeight;
        const labelWidth = this.label.getBody().clientWidth;

        //const iconHeight = this.icon.getBody().clientHeight;
        const iconWidth = 24;

        const startX =
            this.getBody().clientWidth / 2 - (iconWidth + labelWidth) / 2;
        const startY = this.getH() / 2 - 24 / 2;
        const startLabelY = this.getH() / 2 - labelHeight / 2;

        if (startX < 0 || startY < 0) {
            setTimeout(() => {
                this.render();
            }, 500);
            return;
        }

        this.icon.setX(startX);
        this.label.setX(startX + iconWidth + 5);

        this.icon.setY(startY);
        this.label.setY(startLabelY);
    }

    public setText(text: string): void {
        //super.setText(text);
        this.label.setText(text);
    }

    public setIcon(icon: string): void {
        this.icon.setIcon(icon);
    }
}
