import { OrientationTypes } from "src/types/orientation.type";
import { Widget, WidgetAlignTypes, WidgetTypes } from "./widget.ui";
import { UID } from "../core/uid";
import { WidgetProps, createWidget } from "./builder/widget.builder";

export type ContainerParams = {
    orientation?: OrientationTypes;
    parent?: Widget | null;
    size?: number | null;
    padding?: number | null;
};

export class Container extends Widget {
    constructor(params: ContainerParams) {
        const { orientation = "horizontal", parent = null, size = null, padding = null } = params;

        super(UID(), "div", parent);

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

export type ContainerProps = Omit<WidgetProps, "id"> & {
    children: any;
};

export const WContainer = (props: ContainerProps) => {
    return (
        <div
            w-container
            w-class={props.classNames}
            w-orientation={props.orientation}
            w-fixed-size={props.fixedSize}
            w-padding={props.padding}
            w-type={props.type}
        >
            {props.children}
        </div>
    );
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

    return newContainer;
}
