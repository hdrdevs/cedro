import "./style.css";
import { WButton } from "../../../../ui/button.ui";
import { createWidget, WidgetTypes } from "../../../../";
import { Layout } from "../Layout";
import { WContainer } from "../../../../ui/container.ui";

export default createWidget(
    <Layout>
        <WContainer type={WidgetTypes.FREE} classNames="ButtonsContainer">
            <WButton id="btn1" text="Primary | Text" variant="text" color="primary" />
            <WButton id="btn2" text="Secondary | Text" variant="text" color="secondary" />
            <WButton id="btn3" text="Success | Text" variant="text" color="success" />
            <WButton id="btn4" text="Info | Outlined" variant="text" color="info" />
            <WButton id="btn5" text="Error | Text" variant="text" color="error" />
            <WButton id="btn6" text="Warning | Text" variant="text" color="warning" />
            <WButton id="btn7" text="Primary | Contained" variant="contained" color="primary" />
            <WButton id="btn8" text="Secondary | Contained" variant="contained" color="secondary" />
            <WButton id="btn9" text="Success | Contained" variant="contained" color="success" />
            <WButton id="btn10" text="Info | Contained" variant="contained" color="info" />
            <WButton id="btn11" text="Error | Contained" variant="contained" color="error" />
            <WButton id="btn12" text="Warning | Contained" variant="contained" color="warning" />
            <WButton id="btn13" text="Primary | Outlined" variant="outlined" color="primary" />
            <WButton id="btn14" text="Secondary | Outlined" variant="outlined" color="secondary" />
            <WButton id="btn15" text="Success | Outlined" variant="outlined" color="success" />
            <WButton id="btn16" text="Info | Outlined" variant="outlined" color="info" />
            <WButton id="btn17" text="Error | Outlined" variant="outlined" color="error" />
            <WButton id="btn18" text="Warning | Outlined" variant="outlined" color="warning" />
        </WContainer>
    </Layout>
);
