import "./style.css";
import { createWidget } from "../../../..";
import { Layout } from "../Layout";
import { WContainer, WSpacer } from "../../../../ui/container.ui";
import { WLabel } from "../../../../ui/label.ui";
import { WTextbox } from "../../../../ui/Textbox.ui";
import { WTextarea } from "../../../../ui/textarea.ui";

export default createWidget(
    <Layout>
        <WContainer orientation="vertical" padding={10}>
            <WLabel text="Textboxes" centerY fixedSize={40} variant="h3" />
            <WContainer orientation="vertical">
                <WTextbox title="Enter some text" inputType="text" fixedSize={55} />
                <WSpacer fixedSize={15} />
                <WTextbox title="Enter some date" inputType="date" fixedSize={55} />
                <WSpacer fixedSize={15} />
                <WTextbox
                    title="Enter some date and time"
                    inputType="datetime-local"
                    fixedSize={55}
                />
                <WSpacer fixedSize={15} />
                <WTextbox title="Enter some number" inputType="number" fixedSize={55} />
                <WSpacer fixedSize={15} />
                <WTextbox title="Enter some email" inputType="email" fixedSize={55} />
                <WSpacer fixedSize={15} />
                <WTextbox title="Enter some password" inputType="password" fixedSize={55} />
                <WSpacer fixedSize={15} />
                <WTextbox title="Select some color" inputType="color" fixedSize={55} />
                <WSpacer fixedSize={15} />
                <WTextarea text="Enter some sentences" />
            </WContainer>
        </WContainer>
    </Layout>
);
