import { WUICallback } from "../interfaces/widget.interface";
import { Button } from "./button.ui";
import { Label } from "./label.ui";
import "./styles/dialog.css";
import { Widget, WidgetAlignTypes, WidgetTypes } from "./widget.ui";

const TITLE_BAR_HEIGHT = 40;
const BUTTON_BAR_HEIGHT = 50;
const HANDLER_SIZE = 20;
const MINUMUN_WIDTH = 300;
const MINUMUN_HEIGHT = 200;

export class Dialog extends Widget {
    background: Widget;

    titleContainer: Widget;
    contentCntainer: Widget;
    buttonContainer: Widget | null;
    handlerResizable: Widget | null;

    titleBar: Label;
    close: Button;

    ok: Button | null;
    cancell: Button | null;
    btnSpacerLeft: Widget | null;
    btnSpacerRight: Widget | null;

    titleBarHeight: number;
    buttonBarHeight: number;

    dragDistX: number;
    dragDistY: number;
    draging: boolean;
    resizing: boolean;

    constructor(
        id: string,
        parent: Widget | null = null,
        hasButtons: boolean = true,
        resizable: boolean = false
    ) {
        super(id, "div", parent);

        this.buttonContainer = null;
        this.handlerResizable = null;

        this.ok = null;
        this.cancell = null;
        this.btnSpacerLeft = null;
        this.btnSpacerRight = null;

        this.dragDistX = 0;
        this.dragDistY = 0;
        this.draging = false;
        this.resizing = false;

        this.background = new Widget(this.id + ".background", "div", null);
        this.background.setType(WidgetTypes.CUSTOM);
        this.background.addClass("WUIDialogBackground");
        this.background.setVisible(false);

        this.setWH(400, 200);

        this.addClass("WUIDialog");
        this.addClass("WUIDialogHide");

        this.titleBarHeight = TITLE_BAR_HEIGHT;
        this.buttonBarHeight = BUTTON_BAR_HEIGHT;

        this.setType(WidgetTypes.CUSTOM);
        this.setAlign(WidgetAlignTypes.VERTICAL);

        this.titleContainer = new Widget(
            this.id + ".titleContainer",
            "div",
            this
        );
        this.contentCntainer = new Widget(
            this.id + ".contentCntainer",
            "div",
            this
        );

        if (hasButtons) {
            this.buttonContainer = new Widget(
                this.id + ".buttonContainer",
                "div",
                this
            );

            this.buttonContainer.setType(WidgetTypes.FILL);
            this.buttonContainer.setAlign(WidgetAlignTypes.HORIZONTAL);
            this.buttonContainer.setPadding(5);
            this.buttonContainer.setFixedSize(BUTTON_BAR_HEIGHT);
        }

        if (resizable) {
            this.handlerResizable = new Widget(
                this.id + ".handlerResizable",
                "div",
                this
            );
            this.handlerResizable.setType(WidgetTypes.CUSTOM);
            this.handlerResizable.getBody().innerHTML = "&nbsp;";
            this.handlerResizable.addClass("WUIDialogResizeHandler");
        }

        this.titleContainer.setType(WidgetTypes.FILL);
        this.contentCntainer.setType(WidgetTypes.FILL);

        this.titleContainer.setAlign(WidgetAlignTypes.HORIZONTAL);
        this.contentCntainer.setAlign(WidgetAlignTypes.VERTICAL);

        this.titleContainer.setPadding(5);
        this.contentCntainer.setPadding(20);

        this.titleContainer.setFixedSize(TITLE_BAR_HEIGHT);

        this.titleBar = new Label(
            this.id + ".titleBar",
            "span",
            this.titleContainer
        );
        this.titleBar.setType(WidgetTypes.FILL);
        this.titleBar.setText("Title");
        this.titleBar.addClass("WUITitlebar");

        this.close = new Button(this.id + ".close", this.titleContainer);
        this.close.setType(WidgetTypes.FILL);
        this.close.setColor("primary");
        this.close.setVariant("text");
        this.close.setText("X");
        this.close.setFixedSize(40);

        this.btnSpacerLeft = new Widget(
            this.id + ".btnSpacerLeft",
            "div",
            this.buttonContainer
        );
        this.btnSpacerLeft.setType(WidgetTypes.FILL);
        this.btnSpacerLeft.setAlign(WidgetAlignTypes.HORIZONTAL);

        if (this.buttonContainer) {
            this.cancell = new Button(
                this.id + ".cancell",
                this.buttonContainer
            );
            this.cancell.setType(WidgetTypes.FILL);
            this.cancell.setColor("error");
            this.cancell.setText("Cancel");
            this.cancell.setVariant("contained");
            this.cancell.setFixedSize(100);

            this.ok = new Button(this.id + ".ok", this.buttonContainer);
            this.ok.setType(WidgetTypes.FILL);
            this.ok.setText("OK");
            this.ok.setVariant("contained");
            this.ok.setColor("success");
            this.ok.setFixedSize(100);

            this.btnSpacerRight = new Widget(
                this.id + ".btnSpacerRight",
                "div",
                this.buttonContainer
            );
            this.btnSpacerRight.setType(WidgetTypes.FILL);
            this.btnSpacerRight.setAlign(WidgetAlignTypes.HORIZONTAL);

            this.ok.subscribe({
                event: "click",
                then: () => {
                    this.hide();
                },
            });

            this.cancell.subscribe({
                event: "click",
                then: () => {
                    this.hide();
                },
            });
        }

        this.raisteTop();

        this.close.subscribe({
            event: "click",
            then: () => {
                this.hide();
            },
        });

        this.titleBar.subscribe({
            event: "mousedown",
            then: (e: any) => {
                e.preventDefault();
                const mouseX = (e as MouseEvent).clientX;
                const mouseY = (e as MouseEvent).clientY;
                this.dragDistX = Math.abs(this.getX() - mouseX);
                this.dragDistY = Math.abs(this.getY() - mouseY);
                this.draging = true;
                this.background.setVisible(true);
                this.background.raisteTop();
                this.background.deleteClass("WUIDialogBackgroundReisizing");
                this.background.addClass("WUIDialogBackgroundDragging");
            },
        });

        this.background.subscribe({
            event: "mouseup",
            then: (e: any) => {
                e.preventDefault();
                this.draging = false;
                this.resizing = false;
                this.background.setVisible(false);
                this.raisteTop();
            },
        });

        this.background.subscribe({
            event: "mousemove",
            then: (e: any) => {
                e.preventDefault();

                if (this.draging) {
                    const mouseX = (e as MouseEvent).clientX;
                    const mouseY = (e as MouseEvent).clientY;
                    this.setX(mouseX - this.dragDistX);
                    this.setY(mouseY - this.dragDistY);
                } else if (this.resizing) {
                    const mouseX = (e as MouseEvent).clientX;
                    const mouseY = (e as MouseEvent).clientY;

                    let newWidth = Math.abs(mouseX - this.getPosition().x);
                    let newHeight = Math.abs(mouseY - this.getPosition().y);

                    if (newWidth < MINUMUN_WIDTH) newWidth = MINUMUN_WIDTH;
                    if (newHeight < MINUMUN_HEIGHT) newHeight = MINUMUN_HEIGHT;

                    this.setWH(newWidth, newHeight);

                    this.render();
                }

                return;
            },
        });

        /**RESIZE HANDLER  **/
        if (this.handlerResizable) {
            this.handlerResizable.subscribe({
                event: "mousedown",
                then: (e: any) => {
                    e.preventDefault();
                    if (!this.handlerResizable) return;
                    const mouseX = (e as MouseEvent).clientX;
                    const mouseY = (e as MouseEvent).clientY;
                    this.dragDistX = Math.abs(
                        this.handlerResizable.getPosition().x - mouseX
                    );
                    this.dragDistY = Math.abs(
                        this.handlerResizable.getPosition().y - mouseY
                    );

                    this.resizing = true;
                    this.background.setVisible(true);
                    this.background.raisteTop();
                    this.background.deleteClass("WUIDialogBackgroundDragging");
                    this.background.addClass("WUIDialogBackgroundReisizing");
                },
            });
        }

        this.init();
    }

    /**
     * Renders the component and its resizable handler.
     *
     * @return {void}
     */
    public render(): void {
        super.render();
        if (this.handlerResizable) {
            this.handlerResizable.setX(this.getW() - HANDLER_SIZE);
            this.handlerResizable.setY(this.getH() - HANDLER_SIZE);
            this.handlerResizable.setW(HANDLER_SIZE);
            this.handlerResizable.setH(HANDLER_SIZE);
            this.handlerResizable.raisteTop();
            this.handlerResizable.render();
        }
    }

    /**
     * Centers the element on the screen.
     *
     * @param {void} - No parameters.
     * @return {void} - No return value.
     */
    public center(): void {
        const ancho = this.getW();
        const alto = this.getH();

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const centerX = screenWidth / 2 - ancho / 2;
        const centerY = screenHeight / 2 - alto / 2;

        this.setX(centerX);
        this.setY(centerY);
    }

    /**
     * Shows the dialog.
     *
     * @return {void} No return value.
     */
    public show(): void {
        //this.setWH(400, 200);
        this.deleteClass("WUIDialogHide");
        this.addClass("WUIDialogDisplayed");
        this.render();
        this.center();

        this.background.setVisible(true);
        this.background.raisteTop();

        this.raisteTop();
    }

    /**
     * Hides the dialog.
     *
     * This function removes the "WUIDialogDisplayed" class from the element,
     * adds the "WUIDialogHide" class to the element, sets the background element
     * to be invisible, and raises the dialog element to the bottom of the z-index.
     */
    public hide(): void {
        this.deleteClass("WUIDialogDisplayed");
        this.addClass("WUIDialogHide");
        this.background.setVisible(false);
        this.background.raiseBottom();
        this.raiseBottom();
    }

    init() {
        super.init();
    }

    /**
     * Sets the height of the title bar.
     *
     * @param {number} height - The height of the title bar.
     */
    setTitlebarHeight(height: number) {
        this.titleBarHeight = height;
    }

    /**
     * Set the height of the button bar.
     *
     * @param {number} height - The height of the button bar.
     */
    setButtonbarHeight(height: number) {
        this.buttonBarHeight = height;
    }

    /**
     * Retrieves the content container widget.
     *
     * @return {Widget} The content container widget.
     */
    public getContentCntainer(): Widget {
        return this.contentCntainer;
    }

    /**
     * Sets the ok callback function.
     *
     * @param {WUICallback} cb - The callback function to be executed when the "ok" button is clicked.
     */
    public setOkCallback(cb: WUICallback) {
        if (!this.ok) return;
        this.ok.subscribe({ event: "click", then: cb.then });
    }

    /**
     * Sets the cancellation callback for the function.
     *
     * @param {WUICallback} cb - The cancellation callback to set.
     */
    public setCancellCallback(cb: WUICallback) {
        if (!this.cancell) return;
        this.cancell.subscribe({ event: "click", then: cb.then });
    }
}
