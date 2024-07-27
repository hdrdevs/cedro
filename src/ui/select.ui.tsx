import "./styles/select.css";
import { IconButton } from "./IconButton.ui";
import { Menu } from "./menu.ui";
import { Widget } from "./widget.ui";
import { SelectItem } from "../types/select.item.type";
import { normalizeWidget, WidgetProps } from "./widget.builder";
import { UID } from "../core/uid";

export class Select extends Widget {
    menu: Menu;
    text: string;
    title: string;

    items: SelectItem[];

    selectedItem: SelectItem | null;

    constructor(id: string, parent: Widget | null = null) {
        super(id, "div", parent);
        this.menu = new Menu(this.id + ".menu", this.id, null);
        this.text = "";
        this.title = "";
        this.addClass("WUISelect");
        this.items = [];
        this.selectedItem = null;
        this.subscribe({
            event: "click",
            then: () => {
                this.menu.clearOptions();
                this.items.forEach((item) => {
                    this.menu.addOption(item.id, item.icon, item.label);
                });

                this.menu.wakeUp();

                if (this.getBody().clientWidth > this.menu.getBody().clientWidth) {
                    this.menu.setW(this.getBody().clientWidth);
                    this.menu.resize();
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
                }

                const selectedText = this.selectedItem?.label;
                if (selectedText) {
                    this.setValue(selectedText);
                } else {
                    this.setValue("");
                }
            },
        });
    }

    public setValue(value: string) {
        this.text = value;
    }

    public setTitle(title: string) {
        this.title = title;
    }

    addItem(id: string, label: string, icon: string) {
        this.items.push(new SelectItem(id, label, icon));
    }
}

export type WSelectProps = WidgetProps & {
    title?: string;
    value?: string;
    children: any;
};

export type WSelectItemProps = {
    id: string;
    label?: string | null;
    icon?: string | null;
};

export const WSelect = (props: WSelectProps) => {
    if (!props.id) {
        props.id = "Select." + UID();
    }

    return normalizeWidget(
        <div id={props.id} w-select w-title={props.title} w-value={props.value}>
            {props.children}
        </div>,
        props
    );
};

export const WSelectItem = (props: WSelectItemProps) => {
    return <div w-select-item id={props.id} w-label={props.label} w-icon={props.icon}></div>;
};

export function createSelect(id: string, content: any, parent: Widget | null = null): Select {
    let newSelect = new Select(id, parent);

    const dataTitle = content.getAttribute("w-title");
    const dataValue = content.getAttribute("w-value");
    const dataWidth = content.getAttribute("w-width");
    const dataHeight = content.getAttribute("w-height");

    if (dataTitle) {
        newSelect.setTitle(dataTitle);
    }

    if (dataValue) {
        newSelect.setValue(dataValue);
    }

    if (dataWidth) {
        newSelect.setInitialW(dataWidth);
    }

    if (dataHeight) {
        newSelect.setInitialH(dataHeight);
    }

    content.childNodes.forEach((menuItem: HTMLElement, index: number) => {
        if (menuItem.getAttribute("w-select-item") !== null) {
            const itemId = menuItem.getAttribute("id");
            const itemLabel = menuItem.getAttribute("w-label");
            const itemIcon = menuItem.getAttribute("w-icon");

            if (itemId !== null) {
                newSelect.addItem(itemId, itemLabel || "Unnamed" + index, itemIcon || "");
            }
        }
    });

    return newSelect;
}
