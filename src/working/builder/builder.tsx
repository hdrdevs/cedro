import { Textbox, WTextbox } from "../../ui/textbox.ui";
import { createApplication } from "../../core/application.builder";
import { Application, Widgets } from "../../core/application.core";
import { WButton } from "../../ui/button.ui";
import { WLabel } from "../../ui/label.ui";
import { WContainer } from "../../ui/container.ui";
import { WIconButton } from "../../ui/IconButton.ui";
import { WImage } from "../../ui/image.ui";
import { WCheckbox } from "../../ui/checkbox.ui";
import { WRadioButton } from "../../ui/radiobutton";
import { WToolbar } from "../../ui/toolbar.ui";
import { WProgressBar } from "../../ui/progressbar.ui";
import { WValueBar } from "../../ui/valuebar.ui";
import { WSwitch } from "../../ui/switch.ui";
import { WAccordion, WAccordionItem } from "../../ui/accordion.ui";
import { WButtonStack } from "../..//ui/buttonstack.ui";
import { WButtonColor } from "../../ui/buttonColor.ui";

window.app = (() => {
    const sendData = () => {
        const textName = w.get("txtName") as Textbox;
        console.log("Send Data:", textName.getValue());
    };

    return createApplication(
        <Application title="Hola mundo" padding={5} orientation="vertical">
            <Widgets>
                <WToolbar id="toolbar">
                    <WIconButton id="toolBtn1" icon="home" text="Home" width={100} />
                    <WIconButton id="toolBtn2" icon="list" text="List" width={100} />
                </WToolbar>
                <WTextbox id="txtName" title="Name" fixedSize={50} />
                <WTextbox id="txtLastname" title="Lastname" fixedSize={50} />
                <WContainer orientation="horizontal">
                    <WToolbar id="toolbar2" orientation="vertical" fixedSize={45}>
                        <WIconButton id="tool2Btn1" icon="home" height={45} />
                        <WIconButton id="tool2Btn2" icon="list" height={45} />
                    </WToolbar>
                    <WValueBar id="valbar1" value={65} orientation="vertical" fixedSize={35} />
                    <WContainer orientation="vertical">
                        <WLabel id="lblh1" text="Result" variant="h1" />
                        <WImage id="img1" src="cedro-logo.png" />
                        <WSwitch id="swt1" text="Click to check me!" fixedSize={40} />
                        <WCheckbox id="chk1" text="Click to check me!" fixedSize={40} />
                        <WCheckbox id="chk2" text="Click to uncheck me!" fixedSize={40} checked />
                        <WRadioButton id="rad1" text="Click to check me!" fixedSize={40} />
                        <WRadioButton
                            id="rad2"
                            text="Click to uncheck me!"
                            fixedSize={40}
                            checked
                        />
                    </WContainer>
                    <WContainer orientation="vertical">
                        <WAccordion id="acc1" orientation="vertical">
                            <WAccordionItem title="cabecera 1" icon="draw">
                                <WLabel id="lblh2" text="Result 1" variant="h2" centerY />
                            </WAccordionItem>
                            <WAccordionItem title="cabecera 2" icon="home">
                                <WLabel id="lblh3" text="Result 2" variant="h3" centerX centerY />
                            </WAccordionItem>
                        </WAccordion>
                        <WButtonStack id="btnstack1" orientation="vertical" fixedSize={150}>
                            <WIconButton id="icn1" icon="home" text="Home" />
                            <WIconButton id="icn2" icon="list" text="List" />
                            <WIconButton id="icn3" icon="delete" text="Draft" />
                        </WButtonStack>
                        <WButtonColor id="btnColor" value="#ff0000" fixedSize={50} />
                        <WValueBar
                            id="valbar2"
                            value={65}
                            orientation="horizontal"
                            fixedSize={50}
                        />
                        <WProgressBar id="prgbar1" value={65} paddingBar={5} fixedSize={35} />
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
