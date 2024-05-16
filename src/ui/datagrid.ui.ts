import "./styles/datagrid.css";
import { Label } from "./label.ui";
import { Widget, WidgetAlignTypes, WidgetTypes } from "./widget.ui";
import { Scroll } from "./scroll.ui";

const DATA_GRID_HEADER_HEIGHT = 30;
const DATA_GRID_FOOTER_HEIGHT = 40;
const DATA_GRID_ROW_HEIGHT = 20;
const DATA_GRID_MIN_COLUMN_WIDTH = 24;

type DataGridColumn = {
    header: string;
    width: number | null;
    handler: (args: any) => void;
};

export class DataGrid extends Widget {
    headerContainer: Widget;
    dataContainer: Widget;
    footerContainer: Widget;
    data: Array<any>;
    verticalScrollbar: Scroll;

    rowHeight: number;

    columns: Array<DataGridColumn>;

    constructor(id: string, parent: Widget | null = null) {
        super(id, "div", parent);

        this.rowHeight = DATA_GRID_ROW_HEIGHT;

        this.headerContainer = new Widget(id + ".header", "div");
        this.headerContainer.setType(WidgetTypes.FILL);
        this.headerContainer.setFixedSize(DATA_GRID_HEADER_HEIGHT);
        this.headerContainer.addClass("WUIDataGrid-Header");

        this.dataContainer = new Widget(id + ".data", "div");
        this.dataContainer.setType(WidgetTypes.FILL);

        this.footerContainer = new Widget(id + ".footer", "div");
        this.footerContainer.setType(WidgetTypes.FILL);
        this.footerContainer.setFixedSize(DATA_GRID_FOOTER_HEIGHT);

        this.setType(WidgetTypes.FILL);
        this.setAlign(WidgetAlignTypes.VERTICAL);

        this.addChild(this.headerContainer);
        this.addChild(this.dataContainer);
        this.addChild(this.footerContainer);

        this.verticalScrollbar = new Scroll(id + ".scrollbar", this.dataContainer);

        this.columns = new Array<DataGridColumn>();

        this.data = new Array<any>();
    }

    private getFreeWidth(): number {
        let freeW = 0;
        for (let i = 0; i < this.columns.length; i++) {
            let width = this.columns[i].width;
            if (width) {
                freeW += width;
            }
        }

        freeW = this.dataContainer.getW() - freeW;

        if (freeW < DATA_GRID_MIN_COLUMN_WIDTH) {
            freeW = DATA_GRID_MIN_COLUMN_WIDTH;
        }
        return freeW;
    }

    public init(): void {
        super.init();

        this.createHeaders();
    }

    private createHeaders(): void {
        if (!this.columns) {
            return;
        }

        for (let i = 0; i < this.columns.length; i++) {
            const btn = new Label(this.id + "header." + i, "span");
            btn.addClass("WUIDataGrid-HeaderLabel");
            this.headerContainer.addChild(btn);
        }

        this.buildRows();
        this.renderHeaders();
    }

    private renderHeaders(): void {
        if (!this.columns) {
            return;
        }

        let startX = 0;
        for (let i = 0; i < this.columns.length; i++) {
            const column = this.columns[i];
            const btn = window.w.get(this.id + "header." + i) as Label;
            const width = column.width ? column.width : this.getFreeWidth();
            btn.setType(WidgetTypes.CUSTOM);
            btn.setX(startX);
            btn.setY(0);
            btn.setW(width);
            btn.setH(DATA_GRID_HEADER_HEIGHT);
            btn.getBody().style.lineHeight = DATA_GRID_HEADER_HEIGHT + "px";
            btn.setText(column.header);
            this.headerContainer.addChild(btn);
            startX += width;
        }
    }

    private buildRows(): void {
        let rowY = 0;

        for (let i = 0; i < this.data.length; i++) {
            const row = new Widget(this.id + ".row." + i, "div");

            row.setType(WidgetTypes.CUSTOM);
            row.getBody().style.position = "absolute";
            row.getBody().style.overflow = "hidden";

            this.dataContainer.addChild(row);

            for (let j = 0; j < this.columns.length; j++) {
                const column = this.columns[j];
                const fieldId = this.id + ".row." + i + ".column." + j;
                column.handler({
                    data: this.data[i],
                    index: i,
                    fieldId: fieldId,
                    row: row,
                });
                const columnWidget = window.w.get(fieldId) as Widget;
                columnWidget.getBody().style.position = "absolute";
            }
            rowY += this.rowHeight;
        }
    }

    private renderRows(): void {
        let rowY = 0;

        for (let i = 0; i < this.data.length; i++) {
            const row = window.w.get(this.id + ".row." + i) as Widget;

            row.setX(0);
            row.setY(rowY);
            row.setW(this.dataContainer.getW());
            row.setH(this.rowHeight);

            let widgetX = 0;
            for (let j = 0; j < this.columns.length; j++) {
                const column = this.columns[j];
                const fieldId = this.id + ".row." + i + ".column." + j;
                const columnWidget = window.w.get(fieldId) as Widget;
                columnWidget.setY(0);
                columnWidget.setX(widgetX);
                columnWidget.setH(this.rowHeight);
                if (column.width) {
                    columnWidget.setW(column.width);
                } else {
                    columnWidget.setW(this.getFreeWidth());
                }
                widgetX += column.width ? column.width : columnWidget.getW();
            }
            rowY += this.rowHeight;
        }
    }

    public render(): void {
        super.render();
        this.renderHeaders();
        this.renderRows();
        this.verticalScrollbar.render();
    }

    public setRowHeight(rowHeight: number): void {
        this.rowHeight = rowHeight;
    }

    public addColumn(header: string, width: number | null, handler: (args: any) => void) {
        this.columns.push({ header, width, handler });
    }

    public getHeader(index: number): Label {
        return window.w.get(this.id + "header." + index) as Label;
    }

    public setData(data: Array<any>): void {
        this.data = data;

        this.buildRows();
        this.renderRows();
    }
}
