import { ButtonStack, IconButton, IconButtonMenu } from "../../../ui";
import { Widget, WidgetAlignTypes, WidgetTypes } from "../../../ui/widget.ui";
import { widgetFactory } from "../widget-factory.working";

const HEADER_HEIGHT = 40;
const STACK_MIN_WIDTH = 120;
const STACK_MAX_WIDTH = 350;

class Header extends Widget {
    logo: Widget;

    btnStack: ButtonStack;
    page1: IconButton;
    page2: IconButton;
    page3: IconButton;

    theme: IconButton;
    menu: IconButtonMenu;
    constructor(id: string, parent: Widget | null = null) {
        super(id, "div", parent);
        this.setType(WidgetTypes.FILL);
        this.setFixedSize(HEADER_HEIGHT);
        this.setAlign(WidgetAlignTypes.HORIZONTAL);

        this.logo = new Widget(id + ".logo", "img");
        this.logo.getBody().setAttribute("src", "cedro-logo.png");
        this.logo.getBody().setAttribute("alt", "Cedro - Build an UI based on widgets");
        this.logo.setType(WidgetTypes.FILL);
        this.logo.setFixedSize(119);

        this.btnStack = new ButtonStack("buttonStack", "horizontal", null);
        this.btnStack.setType(WidgetTypes.FILL);
        this.btnStack.setFixedSize(STACK_MAX_WIDTH);

        this.page1 = new IconButton("buttonPage1", "house", null);
        this.page1.setText("Page 1");

        this.page2 = new IconButton("buttonPage2", "cloud_download", null);
        this.page2.setText("Page 2");

        this.page3 = new IconButton("buttonPage3", "info", null);
        this.page3.setText("Page 3");

        this.btnStack.addButton(this.page1);
        this.btnStack.addButton(this.page2);
        this.btnStack.addButton(this.page3);

        this.menu = new IconButtonMenu("btnMenu", "menu");
        this.menu.setType(WidgetTypes.FILL);
        this.menu.setFixedSize(40);

        this.menu.addItem("item1", "Documentation", "article");
        this.menu.addItem("item2", "Github repository", "code");
        this.menu.addItem("item3", "Preferences", "settings");
        this.menu.addItem("item4", "Sign out", "logout");

        this.theme = new IconButton("btnTheme", "light_mode");
        this.theme.setType(WidgetTypes.FILL);
        this.theme.setFixedSize(40);

        this.theme.subscribe({
            event: "click",
            then: (_e, _w) => {
                const theme = widgetFactory.theme.getTheme();

                if (theme === "light") {
                    this.theme.setIcon("light_mode");
                } else {
                    this.theme.setIcon("dark_mode");
                }

                widgetFactory.theme.toggleTheme();
            },
        });

        this.btnStack.setActive("buttonPage1");

        this.addChild(this.logo);
        this.addChild(Spacer());
        this.addChild(this.btnStack);
        this.addChild(Spacer());
        this.addChild(this.theme);
        this.addChild(this.menu);
    }

    public render(): void {
        super.render();
        if (widgetFactory.screen.getWidth() <= 800) {
            this.btnStack.setFixedSize(STACK_MIN_WIDTH);
            this.page1.hideText();
            this.page2.hideText();
            this.page3.hideText();

            this.page1.displayIcon();
            this.page2.displayIcon();
            this.page3.displayIcon();
        } else {
            this.btnStack.setFixedSize(STACK_MAX_WIDTH);
            this.page1.displayText();
            this.page2.displayText();
            this.page3.displayText();

            this.page1.hideIcon();
            this.page2.hideIcon();
            this.page3.hideIcon();
        }
    }
}

function Spacer(): Widget {
    const id = "spacer." + Date.now().toString();
    const spacer = new Widget(id);
    spacer.setAlign(WidgetAlignTypes.HORIZONTAL);
    spacer.setType(WidgetTypes.FILL);
    return spacer;
}

export const header = new Header("header", null);
