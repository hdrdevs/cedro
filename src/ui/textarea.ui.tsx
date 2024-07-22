import "./styles/textarea.css";
import { normalizeWidget, WidgetProps } from "./widget.builder";
import { connectWidgetCallback, getOnlyEventProps, Widget } from "./widget.ui";

export class TextArea extends Widget {
    constructor(id: string, parent: Widget | null = null) {
        super(id, "textarea", parent);

        this.addClass("WUITextArea");
    }

    public setText(text: string): void {
        const textArea = this.getBody() as HTMLTextAreaElement;
        textArea.value = text;
    }

    public getText(): string {
        const textArea = this.getBody() as HTMLTextAreaElement;
        return textArea.value;
    }
}

export type wTextareaProps = WidgetProps & {
    text: string;
};

export const WTextarea = (props: wTextareaProps) => {
    connectWidgetCallback(props.id, getOnlyEventProps(props));

    return normalizeWidget(<div id={props.id} w-textarea w-text={props.text}></div>, props);
};

export function createTextarea(id: string, content: any, parent: Widget | null = null): TextArea {
    let newTextarea = new TextArea(id, parent);

    const dataText = content.getAttribute("w-text");

    if (dataText) {
        newTextarea.setText(dataText);
    }

    return newTextarea;
}
