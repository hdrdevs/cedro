import { WLabel } from "../../../ui/label.ui";
import { WContainer } from "../../../ui/container.ui";
import { WIconButton } from "../../../ui/IconButton.ui";

const listOfButtons = [
    {
        id: "btnAccordion",
        icon: "view_stream",
        text: "Accordions",
        link: "/working/demo/widget-gallery/buttons",
    },
    {
        id: "btnLabels",
        icon: "label",
        text: "Labels",
        link: "/working/demo/widget-gallery/buttons",
    },
    {
        id: "btnTextboxes",
        icon: "input",
        text: "Textboxes",
        link: "/working/demo/widget-gallery/buttons",
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
        link: "/working/demo/widget-gallery/buttons",
    },
    {
        id: "btnToolbar",
        icon: "widgets",
        text: "Toolbars",
        link: "/working/demo/widget-gallery/buttons",
    },
    {
        id: "btnDataGrid",
        icon: "view_list",
        text: "Data Grid",
        link: "/working/demo/widget-gallery/buttons",
    },
    {
        id: "btnSlider",
        icon: "linear_scale",
        text: "Sliders",
        link: "/working/demo/widget-gallery/buttons",
    },
    {
        id: "btnTabs",
        icon: "tab",
        text: "Tabs",
        link: "/working/demo/widget-gallery/buttons",
    },
    {
        id: "btnProgressbars",
        icon: "donut_large",
        text: "Progrssbars",
        link: "/working/demo/widget-gallery/buttons",
    },
    {
        id: "btnImages",
        icon: "image",
        text: "Images",
        link: "/working/demo/widget-gallery/buttons",
    },
    {
        id: "btnIcons",
        icon: "filter_hdr",
        text: "Icons",
        link: "/working/demo/widget-gallery/buttons",
    },
    {
        id: "btnDialogs",
        icon: "open_in_new_down",
        text: "Dialogs",
        link: "/working/demo/widget-gallery/buttons",
    },
];

export const SideBar = () => {
    const sidebarButtonHeight = 50;

    return (
        <WContainer orientation="vertical" fixedSize={200} padding={10}>
            {listOfButtons.map((button) => {
                return (
                    <WIconButton
                        id={button.id}
                        icon={button.icon}
                        text={button.text}
                        fixedSize={sidebarButtonHeight}
                        onClick={() => {
                            app?.goTo(button.link);
                        }}
                    />
                );
            })}
        </WContainer>
    );
};
