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
            theme="cedro-dark"
        >
            <Widgets>
                <WContainer orientation="vertical">
                    <WContainer orientation="horizontal" fixedSize={50} padding={4}>
                        <WImage id="top-logo" src="/cedro-logo.png" fixedSize={100} />
                        <WSpacer />
                        <WButton
                            id="btn-1"
                            text="Home"
                            fixedSize={100}
                            onClick={() => {
                                app?.goTo("/working/demo/counter");
                            }}
                        />
                        <WButton
                            id="btn-2"
                            text="Widget Gallery"
                            fixedSize={150}
                            onClick={() => {
                                app?.goTo("/working/demo/widget-gallery");
                            }}
                        />
                        <WSpacer />
                        <ThemeMenu />
                    </WContainer>
                    <div id="main-container"></div>
                </WContainer>
            </Widgets>
            <Routes hostId="main-container">
                <Route src="/" />
                <Route src="/working/demo/counter" />
                <Route src="/working/demo/widget-gallery" />
            </Routes>
        </Application>
    ))();
