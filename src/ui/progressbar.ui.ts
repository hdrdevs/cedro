import { Label } from "./label.ui";
import "./styles/progressbar.css";
import { Widget } from "./widget.ui";

const PROGRESS_BAR_HEIGHT = 40;

//icono para el progress bar interactivo humidity_high

export class ProgressBar extends Widget {
    private value: number;
    private paddingBar: number;

    private bar: Widget;
    private lblValue: Label;

    public constructor(id: string, parent: Widget | null = null) {
        super(id, "div", parent);

        this.setH(PROGRESS_BAR_HEIGHT);

        this.paddingBar = 0;

        this.bar = new Widget(id + ".bar", "div", this);
        this.bar.addClass("WUIProgressBarBar");

        this.value = 0;
        this.addClass("WUIProgressBarContainer");

        this.lblValue = new Label(id + ".value", "span", this);
        this.lblValue.setText(this.value + "%");

        this.lblValue.addClass("WUIProgressBarLabel");
    }

    public setPaddingBar(p: number): void {
        this.paddingBar = p;
    }

    public hideLabel(): void {
        this.lblValue.setVisible(false);
    }

    public displayLabel(): void {
        this.lblValue.setVisible(true);
    }

    public render(): void {
        super.render();

        const padding = this.paddingBar;
        const width = this.getW() - padding;
        const height = this.getH();
        const widthBar = width * (this.value / 100);

        this.lblValue.setX(width / 2 - this.lblValue.getW() / 2);
        this.lblValue.setY(height / 2 - this.lblValue.getH() / 2);
        this.lblValue.raisteTop();

        this.bar.setX(padding);
        this.bar.setY(padding);
        this.bar.setW(widthBar);
        this.bar.setH(height - padding * 2);
    }

    public setValue(value: number): void {
        this.value = value;
        this.lblValue.setText(this.value + "%");
        this.render();
    }

    public getValue(): number {
        return this.value;
    }
}
