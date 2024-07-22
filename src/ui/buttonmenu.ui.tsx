import { SelectItem } from "../types/select.item.type";
import { Button, wButtonProps } from "./button.ui";
import { Menu } from "./menu.ui";
import { normalizeWidget, WidgetProps } from "./widget.builder";
import { Widget } from "./widget.ui";

export class ButtonMenu extends Button {
    menu: Menu;
    items: Array<SelectItem>;
    selectedItem: SelectItem | null;

    public constructor(id: string) {
        super(id);

        this.menu = new Menu(this.id + ".menu", this.id, null);

        this.items = new Array<SelectItem>();
        this.selectedItem = null;

        this.subscribe({
            event: "click",
            then: () => {
                this.menu.clearOptions();
                this.items.forEach((item) => {
                    this.menu.addOption(item.id, item.icon, item.label);
                });

                this.menu.wakeUp();

                if (this.getW() > this.menu.getW()) {
                    this.menu.setW(this.getBody().clientWidth);
                    console.log("cambiando ancho...");
                }
            },
        });

        /*this.menu.subscribe({
            event: "option-clicked",
            then: (_e, clickedOption) => {
                const option = clickedOption as IconButton;

                const fintOption = this.items.find((item) => item.id === option.id);

                if (fintOption) {
                    this.selectedItem = fintOption;
                }

                const selectedText = this.selectedItem?.label;
                if (selectedText) {
                    this.setText(selectedText);
                } else {
                    this.setText("");
                }
            },
        });*/
    }

    public addItem(id: string, label: string, icon: string): void {
        this.items.push(new SelectItem(id, label, icon));
    }
}

export type WButtonMenuProps = WidgetProps &
    wButtonProps & {
        children: any;
    };

export type WButtonMenuItemProps = {
    id: string;
    label?: string | null;
    icon?: string | null;
};

export const WButtonMenu = (props: WButtonMenuProps) => {
    return normalizeWidget(
        <div
            id={props.id}
            w-button-menu
            w-text={props.text}
            w-variant={props.variant}
            w-color={props.color}
        >
            {props.children}
        </div>,
        props
    );
};

export const WButtonMenuItem = (props: WButtonMenuItemProps) => {
    return <div w-button-menu-item id={props.id} w-label={props.label} w-icon={props.icon}></div>;
};

export function createButtonMenu(
    id: string,
    content: any,
    _parent: Widget | null = null
): ButtonMenu {
    let newButtonMenu = new ButtonMenu(id);

    const btnText = content.getAttribute("w-text");
    const btnColor = content.getAttribute("w-color");
    const btnVariant = content.getAttribute("w-variant");

    if (btnText) {
        newButtonMenu.setText(btnText);
    }

    if (btnColor) {
        newButtonMenu.setColor(btnColor);
    }

    if (btnVariant) {
        newButtonMenu.setVariant(btnVariant);
    }

    content.childNodes.forEach((menuItem: HTMLElement, index: number) => {
        if (menuItem.getAttribute("w-button-menu-item") !== null) {
            const itemId = menuItem.getAttribute("id");
            const itemLabel = menuItem.getAttribute("w-label");
            const itemIcon = menuItem.getAttribute("w-icon");

            if (itemId !== null) {
                newButtonMenu.addItem(itemId, itemLabel || "Unnamed" + index, itemIcon || "");
            }
        }
    });

    return newButtonMenu;
}
