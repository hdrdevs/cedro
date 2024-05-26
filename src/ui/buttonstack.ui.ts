import { OrientationTypes } from "src/types/orientation.type";
import { IconButton } from "./IconButton.ui";
import { ButonVariants, Button } from "./button.ui";
import { Widget, WidgetAlignTypes, WidgetTypes } from "./widget.ui";

export class ButtonStack extends Widget {
    orientation: OrientationTypes;
    buttons: Map<string, Button | IconButton>;
    activeButton: string | null;
    constructor(
        id: string,
        orientation: OrientationTypes = "horizontal",
        parent: Widget | null = null
    ) {
        super(id, "div", parent);

        this.orientation = orientation;

        if (this.orientation === "horizontal") {
            this.setAlign(WidgetAlignTypes.HORIZONTAL);
        } else {
            this.setAlign(WidgetAlignTypes.VERTICAL);
        }

        this.activeButton = null;

        this.buttons = new Map<string, Button | IconButton>();
    }

    public setActive(buttonId: string): void {
        this.activeButton = buttonId;
        this.configureStyles();
    }

    private configureStyles(): void {
        const buttonsList = Array.from(this.buttons.entries());
        for (let i = 0; i < buttonsList.length; i++) {
            const [_key, button] = buttonsList[i] as [string, Button | IconButton];

            button.deleteAllClasses();

            if (this.thereIsOnlyOneButton()) {
                this.setButtonVariant(button, "outlined");
            } else if (this.thereAreTwoButtons()) {
                if (i === 0) {
                    this.setButtonVariant(button, "stack-start");
                } else if (i === 1) {
                    this.setButtonVariant(button, "stack-end");
                }
            } else if (this.thereAreMoreThanTwoButtons()) {
                if (i === 0) {
                    this.setButtonVariant(button, "stack-start");
                } else if (i === buttonsList.length - 1) {
                    this.setButtonVariant(button, "stack-end");
                } else {
                    this.setButtonVariant(button, "stack-middle");
                }
            }
        }
    }

    private setButtonVariant(button: Button | IconButton, variant: ButonVariants): void {
        if (button.id === this.activeButton) {
            button.setVariant((variant + "-active") as ButonVariants);
        } else {
            button.setVariant(variant);
        }
    }

    public addButton(button: Button | IconButton): void {
        this.buttons.set(button.id, button);
        button.setType(WidgetTypes.FILL);
        button.subscribe({ event: "click", then: () => this.setActive(button.id) });
        this.addChild(button);
        this.configureStyles();
    }

    private thereIsOnlyOneButton(): boolean {
        return this.buttons.size === 1;
    }

    private thereAreTwoButtons(): boolean {
        return this.buttons.size === 2;
    }

    private thereAreMoreThanTwoButtons(): boolean {
        return this.buttons.size > 2;
    }
}
