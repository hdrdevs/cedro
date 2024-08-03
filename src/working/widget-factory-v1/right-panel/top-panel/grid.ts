import { Checkbox, DataGrid, IconButton, Label, ProgressBar } from "../../../../ui";
import { widgetFactory } from "../../";

const GRID_ROW_HEIGHT = 30;

export class ExampleGrid extends DataGrid {
    constructor() {
        super("exampleGrid");
        this.setRowHeight(GRID_ROW_HEIGHT);
        this.hideFooter();

        this.addColumn("&nbsp;", 40, (args) => {
            args.row.addChild(new Checkbox(args.fieldId));
            const chk = window.w.get(args.fieldId) as Checkbox;
            chk.setState(args.data.available);
        });

        this.addColumn("Description", 200, (args) => {
            args.row.addChild(new Label(args.fieldId));
            const lbl = window.w.get(args.fieldId) as Label;
            lbl.setText(args.data.description);
            lbl.getBody().style.lineHeight = GRID_ROW_HEIGHT + "px";
            lbl.getBody().style.paddingLeft = "5px";
        });

        this.addColumn("License", 100, (args) => {
            args.row.addChild(new Label(args.fieldId));
            const lbl = window.w.get(args.fieldId) as Label;
            lbl.setText(args.data.licensePlate);
            lbl.getBody().style.lineHeight = GRID_ROW_HEIGHT + "px";
            lbl.getBody().style.paddingLeft = "5px";
        });

        this.addColumn("Year", 100, (args) => {
            args.row.addChild(new Label(args.fieldId));
            const lbl = window.w.get(args.fieldId) as Label;
            lbl.setText(args.data.year);
            lbl.getBody().style.lineHeight = GRID_ROW_HEIGHT + "px";
            lbl.getBody().style.paddingLeft = "5px";
        });

        this.addColumn("Status", 100, (args) => {
            args.row.addChild(new ProgressBar(args.fieldId));
            const progress = window.w.get(args.fieldId) as ProgressBar;
            progress.setValue(args.data.maintenanceStatus);
            progress.setPaddingBar(4);
        });

        this.addColumn("&nbsp;", 40, (args) => {
            args.row.addChild(new IconButton(args.fieldId, "delete"));
            const btn = window.w.get(args.fieldId) as IconButton;

            //Handling click event
            btn.subscribe({
                event: "click",
                then: () => {
                    widgetFactory.alert(
                        "Untitled",
                        "Are you sure you want to delete <strong>" +
                            args.data.description +
                            "</strong>"
                    );
                },
            });
            btn.setVariant("text");
            btn.setColor("error");
        });
    }
}
