import { DataGrid, IconButton, Label } from "../../ui";
import { Application, WidgetAlignTypes } from "../../index";

class WorkingApp extends Application {
    grid: DataGrid;

    constructor() {
        super("Working App - Toolbar");
        this.getRoot().setAlign(WidgetAlignTypes.VERTICAL);

        this.grid = new DataGrid("grid");

        this.grid.setRowHeight(30);

        this.grid.addColumn("Nombre", 200, "name", (args) => {
            args.row.addChild(new Label(args.fieldId));
            const lbl = window.w.get(args.fieldId) as Label;
            lbl.setText(args.data.name);
            lbl.getBody().style.lineHeight = "30px";
            lbl.getBody().style.paddingLeft = "5px";
        });

        this.grid.addColumn("Edad", 70, "years", (args) => {
            args.row.addChild(new Label(args.fieldId));
            const lbl = window.w.get(args.fieldId) as Label;
            lbl.setText(args.data.years);
            lbl.getBody().style.textAlign = "right";
            lbl.getBody().style.lineHeight = "30px";
            lbl.getBody().style.paddingRight = "5px";
        });

        this.grid.addColumn("Nacionalidad", 150, "country", (args) => {
            args.row.addChild(new Label(args.fieldId));
            const lbl = window.w.get(args.fieldId) as Label;
            lbl.setText(args.data.country);
            lbl.getBody().style.lineHeight = "30px";
            lbl.getBody().style.paddingLeft = "5px";
        });

        this.grid.addColumn("&nbsp;", 40, "test", (args) => {
            args.row.addChild(new IconButton(args.fieldId, "delete"));
            const btn = window.w.get(args.fieldId) as IconButton;

            btn.subscribe({
                event: "click",
                then: () => {
                    this.alert("Desea eliminar a " + args.data.name);
                },
            });
            btn.setVariant("text");
            btn.setColor("error");
        });

        this.getRoot().addChild(this.grid);

        this.grid.setData([
            { name: "Horacio", years: 40, country: "Argentina" },
            { name: "Luna", years: 13, country: "Argentina" },
            { name: "Eliot", years: 3, country: "Argentina" },
        ]);
    }

    init() {
        super.init();
        this.root.render();
        this.theme.setTheme("dark");

        const headerEdad = this.grid.getHeader(1);
        headerEdad.getBody().style.fontWeight = "bold";
    }
}

export const workingApp = new WorkingApp();

workingApp.init();
