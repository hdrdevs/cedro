import { DataGrid, IconButton, Label } from "../../ui";
import { Application, WidgetAlignTypes } from "../../index";

class WorkingApp extends Application {
    grid: DataGrid;

    constructor() {
        super("Working App - Toolbar");
        this.getRoot().setAlign(WidgetAlignTypes.VERTICAL);

        this.grid = new DataGrid("grid");

        this.grid.setRowHeight(30);

        this.grid.addColumn("Nombre", 200, (args) => {
            args.row.addChild(new Label(args.fieldId));
            const lbl = window.w.get(args.fieldId) as Label;
            lbl.setText(args.data.name);
            lbl.getBody().style.lineHeight = "30px";
            lbl.getBody().style.paddingLeft = "5px";
        });

        this.grid.addColumn("Edad", 70, (args) => {
            args.row.addChild(new Label(args.fieldId));
            const lbl = window.w.get(args.fieldId) as Label;
            lbl.setText(args.data.years);
            lbl.getBody().style.textAlign = "right";
            lbl.getBody().style.lineHeight = "30px";
            lbl.getBody().style.paddingRight = "5px";

            if (args.data.years < 20) {
                lbl.getBody().style.color = "green";
            } else if (args.data.years < 55) {
                lbl.getBody().style.color = "#ff9900";
            } else {
                lbl.getBody().style.color = "red";
            }
        });

        this.grid.addColumn("Nacionalidad", 150, (args) => {
            args.row.addChild(new Label(args.fieldId));
            const lbl = window.w.get(args.fieldId) as Label;
            lbl.setText(args.data.country);
            lbl.getBody().style.lineHeight = "30px";
            lbl.getBody().style.paddingLeft = "5px";
        });

        this.grid.addColumn("&nbsp;", 40, (args) => {
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
            { name: "Ana González", years: 19, country: "Colombia" },
            { name: "Diego Martínez", years: 55, country: "Chile" },
            { name: "Carla Sánchez", years: 37, country: "Perú" },
            { name: "Pedro Ramírez", years: 41, country: "Ecuador" },
            { name: "Laura Rodríguez", years: 23, country: "Venezuela" },
            { name: "José Fernández", years: 64, country: "Uruguay" },
            { name: "Sofía López", years: 50, country: "Paraguay" },
            { name: "Luis Pérez", years: 29, country: "Argentina" },
            { name: "María García", years: 18, country: "España" },
            { name: "Juan Hernández", years: 36, country: "México" },
            { name: "Ana Díaz", years: 47, country: "Colombia" },
            { name: "Diego Ruiz", years: 22, country: "Chile" },
            { name: "Carla Flores", years: 33, country: "Perú" },
            { name: "Pedro Acosta", years: 59, country: "Ecuador" },
            { name: "Laura Gómez", years: 43, country: "Venezuela" },
            { name: "José Suárez", years: 39, country: "Uruguay" },
            { name: "Sofía Castro", years: 26, country: "Paraguay" },
            { name: "Juan Mendoza", years: 60, country: "Argentina" },
            { name: "María Ortiz", years: 14, country: "España" },
            { name: "Luis Morales", years: 25, country: "México" },
            { name: "Ana Vargas", years: 36, country: "Colombia" },
            { name: "Diego Herrera", years: 40, country: "Chile" },
            { name: "Carla Jiménez", years: 51, country: "Perú" },
            { name: "Pedro Medina", years: 30, country: "Ecuador" },
            { name: "Laura Navarro", years: 65, country: "Venezuela" },
            { name: "José Torres", years: 22, country: "Uruguay" },
            { name: "Sofía Méndez", years: 38, country: "Paraguay" },
            { name: "Juan Ruiz", years: 46, country: "Argentina" },
            { name: "María Salazar", years: 37, country: "España" },
            { name: "Luis Castro", years: 28, country: "México" },
            { name: "Ana Sánchez", years: 55, country: "Colombia" },
            { name: "Diego Martínez", years: 22, country: "Chile" },
        ]);
    }

    init() {
        super.init();
        this.root.render();
        this.theme.setTheme("dark");

        const headerEdad = this.grid.getHeader(1);
        headerEdad.getBody().style.fontWeight = "bold";
        headerEdad.getBody().style.color = "#ff9900";
    }
}

export const workingApp = new WorkingApp();

workingApp.init();
