import { Image } from "../../ui";
import { Application, WidgetAlignTypes, WidgetTypes } from "../../index";

class WorkingApp extends Application {
    img: Image;

    constructor() {
        super("Working App - Toolbar");
        this.getRoot().setAlign(WidgetAlignTypes.VERTICAL);

        this.img = new Image("img1", "cedro-logo.png");
        this.img.setType(WidgetTypes.FILL);

        this.img.setAlternateText("Cedro");
        this.img.fillWidth();

        this.getRoot().addChild(this.img);
    }

    init() {
        super.init();
        this.root.render();
        this.theme.setTheme("dark");
    }
}

export const workingApp = new WorkingApp();

workingApp.init();
