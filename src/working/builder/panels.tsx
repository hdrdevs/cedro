import { WHPanel } from "../../ui/hpanel.ui";
import { createApplication } from "../../core/application.builder";
import { Application, Widgets } from "../../core/application.core";
import { WLabel } from "../../ui/label.ui";
import { WVPanel } from "../../ui/vpanel.ui";
import { WTab, WTabItem } from "../../ui/tabs.ui";

window.app = (() => {
    return createApplication(
        <Application title="Hola mundo" padding={5} orientation="vertical">
            <Widgets>
                <WHPanel id="panel" padding={5}>
                    <WTab id="tab" orientation="vertical">
                        <WTabItem title="tab 1" type="text">
                            <WLabel id="label" text="Hola mundo" />
                        </WTabItem>
                        <WTabItem icon="list" type="icon-tab">
                            <WLabel id="label4" text="Hola mundo 2 con icon tab" />
                        </WTabItem>
                    </WTab>
                    <WVPanel id="panel2" padding={5}>
                        <WLabel id="label2" text="Hola mundo2" />
                        <WLabel id="label3" text="Hola mundo3" />
                    </WVPanel>
                </WHPanel>
            </Widgets>
        </Application>
    );
})();
