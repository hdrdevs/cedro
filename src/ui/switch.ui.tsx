import { UID } from "../core/uid";
import { ToggleButton } from "./toggle.ui";
import { normalizeWidget, WidgetProps } from "./widget.builder";
import { Widget, connectWidgetCallback, getOnlyEventProps } from "./widget.ui";
export class Switch extends ToggleButton {
    constructor(id: string, text: string = "", parent: Widget | null = null) {
        super(id, text, "toggle_off", "toggle_on", parent);
    }
}

export type wSwitchProps = WidgetProps & {
    text: string;
    checked?: boolean | null;
};

export const WSwitch = (props: wSwitchProps) => {
    if (!props.id) {
        props.id = "Switch." + UID();
    }

    connectWidgetCallback(props.id, getOnlyEventProps(props));

    return normalizeWidget(
        <div id={props.id} w-switch w-text={props.text} w-checked={props.checked} />,
        props
    );
};

export function createSwitch(id: string, content: any, parent: Widget | null = null): Switch {
    const dataText = content.getAttribute("w-text");
    const dataChecked = content.getAttribute("w-checked");

    let newSwitch = new Switch(id, dataText, parent);

    if (dataChecked !== null) {
        newSwitch.setState(true);
    } else {
        newSwitch.setState(false);
    }

    return newSwitch;
}
