import "./styles/icon.css";
import { Colors } from "./colors.ui";
import { normalizeWidget, WidgetProps } from "./widget.builder";
import { connectWidgetCallback, getOnlyEventProps, Widget } from "./widget.ui";

export type IconVariants = "Filled" | "Outlined" | "Round" | "Sharp" | "Two Tone";

export class Icon extends Widget {
    variant: IconVariants;
    color: Colors | null = null;
    icon: string;

    constructor(
        id: string,
        icon: string,
        variant: IconVariants = "Filled",
        parent: Widget | null = null
    ) {
        super(id, "span", parent);

        this.variant = variant;
        this.setColor("primary");
        this.icon = icon;

        if (this.variant === "Filled") {
            this.addClass("material-icons");
        } else {
            this.addClass(
                "material-icons-" + this.variant.toString().replace(" ", "-").toLowerCase()
            );
        }

        this.setIcon(icon);

        this.init();
    }

    public init(): void {
        super.init();
    }

    setIcon(icon: string): void {
        this.icon = icon;
        this.body.innerHTML = icon;
    }

    setVariant(variant: IconVariants = "Filled"): void {
        this.variant = variant;
    }

    setColor(color: Colors = "primary"): void {
        if (this.color !== color) {
            this.deleteClass("WUI-icon-color-" + this.color);
        }

        this.addClass("WUI-icon-color-" + color);

        this.color = color;
    }

    getVariant(): IconVariants {
        return this.variant;
    }

    getColor(): Colors {
        return this.color || "primary";
    }

    getIcon(): string {
        return this.icon;
    }
}

export type wIconProps = WidgetProps & {
    icon: string;
    variant?: IconVariants | null;
    color?: Colors | null;
};

export const WIcon = (props: wIconProps) => {
    connectWidgetCallback(props.id, getOnlyEventProps(props));

    return normalizeWidget(
        <div
            id={props.id}
            w-icon
            w-icon-name={props.icon}
            w-variant={props.variant}
            w-color={props.color}
        ></div>,
        props
    );
};

export function createIcon(id: string, content: any, parent: Widget | null = null): Icon {
    const dataIcon = content.getAttribute("w-icon-name");
    const dataVariant = content.getAttribute("w-variant") || "Filled";
    const dataColor = content.getAttribute("w-color") || "primary";

    let newIcon = new Icon(id, dataIcon, dataVariant, parent);

    if (dataColor) {
        newIcon.setColor(dataColor);
    }

    return newIcon;
}
