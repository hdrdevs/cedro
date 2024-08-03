import "./style.css";
import { createApplication } from "../../core/application.builder";
import { Application, Routes, Route, Widgets } from "../../core/application.core";
import { WContainer, WSpacer } from "../../ui/container.ui";
import { WImage } from "../../ui/image.ui";
import { WButton } from "../../ui/button.ui";
import { WIconButtonMenu, WIconButtonMenuItem } from "../../ui/iconButtonMenu.ui";

const ThemeMenu = () => {
    return (
        <WIconButtonMenu id="btn-theme" icon="palette" fixedSize={50}>
            <WIconButtonMenuItem id="btn-theme-light" icon="light_mode" label="Light" />
            <WIconButtonMenuItem id="btn-theme-dark" icon="dark_mode" label="Dark" />
            <WIconButtonMenuItem id="btn-theme-cedro" icon="light_mode" label="Cedro Light" />
            <WIconButtonMenuItem id="btn-theme-cedro-dark" icon="dark_mode" label="Cedro Dark" />
        </WIconButtonMenu>
    );
};

window.app = (() =>
    createApplication(
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
                        <WButton
                            text="Home"
                            fixedSize={100}
                            onClick={() => {
                                app?.goTo("/working/demo/counter");
                            }}
                        />
                        <WButton
                            text="Widget Gallery"
                            fixedSize={150}
                            onClick={() => {
                                app?.goTo("/working/demo/widget-gallery");
                            }}
                        />
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
            </Routes>
        </Application>
    ))();
