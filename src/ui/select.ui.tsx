import { IconButton } from "./IconButton.ui";
import { Menu } from "./menu.ui";
import { Textbox } from "./textbox.ui";
import { Widget } from "./widget.ui";
import { SelectItem } from "../types/select.item.type";

export class Select extends Textbox {
    menu: Menu;

    items: SelectItem[];

    selectedItem: SelectItem | null;

    constructor(id: string, parent: Widget | null = null) {
        super(id, parent);
        this.menu = new Menu(this.id + ".menu", this.id, null);
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

                console.log(this.getBody().clientWidth, this.menu.getBody().clientWidth);

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

    addItem(id: string, label: string, icon: string) {
        this.items.push(new SelectItem(id, label, icon));
    }
}
