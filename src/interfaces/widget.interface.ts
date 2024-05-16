import { WidgetAlignTypes, WidgetTypes } from "../ui/widget.ui";
import { Vector2D } from "../types/vector2d.type";

export type WUIEvent = "click" | "resize" | "mousedown" | "mouseup" | "mousemove" | "option-clicked" | "wheel";

export type WUICallback = {
    event: WUIEvent;
    then: (event: Event, wuie: IWidget) => void;
};

export interface IWidget {
    readonly id: string;

    subscribers: Map<string, WUICallback>;

    padding: number;

    left: number;
    top: number;
    width: number;
    height: number;

    initialWidth: number;
    initialHeight: number;

    fixedSize: number | null;

    type: WidgetTypes;
    align: WidgetAlignTypes;

    visible: boolean;
    enabled: boolean;

    parent: IWidget | null;
    childs: IWidget[];
    bodyTagName: string;
    body: HTMLElement;

    overflow: boolean;

    free: () => void;

    subscribe: (cb: WUICallback) => void;
    unsubscribe: (event: WUIEvent) => void;

    setPadding(p: number): void;

    setX(x: number): void;
    setY(y: number): void;
    setW(w: number): void;
    setH(h: number): void;
    setWH(w: number, h: number): void;

    setInitialW(w: number): void;
    setInitialH(h: number): void;

    setFixedSize(s: number): void;

    setType(type: WidgetTypes): void;
    setAlign(align: WidgetAlignTypes): void;

    setVisible(visible: boolean): void;
    setEnabled(enabled: boolean): void;

    setParent(parent: IWidget | null): void;
    setBody(body: HTMLElement): void;
    setChilds(childs: IWidget[]): void;

    setOverflow(overflow: boolean): void;

    addClass(cssClass: string): void;
    deleteClass(cssClass: string): void;
    deleteAllClasses(): void;

    getPadding(): number;

    getX(): number;
    getY(): number;
    getW(): number;
    getH(): number;

    getPosition(scroll: boolean): Vector2D;

    getFixedSize(): number | null;

    getType(): WidgetTypes;
    getAlign(): WidgetAlignTypes;

    getEnabled(): boolean;
    getVisible(): boolean;

    getParent(): IWidget | null;
    getBody(): HTMLElement;
    getChilds(): IWidget[];

    getOverflow(): boolean;

    addChild(child: IWidget | null): void;
    disableSelection(): void;
    display(): void;
    enableSelection(): void;
    hide(): void;
    init(): void;
    initPosition(): void;
    render(): void;
    resize(): void;
    toggle(): void;

    renderHTML(content: any): HTMLElement;

    setZIndex(zIndex: number): void;
    raisteTop(): void;
    raiseBottom(): void;

    attachWidget(guest: IWidget): void;
    removeAllChilds(): void;
}
