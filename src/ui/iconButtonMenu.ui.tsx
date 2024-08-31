import { IconButton, wIconButtonProps } from "./IconButton.ui";
import { Menu } from "./menu.ui";
import { SelectItem } from "../types/select.item.type";
import { connectWidgetCallback, getOnlyEventProps, Widget } from "./widget.ui";
import { UID } from "../core/uid";
import { connectCustomWidget } from "./widget.collection";
import { IWidget } from "../interfaces/widget.interface";
import { WidgetProps } from "./widget.types";
import { normalizeWidget } from "./widget.normalize";

export class IconButtonMenu extends IconButton {
    menu: Menu;
    items: Array<SelectItem>;
    selectedItem: SelectItem | null;

    whenOptionClicked: (args: any) => {} | void;

    public constructor(id: string, icon: string) {
        super(id, icon);

        this.whenOptionClicked = () => {};

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
                }
            },
        });

        this.menu.subscribe({
            event: "option-clicked",
            then: (_e, clickedOption) => {
                const option = clickedOption as IconButton;
                const fintOption = this.items.find((item) => item.id === option.id);

                if (fintOption) {
                    this.selectedItem = fintOption;
                    this.whenOptionClicked({ id: fintOption.id });
                }

                // const selectedText = this.selectedItem?.label;
                // if (selectedText) {
                //     this.setText(selectedText);
                // } else {
                //     this.setText("");
                // }
            },
        });
    }

    public setOnOptionClicked(cb: ({}) => {} | void) {
        this.whenOptionClicked = cb;
    }

    public addItem(id: string, label: string, icon: string): void {
        this.items.push(new SelectItem(id, label, icon));
    }
}

export type WIconButtonMenuProps = WidgetProps &
    wIconButtonProps & {
        icon?: string | null;
        onOptionClicked?: (args: any) => {} | void;
        children: any;
    };

export type WIconButtonMenuItemProps = {
    id: string;
    label?: string | null;
    icon?: string | null;
};

export const WIconButtonMenu = (props: WIconButtonMenuProps) => {
    if (!props.id) {
        props.id = "IconButtonMenu." + UID();
    }

    connectWidgetCallback(props.id, getOnlyEventProps(props));

    connectCustomWidget("widget-custom-added-" + props.id, {
        event: "widget-load",
        then: (_e: Event, _w: IWidget | null) => {
            if (!props.id) return;
            const widget = w.get(props.id) as IconButtonMenu;

            if (props.onOptionClicked) {
                widget.setOnOptionClicked(props.onOptionClicked);
            }
        },
    });

    return normalizeWidget(
        <div
            id={props.id}
            w-icon-button-menu
            w-text={props.text}
            w-icon={props.icon}
            w-variant={props.variant}
            w-color={props.color}
            w-width={props.width}
            w-height={props.height}
        >
            {props.children}
        </div>,
        props
    );
};

export const WIconButtonMenuItem = (props: WIconButtonMenuItemProps) => {
    return (
        <div w-icon-button-menu-item id={props.id} w-label={props.label} w-icon={props.icon}></div>
    );
};

export function createIconButtonMenu(
    id: string,
    content: any,
    _parent: Widget | null = null
): IconButtonMenu {
    const btnIcon = content.getAttribute("w-icon");
    const btnText = content.getAttribute("w-text");
    const btnColor = content.getAttribute("w-color");
    const btnVariant = content.getAttribute("w-variant");
    const dataWidth = content.getAttribute("w-width");
    const dataHeight = content.getAttribute("w-height");

    let newIconButtonMenu = new IconButtonMenu(id, btnIcon || "home");

    if (btnText) {
        newIconButtonMenu.setText(btnText);
    }

    if (btnColor) {
        newIconButtonMenu.setColor(btnColor);
    }

    if (btnVariant) {
        newIconButtonMenu.setVariant(btnVariant);
    }

    if (dataWidth) {
        newIconButtonMenu.setInitialW(dataWidth);
    }

    if (dataHeight) {
        newIconButtonMenu.setInitialH(dataHeight);
    }

    content.childNodes.forEach((menuItem: HTMLElement, index: number) => {
        if (menuItem.getAttribute("w-icon-button-menu-item") !== null) {
            const itemId = menuItem.getAttribute("id");
            const itemLabel = menuItem.getAttribute("w-label");
            const itemIcon = menuItem.getAttribute("w-icon");

            if (itemId !== null) {
                newIconButtonMenu.addItem(itemId, itemLabel || "Unnamed" + index, itemIcon || "");
            }
        }
    });

    return newIconButtonMenu;
}
