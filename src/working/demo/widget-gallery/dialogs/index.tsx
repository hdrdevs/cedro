import "./style.css";
import { createWidget } from "../../../..";
import { Layout } from "../Layout";
import { WContainer } from "../../../../ui/container.ui";
import { WLabel } from "../../../../ui/label.ui";
import { WDialog } from "../../../../ui/dialog";

export default (() => {
    return createWidget(
        <Layout>
            <WContainer orientation="vertical" padding={10}>
                <WLabel text="Dialogs" centerY fixedSize={40} variant="h3" />
                <WContainer orientation="horizontal" padding={4}>
                    <WDialog
                        resizable
                        visible
                        positionX={10}
                        positionY={10}
                        width={400}
                        height={200}
                    >
                        <WLabel text="Resizable dialog" variant="span" centerY centerX />
                    </WDialog>
                    <WDialog
                        hasButtons
                        visible
                        positionX={450}
                        positionY={10}
                        width={400}
                        height={200}
                    >
                        <WLabel text="Alert dialog" variant="span" centerY centerX />
                    </WDialog>
                </WContainer>
            </WContainer>
        </Layout>
    );
})();
