import { WHPanel } from "../../../ui/hpanel.ui";
import { createWidget } from "../../../";
import { WLabel } from "../../../ui/label.ui";
import { WContainer } from "../../../ui/container.ui";
import { WIconButton } from "../../../ui/IconButton.ui";

export default createWidget(
    (() => {
        const sidebarButtonHeight = 50;

        return (
            <WHPanel id="widget-gallery-side-panel">
                <WContainer orientation="vertical" fixedSize={200} padding={10}>
                    <WLabel id="lblLabels" text="Widget List" fixedSize={sidebarButtonHeight} />
                    <WIconButton
                        id="btnAccordion"
                        icon="view_stream"
                        text="Accordions"
                        fixedSize={sidebarButtonHeight}
                    />
                    <WIconButton
                        id="btnLabels"
                        icon="label"
                        text="Labels"
                        fixedSize={sidebarButtonHeight}
                    />
                    <WIconButton
                        id="btnTextboxes"
                        icon="input"
                        text="Textboxes"
                        fixedSize={sidebarButtonHeight}
                    />
                    <WIconButton
                        id="btnButtons"
                        icon="keyboard_command_key"
                        text="Buttons"
                        fixedSize={sidebarButtonHeight}
                    />
                    <WIconButton
                        id="btnContainers"
                        icon="dashboard"
                        text="Containers"
                        fixedSize={sidebarButtonHeight}
                    />
                    <WIconButton
                        id="btnToolbar"
                        icon="widgets"
                        text="Toolbars"
                        fixedSize={sidebarButtonHeight}
                    />
                    <WIconButton
                        id="btnDataGrid"
                        icon="view_list"
                        text="Data Grid"
                        fixedSize={sidebarButtonHeight}
                    />
                    <WIconButton
                        id="btnSlider"
                        icon="linear_scale"
                        text="Sliders"
                        fixedSize={sidebarButtonHeight}
                    />
                    <WIconButton
                        id="btnTabs"
                        icon="tab"
                        text="Tabs"
                        fixedSize={sidebarButtonHeight}
                    />
                    <WIconButton
                        id="btnProgressbars"
                        icon="donut_large"
                        text="Progrssbars"
                        fixedSize={sidebarButtonHeight}
                    />
                    <WIconButton
                        id="btnImages"
                        icon="image"
                        text="Images"
                        fixedSize={sidebarButtonHeight}
                    />
                    <WIconButton
                        id="btnIcons"
                        icon="filter_hdr"
                        text="Icons"
                        fixedSize={sidebarButtonHeight}
                    />
                    <WIconButton
                        id="btnDialogs"
                        icon="open_in_new_down"
                        text="Dialogs"
                        fixedSize={sidebarButtonHeight}
                    />
                </WContainer>
                <div id="widgets-container"></div>
            </WHPanel>
        );
    })()
);
