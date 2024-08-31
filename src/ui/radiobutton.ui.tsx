import { UID } from "../core/uid";
import { ToggleButton } from "./toggle.ui";
import { normalizeWidget } from "./widget.normalize";
import { WidgetProps } from "./widget.types";
import { Widget, connectWidgetCallback, getOnlyEventProps } from "./widget.ui";

export class RadioButton extends ToggleButton {
    constructor(id: string, text: string = "", parent: Widget | null = null) {
        super(id, text, "radio_button_checked", "radio_button_unchecked", parent);
    }
}

export type wRadioButtonProps = WidgetProps & {
    text: string;
    checked?: boolean | null;
};

export const WRadioButton = (props: wRadioButtonProps) => {
    if (!props.id) {
        props.id = "RadioButton." + UID();
    }

    connectWidgetCallback(props.id, getOnlyEventProps(props));

    return normalizeWidget(
        <div id={props.id} w-radiobutton w-text={props.text} w-checked={props.checked} />,
        props
    );
};

export function createRadioButton(
    id: string,
    content: any,
    parent: Widget | null = null
): RadioButton {
    const dataText = content.getAttribute("w-text");
    const dataChecked = content.getAttribute("w-checked");

    let newRadioButton = new RadioButton(id, dataText, parent);

    if (dataChecked !== null) {
        newRadioButton.setState(true);
    } else {
        newRadioButton.setState(false);
    }

    return newRadioButton;
}
