import { Application, Widgets } from "../../core/application.core";
import { createApplication } from "../../core/application.builder";
import { WIconView } from "../../ui/IconView.ui";
import { WIconViewItem } from "../../ui/IconViewItem.ui";

window.app = (() => {
    const sendData = () => {
        //const textName = w.get("txtName") as Textbox;
        console.log("Send Data:...");
    };

    return createApplication(
        <Application title="Hola mundo" padding={5} orientation="vertical">
            <Widgets>
                <WIconView onClick={sendData}>
                    <WIconViewItem id="iconViewItem" icon="home" text="Texto del icon 1" />
                    <WIconViewItem id="iconViewItem" icon="save" text="Texto del icon 2" />
                    <WIconViewItem id="iconViewItem" icon="delete" text="Texto del icon 3" />
                </WIconView>
            </Widgets>
        </Application>
    );
})();
