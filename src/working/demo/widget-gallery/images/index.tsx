import "./style.css";
import { createWidget } from "../../../..";
import { Layout } from "../Layout";
import { WContainer } from "../../../../ui/container.ui";
import { WLabel } from "../../../../ui/label.ui";
import { WImage } from "../../../../ui/image.ui";

export default createWidget(
    <Layout>
        <WContainer orientation="vertical" padding={10}>
            <WLabel text="Image - Fixed Size" centerY fixedSize={40} variant="h3" />
            <WImage src="/cedro-logo.svg" fixedSize={70} alt="Image - Fixed Size" />
            <WLabel text="Image - Centered & Fill Width" centerY fixedSize={40} variant="h3" />
            <WContainer orientation="horizontal">
                <WImage src="/cedro-logo.svg" fillWidth alt="Image - Centered & Fill Width" />
                <WImage src="/cedro-logo.svg" fillWidth alt="Image - Centered & Fill Width" />
                <WImage src="/cedro-logo.svg" fillWidth alt="Image - Centered & Fill Width" />
            </WContainer>
            <WLabel text="Image - Fill Height" centerY fixedSize={40} variant="h3" />
            <WImage src="/cedro-logo.svg" fillHeight alt="Image - Fill Height" />
        </WContainer>
    </Layout>
);
