import { WHPanel } from "../../ui/hpanel.ui";
import { createApplication } from "../../core/application.builder";
import { Application, Widgets } from "../../core/application.core";
import { WLabel } from "../../ui/label.ui";
import { WVPanel } from "../../ui/vpanel.ui";

window.app = (() => {
    return createApplication(
        <Application title="Hola mundo" padding={5} orientation="vertical">
            <Widgets>
                <WHPanel id="panel" padding={5}>
                    <WLabel id="label" text="Hola mundo" />
                    <WVPanel id="panel2" padding={5}>
                        <WLabel id="label2" text="Hola mundo2" />
                        <WLabel id="label3" text="Hola mundo3" />
                    </WVPanel>
                </WHPanel>
            </Widgets>
        </Application>
    );
})();
