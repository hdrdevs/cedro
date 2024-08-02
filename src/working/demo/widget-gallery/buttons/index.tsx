import "./style.css";
import { WButton } from "../../../../ui/button.ui";
import { createWidget, WidgetTypes } from "../../../../";
import { Layout } from "../Layout";
import { WContainer } from "../../../../ui/container.ui";
import { WLabel } from "../../../../ui/label.ui";

export default createWidget(
    <Layout>
        <WContainer type={WidgetTypes.FREE} classNames="ItemTitle">
            <WLabel id="mi-label-absolutro" text="Buttons" variant="h3" />
        </WContainer>
        <WContainer type={WidgetTypes.FREE} classNames="ButtonsContainer">
            <WButton text="Primary | Text" variant="text" color="primary" />
            <WButton text="Secondary | Text" variant="text" color="secondary" />
            <WButton text="Success | Text" variant="text" color="success" />
            <WButton text="Info | Outlined" variant="text" color="info" />
            <WButton text="Error | Text" variant="text" color="error" />
            <WButton text="Warning | Text" variant="text" color="warning" />
            <WButton text="Primary | Contained" variant="contained" color="primary" />
            <WButton text="Secondary | Contained" variant="contained" color="secondary" />
            <WButton text="Success | Contained" variant="contained" color="success" />
            <WButton text="Info | Contained" variant="contained" color="info" />
            <WButton text="Error | Contained" variant="contained" color="error" />
            <WButton text="Warning | Contained" variant="contained" color="warning" />
            <WButton text="Primary | Outlined" variant="outlined" color="primary" />
            <WButton text="Secondary | Outlined" variant="outlined" color="secondary" />
            <WButton text="Success | Outlined" variant="outlined" color="success" />
            <WButton text="Info | Outlined" variant="outlined" color="info" />
            <WButton text="Error | Outlined" variant="outlined" color="error" />
            <WButton text="Warning | Outlined" variant="outlined" color="warning" />
        </WContainer>
    </Layout>
);
