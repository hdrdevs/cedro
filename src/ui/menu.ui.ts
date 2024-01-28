import "./styles/menu.css";
import { IWidget } from "../interfaces/widget.interface";
import { IconButton } from "./IconButton.ui";
import { Widget, WidgetAlignTypes, WidgetTypes } from "./widget.ui";
import { w } from "./windget.collection";

export class Menu extends Widget {
    background: Widget;
    options: Map<string, IconButton>;
    triggeredById: string | null;
    triggeredBy: IWidget | null;
    triggeredBySearchCode: any;
    withCalculation: boolean;
    constructor(
        id: string,
        trigeredById: string | null,
        parent: IWidget | null = null
    ) {
        super(id, "div", parent);

        this.background = new Widget(this.id + ".background", "div", null);
        this.background.setType(WidgetTypes.CUSTOM);
        this.background.addClass("WUIMenuBackground");
        this.background.setVisible(false);

        this.triggeredById = trigeredById;
        this.setType(WidgetTypes.CUSTOM);

        this.triggeredBy = null;

        this.options = new Map<string, IconButton>();

        this.addClass("WUIMenu");
        this.addClass("WUIMenuTransparent");

        this.withCalculation = false;

        this.triggeredBySearchCode = setInterval(() => {
            if (!this.triggeredById) {
                clearInterval(this.triggeredBySearchCode);
                return;
            }
            if (w.get(this.triggeredById)) {
                this.triggeredBy = w.get(this.triggeredById) as IWidget;

                this.triggeredBy.subscribe({
                    event: "click",
                    then: () => {
                        this.wakeUp();
                    },
                });
                clearInterval(this.triggeredBySearchCode);
            }
        }, 500);

        this.background.subscribe({
            event: "click",
            then: () => {
                this.close();
            },
        });
    }

    public close(): void {
        this.deleteClass("WUIMenuVisible");
        this.addClass("WUIMenuHidden");
        this.background.setVisible(false);
    }

    private setFreeOptionWidth(): void {
        for (const [, dataOption] of this.options) {
            const option = dataOption as IconButton;
            option.deleteClass("WUIMenuOptions100w");
        }
    }

    private getMaxWidth(): number {
        this.setFreeOptionWidth();
        this.deleteClass("WUIMenuHidden");
        this.addClass("WUIMenuTransparent");
        let maxWidth = 0;
        for (const [, dataOption] of this.options) {
            const option = dataOption as IconButton;
            const optionWidth = option.getBody().clientWidth;

            if (optionWidth > maxWidth) {
                maxWidth = optionWidth;
            }
        }
        return maxWidth;
    }

    wakeUp(): void {
        if (!this.withCalculation) {
            let maxWidth = this.getMaxWidth();

            for (const [, dataOption] of this.options) {
                const option = dataOption as IconButton;
                option.addClass("WUIMenuOptions100w");
            }
            this.deleteClass("WUIMenuTransparent");
            this.addClass("WUIMenuHidden");
            this.setW(maxWidth);
            this.withCalculation = true;
        }

        this.background.setVisible(true);
        this.background.raisteTop();

        this.raisteTop();

        this.deleteClass("WUIMenuHidden");
        this.addClass("WUIMenuVisible");

        if (this.triggeredBy) {
            const position = this.triggeredBy.getPosition(false);

            const triggerW = this.triggeredBy.getBody().clientWidth;
            const triggerH = this.triggeredBy.getBody().clientHeight;

            const screenW = window.innerWidth;
            const screenH = window.innerHeight;
            const menuW = this.getBody().clientWidth;
            const menuH = this.getBody().clientHeight;
            let positionX = position.x;
            let positionY = position.y;

            let openRight = true;
            let openBottom = true;

            if (position.x + menuW + triggerW > screenW) {
                positionX = screenW - menuW - triggerW;
                openRight = false;
            }

            if (position.y + menuH + triggerH > screenH) {
                positionY = screenH - menuH - triggerH;
                openBottom = false;
            }

            if (openRight && openBottom) {
                this.setX(positionX);
                this.setY(positionY + triggerH);
            } else if (openRight && !openBottom) {
                this.setX(positionX + triggerW);
                this.setY(positionY);
            } else if (!openRight && openBottom) {
                /*abajo izq: Works!*/
                this.setX(positionX + triggerW);
                this.setY(positionY + triggerH);
            } else if (!openRight && !openBottom) {
                this.setX(positionX + triggerW);
                this.setY(positionY - triggerH);
            }

            //this.setY(positionY);
        }
    }

    public optionClicked(clickedOption: IWidget): void {
        this.subscribers.forEach((callback) => {
            if (callback.event == "option-clicked") {
                callback.then(new Event("option-clicked"), clickedOption);
            }
        });
        this.close();
    }

    public clearOptions(): void {
        this.options.clear();
        this.removeAllChilds();
        this.withCalculation = false;
    }

    addOption(id: string, icon: string, label: string) {
        const newOption = new IconButton(id, icon, this);
        newOption.setType(WidgetTypes.FREE);
        newOption.setAlign(WidgetAlignTypes.HORIZONTAL);
        newOption.setText(label);
        newOption.addClass("WUIMenuOptions");

        newOption.subscribe({
            event: "click",
            then: (_e, a) => {
                const option = a as IconButton;

                this.optionClicked(option);
            },
        });

        this.options.set(id, newOption);
    }
}
