import { Textbox, WTextbox } from "../../ui/textbox.ui";
import { createApplication } from "../../core/application.builder";
import { Application, Widgets } from "../../core/application.core";
import { WButton } from "../../ui/button.ui";
import { WLabel } from "../../ui/label.ui";
import { WContainer } from "../../ui/container.ui";
import { WIconButton } from "../../ui/IconButton.ui";

export const app = (() => {
    const sendData = () => {
        const textName = w.get("txtName") as Textbox;
        console.log("Send Data:", textName.getValue());
    };

    return createApplication(
        <Application title="Hola mundo" padding={5} orientation="vertical">
            <Widgets>
                <WTextbox id="txtName" title="Name" fixedSize={50} />
                <WTextbox id="txtLastname" title="Lastname" />
                <WContainer orientation="horizontal">
                    <WLabel id="lblh1" text="Result" variant="h1" />
                    <WContainer orientation="vertical">
                        <WLabel id="lblh2" text="Result" variant="h2" />
                        <WLabel id="lblh3" text="Result" variant="h3" />
                        <WIconButton id="icn1" icon="home" text="Home" />
                    </WContainer>
                </WContainer>
                <WButton
                    id="btnSend"
                    text="Enviar Datos"
                    variant={"contained"}
                    fixedSize={50}
                    onClick={sendData}
                />
            </Widgets>
        </Application>
    );
})();
