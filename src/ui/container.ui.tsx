import "./styles/container.css";
import { OrientationTypes } from "../types/orientation.type";
import {
    connectWidgetCallback,
    getOnlyEventProps,
    Widget,
    WidgetAlignTypes,
    WidgetTypes,
} from "./widget.ui";
import { UID } from "../core/uid";
import { WidgetProps, createWidget, normalizeWidget } from "./widget.builder";
import { Scroll } from "./scroll.ui";

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
    verticalScrollbar: Scroll | null;
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

        this.verticalScrollbar = null;

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

    public setVerticalScrollbar() {
        this.verticalScrollbar = new Scroll(this.id + ".VerticalScrollbar", this);
    }

    public setVariant(variant: ContainerVariants) {
        if (this.variant !== variant) {
            this.deleteClass("WUIPanel-" + this.variant);
        }
        this.variant = variant;
        this.addClass("WUIPanel-" + variant);
    }

    public free(): void {
        super.free();
        if (this.verticalScrollbar) this.verticalScrollbar.free();
    }
}

export function Spacer(): Container {
    return new Container({});
}

export type ContainerProps = WidgetProps & {
    variant?: ContainerVariants | null;
    scrollY?: boolean | null;
    children?: any;
};

export const WContainer = (props: Omit<ContainerProps, "id"> & { id?: string }) => {
    if (!props.id) {
        props.id = "Container." + UID();
    }

    connectWidgetCallback(props.id, getOnlyEventProps(props));

    return normalizeWidget(
        <div id={props.id} w-container w-variant={props.variant} w-scroll-y={props.scrollY}>
            {props.children}
        </div>,
        props
    );
};

export const WSpacer = (props: Omit<ContainerProps, "id">) => {
    return normalizeWidget(<div w-container>{props.children}</div>, { id: UID(), ...props });
};

export function createContainer(content: any, parent: Widget | null = null): Container {
    const dataOrientation = content.getAttribute("w-orientation");
    const dataVariant = content.getAttribute("w-variant");
    const dataScrollY = content.getAttribute("w-scroll-y");
    const dataId = content.getAttribute("id") || UID();

    let orientation: OrientationTypes = dataOrientation ? dataOrientation : "horizontal";
    let variant: ContainerVariants = dataVariant ? dataVariant : "plain";

    let newContainer = new Container({ id: dataId, orientation, parent, variant });

    if (dataScrollY) {
        newContainer.setVerticalScrollbar();
    }

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
