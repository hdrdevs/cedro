import { WidgetTypes } from "../../../../index";
import { Button, ButtonMenu, IconButton, Toolbar } from "../../../../ui";
import { widgetFactory } from "../../widget-factory.working";

export class mainToolbar extends Toolbar {
    btn1: IconButton;
    btn2: IconButton;
    btn4: IconButton;
    btn5: IconButton;
    btnSearch: IconButton;

    btnSel: ButtonMenu;

    constructor() {
        super("mainToolbar");
        this.setOrientation("horizontal");
        this.setType(WidgetTypes.FILL);
        this.setFixedSize(45);

        this.btn1 = new IconButton("btn1", "note_add");
        this.btn1.setText("New");
        this.btn1.setW(90);
        this.btn1.setVariant("contained");
        this.btn1.setColor("success");
        this.btn1.subscribe({
            event: "click",
            then: () => {
                widgetFactory.alert("New item");
            },
        });

        this.btn2 = new IconButton("btn2", "save");
        this.btn2.setText("Save");
        this.btn2.setW(100);
        this.btn2.subscribe({
            event: "click",
            then: () => {
                widgetFactory.alert("Save all");
            },
        });

        this.btn4 = new IconButton("btn4", "delete");
        this.btn4.setText("Delete");
        this.btn4.setW(120);
        this.btn4.setVariant("contained");
        this.btn4.setColor("error");
        this.btn4.subscribe({
            event: "click",
            then: () => {
                widgetFactory.alert("Delete item");
            },
        });

        this.btn5 = new IconButton("btn5", "edit_square");
        this.btn5.setText("Edit");
        this.btn5.setW(90);
        this.btn5.subscribe({
            event: "click",
            then: () => {
                widgetFactory.alert("Edit  item");
            },
        });

        this.btnSearch = new IconButton("btnSearch", "pageview");
        this.btnSearch.setText("Search");
        this.btnSearch.setW(120);
        this.btnSearch.subscribe({
            event: "click",
            then: () => {
                widgetFactory.alert("Filter by...");
            },
        });

        this.btnSel = new ButtonMenu("btnSel");
        this.btnSel.setText("Actions");
        this.btnSel.addItem("item1", "Repair all", "add");
        this.btnSel.addItem("item2", "Print all", "list");
        this.btnSel.addItem("item3", "Get broken cars", "save");
        this.btnSel.addItem("item4", "Get old cars", "draw");
        this.btnSel.addItem("item5", "Get moder cars", "list");
        this.btnSel.addItem("item6", "Sell unused cars", "save");

        this.addItem("btn1", this.btn1);
        this.addItem("btn5", this.btn5);
        this.addItem("btn2", this.btn2);
        this.addItem("btn4", this.btn4);
        this.addItem("toolItemSearch", this.btnSearch);
        this.addItem("btnSel", this.btnSel);
    }
}
