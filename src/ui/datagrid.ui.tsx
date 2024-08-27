import "./styles/datagrid.css";
import { Label } from "./label.ui";
import { Widget, WidgetAlignTypes, WidgetTypes } from "./widget.ui";
import { Scroll } from "./scroll.ui";
import { normalizeWidget, WidgetEventProps, WidgetProps } from "./widget.builder";
import { UID } from "../core/uid";
import { decode } from "html-entities";
import { Button } from "./button.ui";
import { IconButton } from "./IconButton.ui";
import { ProgressBar } from "./progressbar.ui";

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
    horizontalScrollbar: Scroll;

    rowHeight: number;

    columns: Array<DataGridColumn>;

    /**
     * Initializes a new instance of the DataGrid class.
     *
     * @param {string} id - The unique identifier for the DataGrid instance.
     * @param {Widget|null} parent - The parent widget of the DataGrid instance.
     * @return {void}
     */
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

        this.verticalScrollbar = new Scroll(id + ".VerticalScrollbar", this.dataContainer);
        this.horizontalScrollbar = new Scroll(
            id + ".HorizontalScrollbar",
            this.dataContainer,
            "horizontal"
        );

        this.horizontalScrollbar.subscribe({
            event: "scroll",
            then: (_e, _w) => {
                this.renderHeaders();
            },
        });

        this.columns = new Array<DataGridColumn>();

        this.data = new Array<any>();

        this.addClass("WUIDataGrid");
    }

    public hideFooter(): void {
        this.footerContainer.setFixedSize(0);
    }

    public showFooter(): void {
        this.footerContainer.setFixedSize(DATA_GRID_FOOTER_HEIGHT);
    }

    /**
     * Calculates the free width available in the data grid.
     *
     * The free width is calculated by subtracting the total width of all columns from the width of the data container.
     * If the calculated free width is less than the minimum allowed column width, it is set to the minimum allowed column width.
     *
     * @return {number} The free width available in the data grid.
     */
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

    /**
     * Calculates the total width of all columns in the data grid.
     *
     * @return {number} The total width of all columns.
     */
    private getAllColumnsWidth(): number {
        let returnValue = 0;
        for (let i = 0; i < this.columns.length; i++) {
            let width = this.columns[i].width;
            if (width) {
                returnValue += width;
            }
        }
        return returnValue;
    }

    public init(): void {
        super.init();
        this.createHeaders();
    }

    /**
     * Creates the headers for the data grid based on the provided columns.
     *
     * If no columns are provided, the function will return immediately.
     *
     * @return {void}
     */
    private createHeaders(): void {
        if (!this.columns) {
            return;
        }

        for (let i = 0; i < this.columns.length; i++) {
            const btn = new Label(this.id + "header." + i, "span");
            btn.addClass("WUIDataGrid-HeaderLabel");
            this.headerContainer.addChild(btn);
        }

        this.renderHeaders();
    }

    /**
     * Renders the headers of the data grid based on the provided columns.
     *
     * If no columns are provided, the function will return immediately.
     *
     * The headers are rendered as custom labels with their positions and sizes
     * calculated based on the column widths and the scroll position of the data container.
     *
     * @return {void}
     */
    private renderHeaders(): void {
        if (!this.columns) {
            return;
        }

        let startX = -this.dataContainer.getBody().scrollLeft;
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

    /**
     * Builds the rows of the data grid based on the provided data and columns.
     *
     * This function iterates over the data and creates a new row widget for each item.
     * It then iterates over the columns and calls the column handler to render the cell content.
     * The row and column widgets are positioned absolutely and added to the data container.
     *
     * @return {void}
     */
    private buildRows(): void {
        console.log("buildRows");

        let rowY = 0;

        for (let i = 0; i < this.data.length; i++) {
            const row = new Widget(this.id + ".row." + i, "div");

            row.setType(WidgetTypes.CUSTOM);
            row.getBody().style.position = "absolute";
            row.getBody().style.overflow = "hidden";
            row.addClass("WUIDataGrid-Row");

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

    /**
     * Renders the rows of the data grid.
     *
     * This function iterates over the data and columns, positioning and sizing each row and column widget accordingly.
     *
     * @return {void}
     */
    private renderRows(): void {
        let rowY = 0;

        for (let i = 0; i < this.data.length; i++) {
            const row = window.w.get(this.id + ".row." + i) as Widget;

            row.setX(0);
            row.setY(rowY);
            row.setW(this.getAllColumnsWidth());
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

    /**
     * Releases all resources held by this data grid.
     *
     * This function iterates over all rows in the data grid and calls the free method on each row widget.
     * It then calls the free method on the superclass to release any additional resources.
     *
     * @return {void}
     */
    public free(): void {
        for (let i = 0; i < this.data.length; i++) {
            const row = window.w.get(this.id + ".row." + i) as Widget;
            if (row) row.free();
        }
        this.verticalScrollbar.free();
        this.horizontalScrollbar.free();
        super.free();
    }

    /**
     * Renders the data grid by calling the superclass's render method and then rendering the headers, rows, and scrollbars.
     *
     * @return {void}
     */
    public render(): void {
        super.render();
        this.renderHeaders();
        this.renderRows();
        this.verticalScrollbar.render();
        this.horizontalScrollbar.render();
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

export type DataGridColumnType =
    | "label"
    | "button"
    | "buttonmenu"
    | "iconbutton"
    | "textbox"
    | "select"
    | "checkbox"
    | "switch"
    | "image"
    | "icon"
    | "valuebar"
    | "progressbar";

export type WDataGridProps = Omit<WidgetProps, "orientation"> & {
    data?: any;
    rowHeight?: number | null;
    children: any;
};

export type WDataGridColumnProps = WidgetEventProps & {
    header?: string | null;
    widgetType?: DataGridColumnType | null;
    field?: string | null;
    width?: number | null;
    classNames?: string | null;
};

var columnPropsBackup: Array<any> = []; //Guarda los eventos asociados a los widgets dentro de las columnas de la grilla.

export const WDataGrid = (props: WDataGridProps) => {
    if (!props.id) {
        props.id = "Grid." + UID();
    }

    return normalizeWidget(
        <div id={props.id} w-data-grid w-data={props.data} w-row-height={props.rowHeight}>
            {props.children}
        </div>,
        props
    );
};

export const WDataGridColumn = (props: WDataGridColumnProps) => {
    columnPropsBackup.push(props);

    return (
        <div
            w-data-grid-column
            w-header={props.header}
            w-widget-type={props.widgetType}
            w-field={props.field}
            w-width={props.width}
            w-class-names={props.classNames}
        ></div>
    );
};

export function createDataGrid(id: string, content: any, parent: Widget | null = null): DataGrid {
    const data = JSON.parse(decode(content.getAttribute("w-data")));
    const rowHeight = content.getAttribute("w-row-height");

    let newGrid = new DataGrid(id, parent);

    if (rowHeight !== null) {
        newGrid.setRowHeight(parseInt(rowHeight));
    } else {
        newGrid.setRowHeight(DATA_GRID_ROW_HEIGHT);
    }

    content.childNodes.forEach((column: HTMLElement, index: number) => {
        if (column.getAttribute("w-data-grid-column") !== null) {
            const columnHeader = column.getAttribute("w-header");
            const columnField = column.getAttribute("w-field");
            const columnWidth = column.getAttribute("w-width");
            const columnType = column.getAttribute("w-widget-type") || "label";
            const columnClassNames = column.getAttribute("w-class-names");

            let props = {} as WidgetProps;

            if (columnPropsBackup[index]) {
                props = columnPropsBackup[index];
            }

            if (columnHeader === null) {
                throw new Error("Data grid column header is null");
            }

            if (columnField === null) {
                throw new Error("Data grid column field is null");
            }

            const width = columnWidth ? parseInt(columnWidth) : 100;

            newGrid.addColumn(columnHeader, width, (args) => {
                if (columnType === "label") {
                    const newLabel = new Label(args.fieldId);

                    args.row.addChild(newLabel);
                    const lbl = window.w.get(args.fieldId) as Label;
                    lbl.setText(args.data[columnField]);
                    if (columnClassNames) {
                        lbl.addClass(columnClassNames);
                    }

                    lbl.subscribe({
                        event: "click",
                        then: (_e, _w) => {
                            if (props.onClick) {
                                props.onClick(args);
                            }
                        },
                    });
                } else if (columnType === "button") {
                    const newButton = new Button(args.fieldId);

                    args.row.addChild(newButton);
                    const btn = window.w.get(args.fieldId) as Button;
                    btn.setVariant("text");
                    btn.setColor("warning");

                    btn.setText(args.data[columnField]);
                    if (columnClassNames) {
                        btn.addClass(columnClassNames);
                    }

                    btn.subscribe({
                        event: "click",
                        then: (_e, _w) => {
                            if (props.onClick) {
                                console.log(args.data[columnField]);
                                props.onClick(args);
                            }
                        },
                    });
                } else if (columnType === "iconbutton") {
                    const newButton = new IconButton(args.fieldId, args.data[columnField]);

                    args.row.addChild(newButton);
                    const btn = window.w.get(args.fieldId) as IconButton;
                    btn.setVariant("text");
                    btn.setColor("primary");

                    if (columnClassNames) {
                        btn.addClass(columnClassNames);
                    }

                    btn.subscribe({
                        event: "click",
                        then: (_e, _w) => {
                            if (props.onClick) {
                                console.log(args.data[columnField]);
                                props.onClick(args);
                            }
                        },
                    });
                } else if (columnType === "progressbar") {
                    const newProgressBar = new ProgressBar(args.fieldId);

                    args.row.addChild(newProgressBar);
                    const prg = window.w.get(args.fieldId) as ProgressBar;
                    prg.setPaddingBar(2);

                    if (columnClassNames) {
                        prg.addClass(columnClassNames);
                    }

                    prg.setValue(args.data[columnField]);
                } else if (columnType === "valuebar") {
                    throw new Error("Valuebar not implemented");
                } else if (columnType === "buttonmenu") {
                    throw new Error("Buttonmenu not implemented");
                } else if (columnType === "textbox") {
                    throw new Error("Textbox not implemented");
                } else if (columnType === "select") {
                    throw new Error("Select not implemented");
                } else if (columnType === "checkbox") {
                    throw new Error("Checkbox not implemented");
                } else if (columnType === "switch") {
                    throw new Error("Switch not implemented");
                } else if (columnType === "image") {
                    throw new Error("Image not implemented");
                } else if (columnType === "icon") {
                    throw new Error("Icon not implemented");
                }
            });
        }
    });

    newGrid.setAlign(WidgetAlignTypes.VERTICAL);

    newGrid.setData(data as Array<any>);

    columnPropsBackup = []; //Limpia las propiedades de las columnas de la grilla actual.

    return newGrid;
}
