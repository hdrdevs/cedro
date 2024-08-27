import { HPanel } from "../../../ui";
import { WContainer } from "../../../ui/container.ui";
import { WIconButton } from "../../../ui/IconButton.ui";
import { config } from "../config";

const listOfButtons = [
    {
        id: "btnLabels",
        icon: "label",
        text: "Labels",
        link: "/working/demo/widget-gallery/labels",
    },
    {
        id: "btnTextboxes",
        icon: "input",
        text: "Textboxes",
        link: "/working/demo/widget-gallery/textboxes",
    },
    {
        id: "btnButtons",
        icon: "keyboard_command_key",
        text: "Buttons",
        link: "/working/demo/widget-gallery/buttons",
    },
    {
        id: "btnContainers",
        icon: "dashboard",
        text: "Containers",
        link: "/working/demo/widget-gallery/containers",
    },
    {
        id: "btnToolbar",
        icon: "widgets",
        text: "Toolbars",
        link: "/working/demo/widget-gallery/toolbars",
    },
    {
        id: "btnDataGrid",
        icon: "view_list",
        text: "Data Grid",
        link: "/working/demo/widget-gallery/datagrids",
    },
    {
        id: "btnSlider",
        icon: "linear_scale",
        text: "Value Bars",
        link: "/working/demo/widget-gallery/valuebars",
    },
    {
        id: "btnTabs",
        icon: "tab",
        text: "Tabs",
        link: "/working/demo/widget-gallery/tabs",
    },
    {
        id: "btnProgressbars",
        icon: "donut_large",
        text: "Progrssbars",
        link: "/working/demo/widget-gallery/progressbar",
    },
    {
        id: "btnImages",
        icon: "image",
        text: "Images",
        link: "/working/demo/widget-gallery/images",
    },
    {
        id: "btnIcons",
        icon: "filter_hdr",
        text: "Icons",
        link: "/working/demo/widget-gallery/icons",
    },
    {
        id: "btnDialogs",
        icon: "open_in_new_down",
        text: "Dialogs",
        link: "/working/demo/widget-gallery/dialogs",
    },
];

export const SideBar = () => {
    const sidebarButtonHeight = 50;

    const onRenderHandler = () => {
        const hpanel = window.w.get("widget-gallery-side-panel") as HPanel;

        if (!app) return;

        hpanel.setLeftWidth(getSidebarWidth());
    };

    const getSidebarWidth = (): number => {
        if (!app) return config.SIDEBAR_MAX_WIDTH;

        if (app?.screen.getWidth() < config.SCREEN_TRIGGER_WIDTH) {
            return config.SIDEBAR_MIN_WIDTH;
        }

        return config.SIDEBAR_MAX_WIDTH;
    };

    return (
        <WContainer
            id="sidebar-container1"
            orientation="vertical"
            fixedSize={getSidebarWidth()}
            padding={10}
            onRender={onRenderHandler}
        >
            {listOfButtons.map((button) => {
                return (
                    <WIconButton
                        id={button.id}
                        icon={button.icon}
                        text={button.text}
                        fixedSize={sidebarButtonHeight}
                        variant={
                            "/" + app?.router.getCurrentLocation().url === button.link
                                ? "contained"
                                : "text"
                        }
                        onClick={() => {
                            app?.goTo(button.link);
                        }}
                    />
                );
            })}
        </WContainer>
    );
};
