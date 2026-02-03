import { IconViewItem } from "../../ui/IconViewItem.ui";
import { Application, WidgetAlignTypes, WidgetTypes } from "../../index";

import { IconView } from "../../ui/IconView.ui";

class WorkingApp extends Application {
    iconView: IconView;

    constructor() {
        super("Working App - Toolbar");
        this.getRoot().setAlign(WidgetAlignTypes.VERTICAL);

        this.iconView = new IconView("icon-view", null);

        this.iconView.addItem(
            new IconViewItem("icon1", "home", "Texto del icono 1", "Outlined", null)
        );
        this.iconView.addItem(
            new IconViewItem("icon2", "home", "Texto del icono dos", "Outlined", null)
        );
        this.iconView.addItem(
            new IconViewItem(
                "icon3",
                "home",
                "Texto del icono 3 con mas texto que el anterior pero mucho mas que el anterior",
                "Outlined",
                null
            )
        );
        this.iconView.addItem(
            new IconViewItem("icon4", "home", "Texto del icono cuatro", "Outlined", null)
        );
        this.iconView.addItem(
            new IconViewItem("icon5", "home", "Texto del icono cinco", "Outlined", null)
        );
        this.iconView.addItem(
            new IconViewItem("icon6", "home", "Texto del icono seis", "Outlined", null)
        );
        this.iconView.addItem(
            new IconViewItem("icon7", "home", "Texto del icono siete", "Outlined", null)
        );
        this.iconView.addItem(
            new IconViewItem("icon8", "home", "Texto del icono ocho", "Outlined", null)
        );
        this.iconView.addItem(
            new IconViewItem("icon9", "home", "Texto del icono nueve", "Outlined", null)
        );
        this.iconView.addItem(
            new IconViewItem("icon10", "home", "Texto del icono diez", "Outlined", null)
        );
        this.iconView.addItem(
            new IconViewItem("icon11", "home", "Texto del icono once", "Outlined", null)
        );
        this.iconView.addItem(
            new IconViewItem("icon12", "home", "Texto del icono doce", "Outlined", null)
        );
        this.iconView.addItem(
            new IconViewItem("icon13", "home", "Texto del icono trece", "Outlined", null)
        );
        this.iconView.addItem(
            new IconViewItem("icon14", "home", "Texto del icono catorce", "Outlined", null)
        );
        this.iconView.addItem(
            new IconViewItem("icon15", "home", "Texto del icono quince", "Outlined", null)
        );
        this.iconView.addItem(
            new IconViewItem("icon16", "home", "Texto del icono dieciseis", "Outlined", null)
        );
        this.iconView.addItem(
            new IconViewItem("icon17", "home", "Texto del icono diecisiete", "Outlined", null)
        );
        this.iconView.addItem(
            new IconViewItem("icon18", "home", "Texto del icono dieciocho", "Outlined", null)
        );
        this.iconView.addItem(
            new IconViewItem("icon19", "home", "Texto del icono diecinueve", "Outlined", null)
        );
        this.iconView.addItem(
            new IconViewItem("icon20", "home", "Texto del icono veinte", "Outlined", null)
        );

        this.getRoot().addChild(this.iconView);
    }

    init() {
        super.init();
        this.root.render();
        this.theme.setTheme("dark");
    }
}

export const workingApp = new WorkingApp();

workingApp.init();
