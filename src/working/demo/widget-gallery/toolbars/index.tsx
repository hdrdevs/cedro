import "./style.css";
import { createWidget } from "../../../..";
import { Layout } from "../Layout";
import { WContainer, WSpacer } from "../../../../ui/container.ui";
import { WLabel } from "../../../../ui/label.ui";
import { WButton } from "../../../../ui/button.ui";
import { WIconButton } from "../../../../ui/IconButton.ui";
import { WToolbar } from "../../../../ui/toolbar.ui";

export default (() => {
    return createWidget(
        <Layout>
            <WContainer orientation="vertical" padding={10}>
                <WLabel text="Vertical & Horizontal Toolbars" centerY fixedSize={40} variant="h3" />
                <WContainer orientation="horizontal">
                    <WContainer orientation="vertical" padding={4} fixedSize={52}>
                        <WToolbar id="tool1" orientation="vertical" variant="outlined">
                            <WIconButton icon="home" height={45} />
                        </WToolbar>
                    </WContainer>
                    <WContainer orientation="vertical" padding={4}>
                        <WToolbar orientation="horizontal" variant="outlined" fixedSize={50}>
                            <WIconButton icon="home" width={40} />
                        </WToolbar>
                        <WSpacer fixedSize={3} />
                        <WContainer orientation="vertical" variant="contained"></WContainer>
                    </WContainer>
                </WContainer>
            </WContainer>
        </Layout>
    );
})();
