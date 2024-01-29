import { IWidget, WUIEvent, WUICallback } from "../interfaces/widget.interface";
import { w } from "./widget.collection";
import { Vector2D } from "../types/vector2d.type";

export enum WidgetTypes {
    FILL = 1,
    CUSTOM = 2,
    FREE = 3,
}

export enum WidgetAlignTypes {
    HORIZONTAL = 1,
    VERTICAL = 2,
}

export class Widget implements IWidget {
    readonly id: string;

    subscribers: Map<string, WUICallback>;

    padding: number;

    left: number;
    top: number;
    width: number;
    height: number;

    initialWidth: number;
    initialHeight: number;

    overflow: boolean;

    fixedSize: number | null;

    type: WidgetTypes;
    align: WidgetAlignTypes;

    visible: boolean;
    enabled: boolean;

    parent: IWidget | null;
    childs: IWidget[];
    bodyTagName: string;
    body: HTMLElement;

    constructor(
        id: string,
        bodyTagName: string = "div",
        parent: IWidget | null = null
    ) {
        this.id = id;

        this.overflow = false;

        this.subscribers = new Map<string, WUICallback>();

        this.padding = 0;

        this.left = 0;
        this.top = 0;
        this.width = 0;
        this.height = 0;
        this.initialWidth = 0;
        this.initialHeight = 0;
        this.fixedSize = null;

        this.type = WidgetTypes.FREE;
        this.align = WidgetAlignTypes.VERTICAL;

        this.visible = true;
        this.enabled = true;

        this.parent = parent;
        this.childs = [];

        this.bodyTagName = bodyTagName;
        this.body = document.createElement(this.bodyTagName);
        this.body.id = `WUI.${id}.body`;

        if (parent) {
            //this.setType(WidgetTypes.CUSTOM);
            parent.addChild(this);
            parent.getBody().appendChild(this.body);
        } else {
            this.setType(WidgetTypes.FREE);
            document.body.appendChild(this.body);
        }

        this.body.addEventListener("click", (e) => {
            this.subscribers.forEach((callback) => {
                if (callback.event == "click") {
                    callback.then(e, this);
                }
            });
        });

        this.body.addEventListener("mousedown", (e) => {
            this.subscribers.forEach((callback) => {
                if (callback.event == "mousedown") {
                    callback.then(e, this);
                }
            });
        });

        this.body.addEventListener("mouseup", (e) => {
            this.subscribers.forEach((callback) => {
                if (callback.event == "mouseup") {
                    callback.then(e, this);
                }
            });
        });

        this.body.addEventListener("mousemove", (e) => {
            this.subscribers.forEach((callback) => {
                if (callback.event == "mousemove") {
                    callback.then(e, this);
                }
            });
        });

        this.init();

        this.getMaxZIndex();
    }

    public subscribe(cb: WUICallback) {
        const randomId =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);

        this.subscribers.set(`${randomId}.${cb.event}`, cb);
    }

    public unsubscribe(event: WUIEvent) {
        this.subscribers.delete(`${event}`);
    }

    /**
     * Sets the padding value for the object.
     *
     * @param {number} p - The padding value to set.
     * @return {void} This function does not return a value.
     */
    public setPadding(p: number): void {
        this.padding = p;
    }

    /**
     * Sets the value of x and updates the left position of the element.
     *
     * @param {number} x - The new value of x.
     * @return {void} This function does not return anything.
     */
    public setX(x: number): void {
        this.left = x;
        this.body.style.left = `${x}px`;
    }

    /**
     * Sets the value of the 'y' property and updates the 'top' and 'body.style.top' properties accordingly.
     *
     * @param {number} y - The new value for the 'y' property.
     * @return {void} This function does not return a value.
     */
    public setY(y: number): void {
        this.top = y;
        this.body.style.top = `${y}px`;
    }

    /**
     * Sets the width of the element and updates the corresponding inline style.
     *
     * @param {number} w - The new width value.
     * @return {void} This function does not return a value.
     */
    public setW(w: number): void {
        //this.width = w;
        this.body.style.width = `${w}px`;
    }

    /**
     * Sets the initial value of the width property.
     *
     * @param {number} w - The initial width value.
     * @return {void} This function does not return a value.
     */
    public setInitialW(w: number): void {
        this.initialWidth = w;
    }

    /**
     * Sets the value of the height property and updates the height of the element.
     *
     * @param {number} h - The new height value.
     * @return {void} This function does not return any value.
     */
    public setH(h: number): void {
        //this.height = h;
        this.body.style.height = `${h}px`;
    }

    /**
     * Sets the initial height of the object.
     *
     * @param {number} h - The initial height value to set.
     * @return {void} This function does not return a value.
     */
    public setInitialH(h: number): void {
        this.initialHeight = h;
    }

    /**
     * Sets the width and height of the element.
     *
     * @param {number} w - The width to set.
     * @param {number} h - The height to set.
     * @return {void} This function does not return anything.
     */
    public setWH(w: number, h: number): void {
        this.width = w;
        this.height = h;
        this.body.style.width = `${w}px`;
        this.body.style.height = `${h}px`;

        //ejecutar los subscriptores
        this.subscribers.forEach((callback) => {
            if (callback.event == "resize") {
                callback.then(new Event("resize"), this);
            }
        });
    }

    public setFixedSize(s: number): void {
        this.fixedSize = s;
    }

    /**
     * Sets the type of the widget.
     *
     * @param {WidgetTypes} type - The type of widget to set.
     * @return {void} This function does not return anything.
     */
    public setType(type: WidgetTypes): void {
        this.type = type;

        let freeStyle = false;

        if (this.type === WidgetTypes.FREE) {
            freeStyle = true;
        }

        const parent = this.getParent();

        if (parent) {
            if (parent.type === WidgetTypes.FREE) {
                freeStyle = true;
            }
        }

        if (freeStyle) {
            //this.body.style.position = "relative";
            this.addClass("WUIFixPosition");
            //this.body.style.overflow = "auto";
            this.body.style.left = "";
            this.body.style.top = "";
            this.body.style.width = "";
            this.body.style.height = "";

            this.body.style.bottom = "";
            this.body.style.right = "";
        } else {
            if (
                this.type === WidgetTypes.CUSTOM ||
                this.type === WidgetTypes.FILL
            ) {
                this.body.style.position = "absolute";
                this.body.style.overflow = "hidden";
            }
        }

        if (this.initialWidth != 0) {
            this.body.style.width = `${this.initialWidth}px`;
        }
        if (this.initialHeight != 0) {
            this.body.style.height = `${this.initialHeight}px`;
        }
    }

    /**
     * Sets the alignment of the widget.
     *
     * @param {WidgetAlignTypes} align - The alignment to set.
     * @return {void}
     */
    public setAlign(align: WidgetAlignTypes): void {
        this.align = align;
    }

    /**
     * Sets the visibility of the element.
     *
     * @param {boolean} visible - The visibility state of the element.
     * @return {void}
     */
    public setVisible(visible: boolean): void {
        this.visible = visible;
        this.body.style.display = visible ? "" : "none";
    }

    /**
     * Sets the enabled status of the object.
     *
     * @param {boolean} enabled - The new enabled status.
     * @return {void} This function does not return a value.
     */
    public setEnabled(enabled: boolean): void {
        this.enabled = enabled;
    }

    /**
     * Sets the parent of the widget.
     *
     * @param {IWidget | null} parent - The parent widget or null if there is no parent.
     * @return {void} This function does not return anything.
     */
    public setParent(parent: IWidget | null): void {
        if (this.parent) {
            if (this.body) {
                if (this.body.parentNode) {
                    this.body.parentNode.removeChild(this.body);
                }
            }
        }
        this.parent = parent;
        this.parent?.body.appendChild(this.body);

        //this.parent?.addChild(this);
    }

    /**
     * Sets the body of the element.
     *
     * @param {HTMLElement} body - The new body element.
     * @return {void} This function does not return anything.
     */
    public setBody(body: HTMLElement): void {
        if (this.body.parentNode) {
            this.body.parentNode.removeChild(this.body);
        }

        this.body = body;
        this.parent?.getBody().appendChild(this.body);
    }

    /**
     * Sets the array of child widgets for this widget.
     *
     * @param {IWidget[]} childs - The array of child widgets to set.
     * @return {void}
     */
    public setChilds(childs: IWidget[]): void {
        this.childs = childs;
    }

    /**
     * Sets the overflow value.
     *
     * @param {boolean} overflow - The new value for the overflow.
     * @return {void} This function does not return a value.
     */
    setOverflow(overflow: boolean): void {
        this.overflow = overflow;
        this.getBody().style.overflow = this.overflow ? "auto" : "hidden";
    }

    /**
     * Adds a CSS class to the list of CSS classes.
     *
     * @param {string} cssClass - The CSS class to add.
     * @return {void}
     */
    public addClass(cssClass: string): void {
        this.body.classList.add(cssClass);
    }

    /**
     * Deletes a CSS class from the list of CSS classes.
     *
     * @param {string} cssClass - The CSS class to be deleted.
     * @return {void} This function does not return a value.
     */
    public deleteClass(cssClass: string): void {
        this.body.classList.remove(cssClass);
    }

    public deleteAllClasses(): void {
        this.body.classList.forEach((cssClass) => {
            this.deleteClass(cssClass);
        });
    }

    /**
     * Retrieves the padding value.
     *
     * @return {number} The padding value.
     */
    getPadding(): number {
        return this.padding;
    }

    /**
     * Retrieves the value of the 'left' property.
     *
     * @return {number} The value of the 'left' property.
     */
    public getX(): number {
        return this.left;
    }

    /**
     * Retrieves the value of Y.
     *
     * @return {number} The value of Y.
     */
    public getY(): number {
        return this.top;
    }

    /**
     * Get the width of the object.
     *
     * @return {number} The width of the object.
     */
    public getW(): number {
        //return this.width;
        return this.getBody().clientWidth;
    }

    /**
     * Returns the value of the height property.
     *
     * @return {number} The value of the height property.
     */
    public getH(): number {
        //return this.height;
        return this.getBody().clientHeight;
    }

    /**
     * Returns the position of the element relative to the viewport.
     *
     * @param {boolean} scroll - Indicates whether to account for scrolling in the position calculation. Defaults to false.
     * @return {Vector2D} An object with x and y properties representing the position of the element.
     */
    public getPosition(scroll: boolean = false): Vector2D {
        var box = this.getBody().getBoundingClientRect();
        var body = document.body;
        var docElem = document.documentElement;
        var scrollTop = scroll ? docElem.scrollTop || body.scrollTop : 0;
        var scrollLeft = scroll ? docElem.scrollLeft || body.scrollLeft : 0;
        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;
        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return { x: Math.round(left), y: Math.round(top) };
    }

    public getFixedSize(): number | null {
        return this.fixedSize;
    }

    /**
     * Returns the type of the widget.
     *
     * @return {WidgetTypes} The type of the widget.
     */
    public getType(): WidgetTypes {
        return this.type;
    }

    /**
     * Retrieves the alignment of the widget.
     *
     * @return {WidgetAlignTypes} The alignment of the widget.
     */
    public getAlign(): WidgetAlignTypes {
        return this.align;
    }

    /**
     * Retrieves the value of the enabled flag.
     *
     * @return {boolean} The value of the enabled flag.
     */
    public getEnabled(): boolean {
        return this.enabled;
    }

    /**
     * Returns the visibility status of the element.
     *
     * @return {boolean} The visibility status of the element.
     */
    public getVisible(): boolean {
        return this.visible;
    }

    /**
     * Retrieves the parent widget of this widget.
     *
     * @return {IWidget | null} The parent widget or null if there is no parent.
     */
    public getParent(): IWidget | null {
        return this.parent;
    }

    /**
     * Returns the body element of the object.
     *
     * @return {HTMLElement} The body element.
     */
    public getBody(): HTMLElement {
        return this.body;
    }

    /**
     * Retrieves the array of child widgets.
     *
     * @return {IWidget[]} The array of child widgets.
     */
    public getChilds(): IWidget[] {
        return this.childs;
    }

    /**
     * Returns the value of the 'overflow' property.
     *
     * @return {boolean} The value of the 'overflow' property.
     */
    public getOverflow(): boolean {
        return this.overflow;
    }

    /**
     * Adds a child widget to the current widget.
     *
     * @param {IWidget} child - The widget to be added.
     * @return {void} - This function does not return anything.
     */
    public addChild(child: IWidget | null = null): void {
        if (!child) return;
        this.childs.push(child);
        child.setParent(this);

        child.init();
        /*child.resize();
        child.render();*/
    }

    /**
     * Disables the selection feature.
     *
     * @param {void} -
     * @return {void} -
     */
    public disableSelection(): void {
        console.log("disableSelection");
    }

    /**
     * Enables selection.
     *
     */
    public enableSelection(): void {
        console.log("enableSelection");
    }

    /**
     * Hides the element by setting its visibility to false.
     *
     * @param {void} -
     * @return {void} -
     */
    public hide(): void {
        this.setVisible(false);
    }

    /**
     * Initializes the function.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    public init(): void {
        if (this.type !== WidgetTypes.FREE) {
            this.body.style.position = "absolute";
            this.body.style.overflow = "hidden";
        }

        this.initPosition();
    }

    /**
     * Initializes the position.
     *
     * @param {void} - No parameters required.
     * @return {void} - No return value.
     */
    initPosition(): void {
        if (this.type === WidgetTypes.FILL) {
            if (!this.parent) {
                this.setX(0);
                this.setY(0);
                this.setWH(window.innerWidth, window.innerHeight);
            } else {
                //Si tiene padre que lo controle el padre!
                return;
            }
        }
    }

    /**
     * Renders the component.
     *
     * @return {void}
     */
    public render(): void {
        //this.initPosition();

        const padding = this.padding;

        const size =
            this.align === WidgetAlignTypes.HORIZONTAL
                ? this.width
                : this.height;

        let currentPosition = padding;

        //Obtener el available size si hay elementos con fixed size
        let sumFixedSizes = 0;

        let totalFillElements = 0;
        for (const child of this.childs) {
            if (child.type === WidgetTypes.FILL) {
                totalFillElements++;
            }
        }

        let freeElements = totalFillElements;

        for (const child of this.childs) {
            if (child.getFixedSize() !== null) {
                sumFixedSizes += child.getFixedSize() as number;
                freeElements--;
            }
        }

        let availableSize = size - sumFixedSizes;

        /**
         * Elementos que tienen un padre LIBRE
         * ===================================
         */

        const myParent = this.getParent();
        if (myParent) {
            if (myParent.type === WidgetTypes.FREE) {
                //this.getBody().style.position = "relative";
                this.addClass("WUIFixPosition");
                this.getBody().style.left = "";
                this.getBody().style.top = "";
                this.getBody().style.height = "";
                this.getBody().style.width = "";
                if (this.initialWidth != 0) {
                    this.getBody().style.width = `${this.initialWidth}px`;
                }
                if (this.initialHeight != 0) {
                    this.getBody().style.height = `${this.initialHeight}px`;
                }
            }
        }
        /************************************ */

        for (const child of this.childs) {
            if (child.type !== WidgetTypes.FILL) {
                child.render();

                continue;
            }

            let elementSize = (availableSize - padding) / freeElements;

            if (child.getFixedSize() !== null) {
                elementSize = child.getFixedSize() as number;
            }

            if (this.align === WidgetAlignTypes.HORIZONTAL) {
                child.setY(padding);
                child.setX(currentPosition);

                if (child.type === WidgetTypes.FILL) {
                    child.setWH(
                        elementSize - padding,
                        this.getH() - padding * 2
                    );
                } else {
                    child.setWH(
                        elementSize - padding,
                        this.getH() - padding * 2
                    );
                }
            } else if (this.align === WidgetAlignTypes.VERTICAL) {
                child.setX(padding);
                child.setY(currentPosition);
                if (child.type === WidgetTypes.FILL) {
                    child.setWH(
                        this.getW() - padding * 2,
                        elementSize - padding
                    );
                } else {
                    child.setWH(
                        this.getW() - padding * 2,
                        elementSize - padding
                    );
                }
            }
            currentPosition += elementSize;
            child.render();
        }
    }

    /**
     * Resizes the element and its child elements.
     */
    public resize(): void {
        // Initialize the position of the element
        this.initPosition();
        this.render();
    }

    /**
     * Displays the element on the screen.
     *
     * @return {void} - Does not return a value.
     */
    public display(): void {
        this.setVisible(true);
    }

    /**
     * Toggles the visibility of something.
     *
     * @return {void} Nothing is returned.
     */
    public toggle(): void {
        this.setVisible(!this.visible);
    }

    renderHTML(content: any): HTMLElement {
        this.body.appendChild(content);
        return content as HTMLElement;
    }

    private getMaxZIndex(
        maxZindex: number = 0,
        node: ChildNode | null = null
    ): number {
        const parent = node ? node : document.body;

        if (parent instanceof HTMLElement) {
            if (parseInt(window.getComputedStyle(parent).zIndex) > maxZindex) {
                maxZindex = parseInt(window.getComputedStyle(parent).zIndex);
            }
        }

        parent?.childNodes.forEach((child) => {
            maxZindex = this.getMaxZIndex(maxZindex, child);
        });

        return maxZindex;
    }

    setZIndex(zIndex: number): void {
        this.getBody().style.zIndex = `${zIndex}`;
    }

    raisteTop(): void {
        this.setZIndex(this.getMaxZIndex() + 1);
    }

    raiseBottom(): void {
        this.setZIndex(0);
    }

    /**
     * Attaches a widget to the current widget and delete all pre-existents widgets
     *
     * @param {IWidget} guest - The widget to attach.
     * @return {void} This function does not return anything.
     */
    attachWidget(guest: IWidget): void {
        this.removeAllChilds();
        this.addChild(guest);
        guest.setParent(this);
        guest.render();
        this.resize();
        this.render();
    }

    /**
     * Removes all child nodes from the current element.
     *
     * @return {void} No return value.
     */
    removeAllChilds(): void {
        while (this.getBody().childNodes.length > 0) {
            const child = this.getBody().firstChild;
            if (child) this.getBody().removeChild(child);
        }

        this.childs = [];
    }

    free(): void {
        if (this.childs) {
            for (const child of this.childs) {
                child.free();
            }
        }
        w.delete(this.id);
    }
}
