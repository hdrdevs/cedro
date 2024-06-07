import { OrientationTypes } from "src/types/orientation.type";
import { Widget, WidgetAlignTypes, WidgetTypes } from "./widget.ui";
import { UID } from "../core/uid";

export type ContainerParams = {
    orientation?: OrientationTypes;
    parent?: Widget | null;
    size?: number | null;
};

export class Container extends Widget {
    constructor(params: ContainerParams) {
        const { orientation = "horizontal", parent = null, size = null } = params;

        super(UID(), "div", parent);

        if (orientation === "horizontal") {
            this.setAlign(WidgetAlignTypes.HORIZONTAL);
        } else {
            this.setAlign(WidgetAlignTypes.VERTICAL);
        }

        if (size !== null) {
            this.setFixedSize(size);
        }

        this.setType(WidgetTypes.FILL);
    }
}

export function Spacer(): Container {
    return new Container({});
}
