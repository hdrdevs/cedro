import "./styles/container.css";
import { OrientationTypes } from "src/types/orientation.type";
import { Widget, WidgetAlignTypes, WidgetTypes } from "./widget.ui";
import { UID } from "../core/uid";
import { WidgetProps, createWidget, normalizeWidget } from "./widget.builder";

export type ContainerVariants = "plain" | "contained" | "outlined";

export type ContainerParams = {
    orientation?: OrientationTypes;
    parent?: Widget | null;
    size?: number | null;
    padding?: number | null;
    variant?: ContainerVariants | null;
    id?: string;
};

export class Container extends Widget {
    variant: ContainerVariants = "plain";
    constructor(params: ContainerParams) {
        const {
            id = "",
            orientation = "horizontal",
            parent = null,
            size = null,
            padding = null,
            variant = null,
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

        if (variant !== null) {
            this.setVariant(variant);
        } else {
            this.setVariant("plain");
        }

        this.setType(WidgetTypes.FILL);
    }

    public setVariant(variant: ContainerVariants) {
        if (this.variant !== variant) {
            this.deleteClass("WUIPanel-" + this.variant);
        }
        this.variant = variant;
        this.addClass("WUIPanel-" + variant);
    }
}

export function Spacer(): Container {
    return new Container({});
}

export type ContainerProps = WidgetProps & {
    variant?: ContainerVariants | null;
    children?: any;
};

export const WContainer = (props: Omit<ContainerProps, "id"> & { id?: string }) => {
    return normalizeWidget(
        <div id={props.id} w-container w-variant={props.variant}>
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
    const dataVariant = content.getAttribute("w-variant");

    let orientation: OrientationTypes = dataOrientation ? dataOrientation : "horizontal";
    let variant: ContainerVariants = dataVariant ? dataVariant : "plain";

    let newContainer = new Container({ orientation, parent, variant });

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
