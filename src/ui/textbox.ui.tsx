import { WidgetProps } from "./builder/widget.builder";
import "./styles/textbox.css";
import { Widget, WidgetTypes, connectWidgetCallback, getOnlyEventProps } from "./widget.ui";

export type InputTypes =
    | "text"
    | "date"
    | "datetime-local"
    | "file"
    | "number"
    | "password"
    | "email"
    | "url"
    | "color"
    | "tel";

export class Textbox extends Widget {
    input: Widget;
    label: Widget;
    inputType: string;
    title: string;

    constructor(id: string, parent: Widget | null = null) {
        super(id, "div", parent);

        this.addClass("WUIinput");

        this.title = "";
        this.inputType = "text";

        const inputId = `WUI.${id}.input.body`;

        this.label = new Widget(id + ".label", "label", this);
        this.label.setType(WidgetTypes.CUSTOM);

        this.label.getBody().setAttribute("for", inputId);

        this.input = new Widget(id + ".input", "input", this);
        this.input.setType(WidgetTypes.CUSTOM);
        this.input.getBody().setAttribute("name", inputId);
        this.input.getBody().setAttribute("type", this.inputType);

        this.input.getBody().addEventListener("focus", () => {
            this.moveLabelToTop();
            //this.label.setVisible(false);
        });

        this.input.getBody().addEventListener("blur", () => {
            this.label.setVisible(true);
            this.positionLabel();
        });

        this.getBody().style.overflow = "";
    }

    getValue(): string {
        const value = (this.input.getBody() as HTMLInputElement).value;

        if (value) return value;

        return "";
    }

    setValue(value: string): void {
        (this.input.getBody() as HTMLInputElement).value = value;
        this.positionLabel();
    }

    public init(): void {
        super.init();
    }

    public moveLabelToTop(): void {
        const labelHeight = this.label.getBody().clientHeight;
        this.label.setY(-labelHeight / 2);
    }

    private positionLabel(): void {
        if (this.title === "") {
            this.label.setVisible(false);
            return;
        }
        if (this.getValue() === "") {
            this.moveLabelToCenter();
        } else {
            this.moveLabelToTop();
        }
    }

    public moveLabelToCenter(): void {
        const labelHeight = this.label.getBody().clientHeight;
        const labelTop = this.getH() / 2 - labelHeight / 2;

        this.label.setY(labelTop);
    }

    public render(): void {
        const parent = this.getParent();

        if (parent) {
            if (parent.type === WidgetTypes.FREE) {
                this.setWH(this.initialWidth, this.initialHeight);
            }
        }

        this.getBody().style.overflow = "";
        this.label.getBody().style.position = "absolute";

        this.positionLabel();
        this.input.setWH(this.getW(), this.getH());
        this.input.getBody().style.lineHeight = this.getH() + "px";
        this.input.render();

        super.render();
    }

    setTitle(title: string): void {
        this.title = title;
        this.label.getBody().innerHTML = this.title;
    }

    setInputType(type: InputTypes): void {
        this.inputType = type;
        this.input.getBody().setAttribute("type", this.inputType);
    }

    getTitle(): string {
        return this.title;
    }

    /*getLabel(): Widget {
        return this.label;
    }*/

    getInput(): Widget {
        return this.input;
    }

    getInputType(): string {
        return this.inputType;
    }
}

export type wTextBoxProps = WidgetProps & {
    title: string;
    inputType?: InputTypes | null;
    width?: number | null;
    height?: number | null;
};

export const WTextbox = (props: wTextBoxProps) => {
    connectWidgetCallback(props.id, getOnlyEventProps(props));

    return (
        <input
            id={props.id}
            w-textbox
            w-title={props.title}
            w-input-type={props.inputType}
            w-width={props.width}
            w-height={props.height}
            w-class={props.classNames}
            w-orientation={props.orientation}
            w-fixed-size={props.fixedSize}
            w-padding={props.padding}
            w-type={props.type}
        />
    );
};

export function createTextbox(id: string, content: any, parent: Widget | null = null): Textbox {
    let newTextbox = new Textbox(id, parent);

    const dataTitle = content.getAttribute("w-title");
    const dataInputType = content.getAttribute("w-input-type");
    const dataWidth = content.getAttribute("w-width");
    const dataHeight = content.getAttribute("w-height");

    if (dataInputType) {
        newTextbox.setInputType(dataInputType);
    }

    if (dataWidth) {
        newTextbox.setInitialW(dataWidth);
    }

    if (dataHeight) {
        newTextbox.setInitialH(dataHeight);
    }

    newTextbox.setTitle(dataTitle);

    return newTextbox;
}
