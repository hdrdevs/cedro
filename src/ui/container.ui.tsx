import { OrientationTypes } from "src/types/orientation.type";
import { Widget, WidgetAlignTypes, WidgetTypes } from "./widget.ui";
import { UID } from "../core/uid";
import { WidgetProps, createWidget, normalizeWidget } from "./widget.builder";

export type ContainerParams = {
    orientation?: OrientationTypes;
    parent?: Widget | null;
    size?: number | null;
    padding?: number | null;
    id?: string;
};

export class Container extends Widget {
    constructor(params: ContainerParams) {
        const {
            id = "",
            orientation = "horizontal",
            parent = null,
            size = null,
            padding = null,
        } = params;

        super(id.length > 0 ? id : UID(), "div", parent);

        if (orientation === "horizontal") {
            this.setAlign(WidgetAlignTypes.HORIZONTAL);
        } else {
            this.setAlign(WidgetAlignTypes.VERTICAL);
        }

        if (size !== null) {
            this.setFixedSize(size);
        }

        if (padding !== null) {
            this.setPadding(padding);
        }

        this.setType(WidgetTypes.FILL);
    }
}

export function Spacer(): Container {
    return new Container({});
}

export type ContainerProps = WidgetProps & {
    children?: any;
};

export const WContainer = (props: Omit<ContainerProps, "id"> & { id?: string }) => {
    return normalizeWidget(
        <div id={props.id} w-container>
            {props.children}
        </div>,
        { id: props.id ? props.id : UID(), ...props }
    );
};

export const WSpacer = (props: Omit<ContainerProps, "id">) => {
    return normalizeWidget(<div w-container>{props.children}</div>, { id: UID(), ...props });
};

export function createContainer(content: any, parent: Widget | null = null): Container {
    const dataOrientation = content.getAttribute("w-orientation");

    let orientation: OrientationTypes = dataOrientation ? dataOrientation : "horizontal";

    let newContainer = new Container({ orientation, parent });

    content.childNodes.forEach((item: HTMLElement) => {
        const widget = createWidget(item);

        if (widget !== null) {
            newContainer.addChild(widget);
        }
    });

    if (parent) {
        parent.addChild(newContainer);
    }

    return newContainer;
}
