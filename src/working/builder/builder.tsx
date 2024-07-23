import { createApplication } from "../../core/application.builder";
import { Application, Widgets } from "../../core/application.core";

import { WTextbox } from "../../ui/Textbox.ui";
import { WCheckbox } from "../../ui/checkbox.ui";
import { WRadioButton } from "../../ui/radiobutton.ui";
import { WSwitch } from "../../ui/switch.ui";
import { WIconButton } from "../../ui/IconButton.ui";

import { WButton } from "../../ui/button.ui";
import { WLabel } from "../../ui/label.ui";
import { WContainer } from "../../ui/container.ui";
import { WImage } from "../../ui/image.ui";
import { WToolbar } from "../../ui/toolbar.ui";
import { WProgressBar } from "../../ui/progressbar.ui";
import { WValueBar } from "../../ui/valuebar.ui";
import { WAccordion, WAccordionItem } from "../../ui/accordion.ui";
import { WButtonStack } from "../..//ui/buttonstack.ui";
import { WButtonColor } from "../../ui/buttonColor.ui";
import { WButtonMenu, WButtonMenuItem } from "../../ui/buttonmenu.ui";
import { WIconButtonMenu, WIconButtonMenuItem } from "../../ui/iconButtonMenu.ui";
import { WIcon } from "../../ui/Icon.ui";
import { WTextarea } from "../../ui/textarea.ui";
import { WSelect, WSelectItem } from "../../ui/select.ui";
import { WDialog } from "../../ui/dialog";

window.app = (() => {
    const sendData = () => {
        //const textName = w.get("txtName") as Textbox;
        console.log("Send Data:...");
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
                <WSelect id="txtSelect" title="Select an option" fixedSize={50}>
                    <WSelectItem label="Option 1" id="1" icon="home" />
                    <WSelectItem label="Option 2" id="2" icon="list" />
                    <WSelectItem label="Option 3" id="3" icon="delete" />
                </WSelect>
                <WTextarea id="txtArea" text="Area" fixedSize={100} />
                <WButtonMenu
                    id="btnMenu"
                    fixedSize={50}
                    variant={"contained"}
                    color={"primary"}
                    text="Boton con Opciones"
                >
                    <WButtonMenuItem id="option1" label="Opcion 1" icon="home" />
                    <WButtonMenuItem id="option2" label="Opcion 2" icon="list" />
                    <WButtonMenuItem id="option3" label="Opcion 3" icon="delete" />
                </WButtonMenu>
                <WIconButtonMenu
                    id="btnIconMenu"
                    fixedSize={50}
                    variant={"contained"}
                    color={"success"}
                    text="Boton Icono con Opciones"
                    icon="delete"
                >
                    <WIconButtonMenuItem id="option1" label="Boca Juniors" icon="home" />
                    <WIconButtonMenuItem id="option2" label="Los simpson" icon="list" />
                    <WIconButtonMenuItem id="option3" label="Terminator" icon="delete" />
                </WIconButtonMenu>
                <WContainer orientation="horizontal">
                    <WToolbar id="toolbar2" orientation="vertical" fixedSize={45}>
                        <WIconButton id="tool2Btn1" icon="home" height={45} />
                        <WIconButton id="tool2Btn2" icon="list" height={45} />
                    </WToolbar>
                    <WValueBar id="valbar1" value={65} orientation="vertical" fixedSize={35} />
                    <WContainer orientation="vertical">
                        <WLabel id="lblh1" text="Result" variant="h1" />
                        <WImage id="img1" src="cedro-logo.png" />
                        <WIcon id="icon1" icon="home" color="success" />
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
                <WDialog id="dlg1" hasButtons resizable visible>
                    <WLabel
                        id="lblhOnDialog"
                        text="Este es un dialogo"
                        variant="span"
                        centerY
                        centerX
                    />
                </WDialog>
            </Widgets>
        </Application>
    );
})();
