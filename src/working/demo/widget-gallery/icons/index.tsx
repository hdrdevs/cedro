import "./style.css";
import { createWidget } from "../../../../";
import { Layout } from "../Layout";
import { WContainer, WSpacer } from "../../../../ui/container.ui";
import { WIcon } from "../../../../ui/Icon.ui";
import { WLabel } from "../../../../ui/label.ui";

export default createWidget(
    <Layout>
        <WContainer orientation="vertical" padding={10}>
            <WLabel text="Icon Sizes" centerY fixedSize={40} variant="h3" />
            <WContainer orientation="horizontal" fixedSize={50}>
                <WIcon icon="home" color="primary" size="xlarge" variant="Filled" fixedSize={70} />
                <WIcon icon="home" color="primary" size="large" variant="Filled" fixedSize={70} />
                <WIcon icon="home" color="primary" size="medium" variant="Filled" fixedSize={70} />
                <WIcon icon="home" color="primary" size="small" variant="Filled" fixedSize={70} />
                <WSpacer />
            </WContainer>
            <WContainer orientation="horizontal" fixedSize={50}>
                <WLabel text="xlarge" centerY fixedSize={70} />
                <WLabel text="large" centerY fixedSize={70} />
                <WLabel text="medium" centerY fixedSize={70} />
                <WLabel text="small" centerY fixedSize={70} />
                <WSpacer />
            </WContainer>
            <WLabel text="Icon Colors" centerY fixedSize={40} variant="h3" />
            <WContainer orientation="horizontal" fixedSize={50}>
                <WIcon size="large" icon="home" color="primary" variant="Filled" />
                <WIcon size="large" icon="home" color="secondary" variant="Filled" />
                <WIcon size="large" icon="home" color="error" variant="Filled" />
                <WIcon size="large" icon="home" color="info" variant="Filled" />
                <WIcon size="large" icon="home" color="success" variant="Filled" />
                <WIcon size="large" icon="home" color="warning" variant="Filled" />
                <WSpacer />
            </WContainer>
            <WContainer orientation="horizontal" fixedSize={50}>
                <WLabel text="primary" centerY />
                <WLabel text="secondary" centerY />
                <WLabel text="error" centerY />
                <WLabel text="info" centerY />
                <WLabel text="success" centerY />
                <WLabel text="warning" centerY />
                <WSpacer />
            </WContainer>
            <WLabel text="Icon Variants" centerY fixedSize={40} variant="h3" />
            <WContainer orientation="horizontal" fixedSize={50}>
                <WIcon size="large" icon="home" variant="Filled" fixedSize={70} />
                <WIcon size="large" icon="home" variant="Outlined" fixedSize={70} />
                <WIcon size="large" icon="home" variant="Round" fixedSize={70} />
                <WIcon size="large" icon="home" variant="Sharp" fixedSize={70} />
                <WSpacer />
            </WContainer>
            <WContainer orientation="horizontal" fixedSize={50}>
                <WLabel text="Filled" centerY fixedSize={70} />
                <WLabel text="Outline" centerY fixedSize={70} />
                <WLabel text="Round" centerY fixedSize={70} />
                <WLabel text="Sharp" centerY fixedSize={70} />
                <WSpacer />
            </WContainer>
        </WContainer>
    </Layout>
);
