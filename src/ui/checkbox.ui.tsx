import { ToggleButton } from "./toggle.ui";
import { normalizeWidget, WidgetProps } from "./widget.builder";
import { Widget, connectWidgetCallback, getOnlyEventProps } from "./widget.ui";

export class Checkbox extends ToggleButton {
    constructor(id: string, text: string = "", parent: Widget | null = null) {
        super(id, text, "check_box_outlined", "check_box_outline_blank", parent);
    }
}

export type wCheckboxProps = WidgetProps & {
    text: string;
    checked?: boolean | null;
};

export const WCheckbox = (props: wCheckboxProps) => {
    connectWidgetCallback(props.id, getOnlyEventProps(props));

    return normalizeWidget(
        <div id={props.id} w-checkbox w-text={props.text} w-checked={props.checked} />,
        props
    );
};

export function createCheckbox(id: string, content: any, parent: Widget | null = null): Checkbox {
    const dataText = content.getAttribute("w-text");
    const dataChecked = content.getAttribute("w-checked");

    let newCheckbox = new Checkbox(id, dataText, parent);

    if (dataChecked !== null) {
        newCheckbox.setState(true);
    } else {
        newCheckbox.setState(false);
    }

    return newCheckbox;
}
