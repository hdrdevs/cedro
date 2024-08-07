import "./style.css";
import { createApplication } from "../../core/application.builder";
import { Application, Routes, Route, Widgets } from "../../core/application.core";
import { WContainer, WSpacer } from "../../ui/container.ui";
import { WImage } from "../../ui/image.ui";
import { WIconButtonMenu, WIconButtonMenuItem } from "../../ui/iconButtonMenu.ui";
import { ButtonStack, WButtonStack } from "../../ui/buttonstack.ui";
import { WIconButton } from "../../ui/IconButton.ui";

const ThemeMenu = () => {
    const handleThemeChanged = (args: any) => {
        if (args.id == "btn-theme-light") {
            app?.theme.setTheme("light");
        } else if (args.id == "btn-theme-dark") {
            app?.theme.setTheme("dark");
        } else if (args.id == "btn-theme-cedro") {
            app?.theme.setTheme("cedro-light");
        } else if (args.id == "btn-theme-cedro-dark") {
            app?.theme.setTheme("cedro-dark");
        }
    };

    return (
        <WIconButtonMenu
            id="btn-theme"
            icon="palette"
            fixedSize={50}
            onOptionClicked={handleThemeChanged}
        >
            <WIconButtonMenuItem id="btn-theme-light" icon="light_mode" label="Light" />
            <WIconButtonMenuItem id="btn-theme-dark" icon="dark_mode" label="Dark" />
            <WIconButtonMenuItem id="btn-theme-cedro" icon="light_mode" label="Cedro Light" />
            <WIconButtonMenuItem id="btn-theme-cedro-dark" icon="dark_mode" label="Cedro Dark" />
        </WIconButtonMenu>
    );
};

const SCREEN_TRIGGER_WIDTH = 600;
const STACK_MIN_WIDTH = 80;
const STACK_MAX_WIDTH = 370;

window.app = (() => {
    const onRenderHandler = () => {
        const stack = w.get("topmenu-stack") as ButtonStack;

        if (!app) return;

        if (app?.screen.getWidth() < SCREEN_TRIGGER_WIDTH) {
            stack?.setFixedSize(STACK_MIN_WIDTH);
        } else {
            stack?.setFixedSize(STACK_MAX_WIDTH);
        }
    };

    return createApplication(
        <Application
            title="Ceddro Application Demo | Cedro"
            padding={0}
            orientation="vertical"
            theme="dark"
        >
            <Widgets>
                <WContainer orientation="vertical">
                    <WContainer
                        orientation="horizontal"
                        fixedSize={50}
                        padding={4}
                        classNames="headerBar"
                    >
                        <WImage id="top-logo" src="/cedro-logo.png" fixedSize={120} />
                        <WSpacer />
                        <WButtonStack
                            id="topmenu-stack"
                            orientation="horizontal"
                            fixedSize={290}
                            onRender={() => {
                                onRenderHandler();
                            }}
                        >
                            <WIconButton
                                icon="home"
                                text="Home"
                                onClick={() => {
                                    app?.goTo("/working/demo/counter");
                                }}
                            />
                            <WIconButton
                                icon="draw"
                                text="Widget Gallery"
                                onClick={() => {
                                    app?.goTo("/working/demo/widget-gallery");
                                }}
                            />
                        </WButtonStack>
                        <WSpacer />
                        <ThemeMenu />
                    </WContainer>
                    <WContainer id="main-container" orientation="vertical"></WContainer>
                </WContainer>
            </Widgets>
            <Routes hostId="main-container">
                <Route src="/" />
                <Route src="/working/demo/counter" />
                <Route src="/working/demo/widget-gallery" />
                <Route src="/working/demo/widget-gallery/buttons" />
                <Route src="/working/demo/widget-gallery/icons" />
                <Route src="/working/demo/widget-gallery/labels" />
                <Route src="/working/demo/widget-gallery/textboxes" />
                <Route src="/working/demo/widget-gallery/progressbar" />
                <Route src="/working/demo/widget-gallery/tabs" />
                <Route src="/working/demo/widget-gallery/containers" />
                <Route src="/working/demo/widget-gallery/valuebars" />
                <Route src="/working/demo/widget-gallery/dialogs" />
                <Route src="/working/demo/widget-gallery/toolbars" />
                <Route src="/working/demo/widget-gallery/datagrids" />
            </Routes>
        </Application>
    );
})();
