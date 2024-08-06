import "./style.css";
import { createWidget } from "../../../..";
import { Layout } from "../Layout";
import { WContainer, WSpacer } from "../../../../ui/container.ui";
import { WLabel } from "../../../../ui/label.ui";
import { WValueBar } from "../../../../ui/valuebar.ui";

export default (() => {
    return createWidget(
        <Layout>
            <WContainer orientation="vertical" padding={10}>
                <WLabel text="Horizontal Value Bars" centerY fixedSize={40} variant="h3" />
                <WContainer orientation="vertical" padding={10} variant="outlined">
                    <WValueBar value={50} fixedSize={55} />
                    <WValueBar value={75} fixedSize={55} />
                    <WValueBar value={25} fixedSize={55} />
                    <WValueBar value={40} fixedSize={55} />
                </WContainer>
            </WContainer>
            <WContainer orientation="vertical" padding={10}>
                <WLabel text="Vertical Value Bars" centerY fixedSize={40} variant="h3" />
                <WContainer orientation="horizontal" padding={10} variant="outlined">
                    <WSpacer />
                    <WValueBar value={50} fixedSize={55} orientation="vertical" />
                    <WValueBar value={75} fixedSize={55} orientation="vertical" />
                    <WValueBar value={25} fixedSize={55} orientation="vertical" />
                    <WValueBar value={50} fixedSize={55} orientation="vertical" />
                    <WValueBar value={50} fixedSize={55} orientation="vertical" />
                    <WValueBar value={75} fixedSize={55} orientation="vertical" />
                    <WValueBar value={25} fixedSize={55} orientation="vertical" />
                    <WValueBar value={50} fixedSize={55} orientation="vertical" />
                    <WValueBar value={50} fixedSize={55} orientation="vertical" />
                    <WValueBar value={75} fixedSize={55} orientation="vertical" />
                    <WValueBar value={25} fixedSize={55} orientation="vertical" />
                    <WValueBar value={50} fixedSize={55} orientation="vertical" />
                    <WSpacer />
                </WContainer>
            </WContainer>
        </Layout>
    );
})();
