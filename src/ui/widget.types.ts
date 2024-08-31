import { OrientationTypes } from "../types/orientation.type";

export enum WidgetTypes {
    FILL = 1,
    CUSTOM = 2,
    FREE = 3,
}

export enum WidgetAlignTypes {
    HORIZONTAL = 1,
    VERTICAL = 2,
}

export type WidgetEventProps = {
    onClick?: (args: any) => {} | void;
    onResize?: (args: any) => {} | void;
    onMouseDown?: (args: any) => {} | void;
    onMouseUp?: (args: any) => {} | void;
    onMouseMove?: (args: any) => {} | void;
    onMouseOut?: (args: any) => {} | void;
    onMouseLeave?: (args: any) => {} | void;
    onWheel?: (args: any) => {} | void;
    onDrag?: (args: any) => {} | void;
    onRender?: (args: any) => {} | void;
};

export type WidgetProps = {
    id?: string | null;
    type?: WidgetTypes | null;
    padding?: number | null;
    classNames?: string | null;
    fixedSize?: number | null;
    orientation?: OrientationTypes | null;
    hidden?: boolean | null;
} & WidgetEventProps;
