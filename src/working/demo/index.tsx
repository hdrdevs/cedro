import "./style.css";
import { createApplication } from "../../core/application.builder";
import { Application, Routes, Route, Widgets } from "../../core/application.core";
import { WContainer, WSpacer } from "../../ui/container.ui";
import { WImage } from "../../ui/image.ui";
import { WIconButtonMenu, WIconButtonMenuItem } from "../../ui/iconButtonMenu.ui";
import { ButtonStack, WButtonStack } from "../../ui/buttonstack.ui";
import { WIconButton } from "../../ui/IconButton.ui";
import { config } from "./config";

const ThemeMenu = () => {
    const handleThemeChanged = (args: any) => {
        const pattern = "btn-theme-";
        const theme = args.id.slice(pattern.length);
        app?.theme.setTheme(theme);
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

window.app = (() => {
    const onRenderHandler = () => {
        if (!app) return;

        const stack = w.get("topmenu-stack") as ButtonStack;

        stack?.setFixedSize(getStackWidth());
    };

    const getStackWidth = (): number => {
        if (!window.app) return config.STACK_MAX_WIDTH;

        if (window.app?.screen.getWidth() < config.SCREEN_TRIGGER_WIDTH) {
            return config.STACK_MIN_WIDTH;
        }

        return config.STACK_MAX_WIDTH;
    };

    const onLoadHandler = () => {
        const stack = w.get("topmenu-stack") as ButtonStack;
        const router = app?.router;

        if (!router) {
            return;
        }

        const route = router.getCurrentLocation().url;

        if (route.indexOf("working/demo/widget-gallery") > -1) {
            stack.setActive("btn-widget-gallery");
        } else if (router.getCurrentLocation().url.indexOf("working/demo/counter") > -1) {
            stack.setActive("btn-home");
        } else {
            stack.setActive("btn-home");
            app?.goTo("/working/demo/counter");
        }

        onRenderHandler();
    };

    return createApplication(
        <Application
            title="Ceddro Application Demo | Cedro"
            padding={0}
            orientation="vertical"
            theme="dark"
            onResize={onRenderHandler}
            onLoad={onLoadHandler}
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
                            fixedSize={getStackWidth()}
                            centerX
                        >
                            <WIconButton
                                id="btn-home"
                                icon="home"
                                text="Home"
                                onClick={() => {
                                    app?.goTo("/working/demo/counter");
                                }}
                            />
                            <WIconButton
                                id="btn-widget-gallery"
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
                <Route src="/working/demo/widget-gallery/images" />
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
