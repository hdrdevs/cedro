import { Button } from "./button.ui";
import { Menu } from "./menu.ui";
import { SelectItem } from "./select.ui";

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
