import "./styles/menu.css";
import { IWidget } from "../interfaces/widget.interface";
import { IconButton } from "./IconButton.ui";
import { Widget, WidgetAlignTypes, WidgetTypes } from "./widget.ui";

const MENU_OPTION_HEIGHT = 40;

export class Menu extends Widget {
    background: Widget;
    options: Map<string, IconButton>;
    optionsWidth: Array<number>;
    triggeredById: string | null;
    triggeredBy: IWidget | null;
    triggeredBySearchCode: any;

    constructor(id: string, trigeredById: string | null, parent: IWidget | null = null) {
        super(id, "div", parent);

        this.background = new Widget(this.id + ".background", "div", null);
        this.background.setType(WidgetTypes.CUSTOM);
        this.background.addClass("WUIMenuBackground");
        this.background.setVisible(false);

        this.triggeredById = trigeredById;
        this.setType(WidgetTypes.CUSTOM);
        this.setAlign(WidgetAlignTypes.VERTICAL);
        this.setPadding(4);

        this.triggeredBy = null;

        this.options = new Map<string, IconButton>();
        this.optionsWidth = new Array<number>();

        this.addClass("WUIMenu");
        this.addClass("WUIMenuTransparent");

        this.triggeredBySearchCode = setInterval(() => {
            if (!this.triggeredById) {
                clearInterval(this.triggeredBySearchCode);
                return;
            }

            if (window.w.get(this.triggeredById)) {
                this.triggeredBy = window.w.get(this.triggeredById) as IWidget;

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
        this.deleteClass("WUIMenuTransparent");
        this.deleteClass("WUIMenuVisible");
        this.addClass("WUIMenuHidden");
        this.background.setVisible(false);
    }

    private getMaxWidth(): number {
        return Math.max(...this.optionsWidth) * 1.1;
    }

    wakeUp(): void {
        const maxWidth = this.getMaxWidth();
        let menuWidth = 0;
        if (this.triggeredBy) {
            const triggerWidth = this.triggeredBy.getBody().clientWidth;
            if (triggerWidth > maxWidth) {
                menuWidth = triggerWidth;
            } else {
                menuWidth = maxWidth;
            }
        } else {
            menuWidth = maxWidth;
        }

        this.setW(menuWidth);

        this.background.setVisible(true);
        this.background.raisteTop();

        this.raisteTop();

        this.deleteClass("WUIMenuHidden");
        this.addClass("WUIMenuVisible");

        this.render();

        if (this.triggeredBy) {
            const position = this.triggeredBy.getPosition(false);

            //const triggerW = this.triggeredBy.getBody().clientWidth;
            const triggerH = this.triggeredBy.getBody().clientHeight;

            const screenW = window.innerWidth;
            const screenH = window.innerHeight;
            const menuW = menuWidth;
            const menuH = this.getBody().clientHeight;
            let positionX = position.x;
            let positionY = position.y;

            let openRight = true;
            let openBottom = true;

            if (position.x + menuW > screenW) {
                positionX = screenW - menuW;
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
                this.setX(positionX);
                this.setY(positionY);
            } else if (!openRight && openBottom) {
                /*abajo izq: Works!*/
                this.setX(positionX);
                this.setY(positionY + triggerH);
            } else if (!openRight && !openBottom) {
                this.setX(positionX);
                this.setY(positionY - triggerH);
            }
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
        this.optionsWidth = new Array<number>();
        this.options.clear();
        this.removeAllChilds();
    }

    addOption(id: string, icon: string, label: string) {
        const newOption = new IconButton(id, icon, null);
        newOption.setType(WidgetTypes.FILL);
        newOption.setAlign(WidgetAlignTypes.VERTICAL);
        newOption.setText(label);
        newOption.setFixedSize(MENU_OPTION_HEIGHT);
        newOption.addClass("WUIMenuOptions"); //Esta linea estaba comentada. Con esto se soliciono el ancho del menu
        //newOption.setH(MENU_OPTION_HEIGHT);

        newOption.subscribe({
            event: "click",
            then: (_e, a) => {
                const option = a as IconButton;

                this.optionClicked(option);
            },
        });

        this.options.set(id, newOption);

        const width = newOption.getBody().clientWidth;
        this.optionsWidth.push(width);
        const height = this.options.size * MENU_OPTION_HEIGHT;
        this.addChild(newOption);
        this.setH(height);
    }
}
