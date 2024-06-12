import { Label } from "./label.ui";
import "./styles/progressbar.css";
import { WidgetProps } from "./widget.builder";
import { Widget, WidgetTypes, connectWidgetCallback, getOnlyEventProps } from "./widget.ui";

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
        this.lblValue.setType(WidgetTypes.CUSTOM);
        this.lblValue.setVCentered(true);
        this.lblValue.setHCentered(true);
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

        this.lblValue.setX(padding);
        this.lblValue.setY(0);
        this.lblValue.setW(width);
        this.lblValue.setH(height);
        this.lblValue.raisteTop();
        this.lblValue.render();

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

export type wProgressBarProps = WidgetProps & {
    value: number;
    paddingBar?: number | null;
    hideLabel?: boolean | null;
};

export const WProgressBar = (props: wProgressBarProps) => {
    connectWidgetCallback(props.id, getOnlyEventProps(props));

    return (
        <div
            id={props.id}
            w-progressbar
            w-value={props.value}
            w-padding-bar={props.paddingBar}
            w-hide-label={props.hideLabel}
            w-class={props.classNames}
            w-orientation={props.orientation}
            w-fixed-size={props.fixedSize}
            w-padding={props.padding}
            w-type={props.type}
        ></div>
    );
};

export function createProgressBar(
    id: string,
    content: any,
    parent: Widget | null = null
): ProgressBar {
    let newProgressBar = new ProgressBar(id, parent);

    const dataValue = content.getAttribute("w-value");
    const dataPaddingBar = content.getAttribute("w-padding-bar");
    const dataHideLabel = content.getAttribute("w-hide-label");

    if (dataValue) {
        newProgressBar.setValue(parseInt(dataValue));
    }

    if (dataPaddingBar) {
        newProgressBar.setPaddingBar(parseInt(dataPaddingBar));
    }

    console.log(dataHideLabel);

    if (dataHideLabel !== null) {
        newProgressBar.hideLabel();
    } else {
        newProgressBar.displayLabel();
        console.log("mostrando label");
    }

    return newProgressBar;
}
