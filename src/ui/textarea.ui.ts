import "./styles/textarea.css";
import { Widget } from "./widget.ui";

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
