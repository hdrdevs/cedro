import "./style.css";
import { createWidget } from "../../../..";
import { Layout } from "../Layout";
import { WContainer, WSpacer } from "../../../../ui/container.ui";
import { WLabel } from "../../../../ui/label.ui";

import { WIconButton } from "../../../../ui/IconButton.ui";
import { WIconButtonMenu, WIconButtonMenuItem } from "../../../../ui/iconButtonMenu.ui";
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
                            <WIconButtonMenu icon="list" height={45}>
                                <WIconButtonMenuItem id="option1" label="Option 1" icon="home" />
                                <WIconButtonMenuItem id="option2" label="Option 2" icon="list" />
                            </WIconButtonMenu>
                        </WToolbar>
                    </WContainer>
                    <WContainer orientation="vertical" padding={4}>
                        <WToolbar orientation="horizontal" variant="outlined" fixedSize={50}>
                            <WIconButton icon="home" width={40} />
                            <WIconButton icon="save" width={40} />
                            <WIconButton icon="list" text="List" width={80} />
                            <WIconButton icon="delete" text="Trash" width={100} />
                            <WIconButton icon="draw" text="Draw" width={100} />
                            <WIconButton icon="refresh" text="Refresh" width={105} />
                        </WToolbar>
                        <WSpacer fixedSize={3} />
                        <WContainer orientation="vertical" variant="contained"></WContainer>
                    </WContainer>
                </WContainer>
            </WContainer>
        </Layout>
    );
})();
