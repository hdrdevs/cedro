import { Application, WidgetAlignTypes } from "../../index";
import { header } from "./header/header";

class WidgetFactory extends Application {
    constructor() {
        super(".::cedro::. - Widget Factory");
        this.getRoot().setAlign(WidgetAlignTypes.VERTICAL);
        this.getRoot().setPadding(6);
        this.getRoot().addChild(header);
    }

    init() {
        super.init();
        this.root.render();
        this.theme.setTheme("dark");
    }
}

export const widgetFactory = new WidgetFactory();

widgetFactory.init();
