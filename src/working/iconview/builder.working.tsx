import { Application, Widgets } from "../../core/application.core";
import { createApplication } from "../../core/application.builder";
import { WIconView } from "../../ui/IconView.ui";
import { WIconViewItem } from "../../ui/IconViewItem.ui";

const iconos = [
    {
        icon: "home",
        text: "Home",
        data: 1,
    },
    {
        icon: "delete",
        text: "Admin con un texto gigantemente largo",
        data: 5,
    },
];

window.app = (() => {
    const sendData = () => {
        //const textName = w.get("txtName") as Textbox;
        console.log("Send Data:...");
    };

    return createApplication(
        <Application title="Hola mundo" padding={5} orientation="vertical">
            <Widgets>
                <WIconView variant="Outlined" size="large" itemWidth={120}>
                    {iconos.map((item) => (
                        <WIconViewItem
                            icon={item.icon}
                            text={item.text}
                            onClick={() => {
                                console.log("Click en dato:", item.data);
                            }}
                        />
                    ))}
                </WIconView>
            </Widgets>
        </Application>
    );
})();
