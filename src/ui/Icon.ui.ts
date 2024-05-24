import { Colors } from "./colors.ui";
import { Widget } from "./widget.ui";

export type IconVariants = "Filled" | "Outlined" | "Round" | "Sharp" | "Two Tone";

export class Icon extends Widget {
    variant: IconVariants;
    color: Colors;
    icon: string;

    constructor(
        id: string,
        icon: string,
        variant: IconVariants = "Filled",
        parent: Widget | null = null
    ) {
        super(id, "span", parent);

        this.variant = variant;
        this.color = "primary";
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
        this.color = color;
    }

    getVariant(): IconVariants {
        return this.variant;
    }

    getColor(): Colors {
        return this.color;
    }

    getIcon(): string {
        return this.icon;
    }
}
