import "./styles/icon.css";
import { Colors } from "./colors.ui";
import { normalizeWidget, WidgetProps } from "./widget.builder";
import { connectWidgetCallback, getOnlyEventProps, Widget } from "./widget.ui";
import { UID } from "../core/uid";

export type IconVariants = "Filled" | "Outlined" | "Round" | "Sharp" | "Two Tone";
export type IconSizes = "small" | "medium" | "large" | "xlarge";

const iconSizesMap = {
    small: "md-18",
    medium: "md-24",
    large: "md-36",
    xlarge: "md-48",
};

const iconPixelSizesMap = {
    small: "18px",
    medium: "24px",
    large: "36px",
    xlarge: "48px",
};

export class Icon extends Widget {
    variant: IconVariants;
    color: Colors | null = null;
    iconSize: IconSizes = "medium";
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

        this.setIconSize("medium");

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

    public setIconSize(size: IconSizes = "medium"): void {
        if (this.iconSize !== size) {
            this.deleteClass(iconSizesMap[this.iconSize]);
        }

        this.iconSize = size;
        this.addClass(iconSizesMap[size]);

        this.body.style.fontSize = iconPixelSizesMap[size];
    }

    public setIcon(icon: string): void {
        this.icon = icon;
        this.body.innerHTML = icon;
    }

    public setVariant(variant: IconVariants = "Filled"): void {
        this.variant = variant;
    }

    public setColor(color: Colors = "primary"): void {
        if (this.color !== color) {
            this.deleteClass("WUI-icon-color-" + this.color);
        }

        this.addClass("WUI-icon-color-" + color);

        this.color = color;
    }

    public getVariant(): IconVariants {
        return this.variant;
    }

    public getColor(): Colors {
        return this.color || "primary";
    }

    public getIcon(): string {
        return this.icon;
    }

    public getIconSize(): IconSizes {
        return this.iconSize;
    }
}

export type wIconProps = WidgetProps & {
    icon: string;
    variant?: IconVariants | null;
    color?: Colors | null;
    size?: IconSizes | null;
};

export const WIcon = (props: wIconProps) => {
    if (!props.id) {
        props.id = "Icon." + UID();
    }

    connectWidgetCallback(props.id, getOnlyEventProps(props));

    return normalizeWidget(
        <div
            id={props.id}
            w-icon
            w-icon-name={props.icon}
            w-variant={props.variant}
            w-color={props.color}
            w-size={props.size}
        ></div>,
        props
    );
};

export function createIcon(id: string, content: any, parent: Widget | null = null): Icon {
    const dataIcon = content.getAttribute("w-icon-name");
    const dataVariant = content.getAttribute("w-variant") || "Filled";
    const dataColor = content.getAttribute("w-color") || "primary";
    const dataSize = content.getAttribute("w-size") || "medium";

    let newIcon = new Icon(id, dataIcon, dataVariant, parent);

    if (dataColor) {
        newIcon.setColor(dataColor);
    }

    if (dataSize) {
        newIcon.setIconSize(dataSize);
    }

    return newIcon;
}
