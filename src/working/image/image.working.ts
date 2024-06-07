import { Image, Container, Spacer } from "../../ui";
import { Application, WidgetAlignTypes, WidgetTypes } from "../../index";

class WorkingApp extends Application {
    img: Image;

    container: Container;

    constructor() {
        super("Working App - Toolbar");
        this.getRoot().setAlign(WidgetAlignTypes.VERTICAL);

        this.container = new Container({ orientation: "vertical" });

        this.img = new Image("img1", "cedro-logo.png");
        this.img.setType(WidgetTypes.FILL);
        this.img.setFixedSize(200);
        this.img.setAlternateText("Cedro");
        this.img.fillHeight();

        this.container.addChild(Spacer());
        this.container.addChild(this.img);
        this.container.addChild(Spacer());

        this.getRoot().addChild(Spacer());
        this.getRoot().addChild(this.container);
        this.getRoot().addChild(Spacer());
    }

    init() {
        super.init();
        this.root.render();
        this.theme.setTheme("dark");
    }
}

export const workingApp = new WorkingApp();

workingApp.init();
