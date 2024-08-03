import "./style.css";
import { createWidget } from "../../../..";
import { Layout } from "../Layout";
import { WContainer } from "../../../../ui/container.ui";
import { WLabel } from "../../../../ui/label.ui";
import { WTab, WTabItem } from "../../../../ui/tabs.ui";

export default (() => {
    return createWidget(
        <Layout>
            <WContainer orientation="vertical" padding={10}>
                <WLabel
                    text="Vertical & Horizontal Tab Controls"
                    centerY
                    fixedSize={40}
                    variant="h3"
                />
                <WContainer orientation="horizontal" padding={4}>
                    <WTab orientation="vertical">
                        <WTabItem title="Tab&nbsp;Uno" type="text">
                            <WLabel text="Est quis laboris dolore quis officia culpa incididunt adipisicing incididunt officia nisi magna." />
                        </WTabItem>
                        <WTabItem title="Tab&nbsp;Dos" type="text">
                            <WLabel text="Aliqua mollit ad officia nulla eiusmod aliquip laboris aute magna." />
                        </WTabItem>
                        <WTabItem title="Tab&nbsp;Tres" type="text">
                            <WLabel text="Aliqua nisi elit ullamco nostrud." />
                        </WTabItem>
                        <WTabItem icon="home" type="icon-tab">
                            <WLabel text="Adipisicing adipisicing ipsum proident officia ut Lorem anim elit incididunt sint quis et labore." />
                        </WTabItem>
                        <WTabItem title="Tab&nbsp;Cuatro" type="text">
                            <WLabel text="Nulla ut deserunt elit labore cillum consequat duis amet reprehenderit." />
                        </WTabItem>
                    </WTab>
                    <WTab orientation="horizontal">
                        <WTabItem title="Tab 1" type="text">
                            <WLabel text="Nulla do aliquip pariatur incididunt proident mollit mollit culpa." />
                        </WTabItem>
                        <WTabItem title="Tab 2" type="text">
                            <WLabel text="Lorem elit consequat laborum minim ipsum eiusmod esse quis." />
                        </WTabItem>
                        <WTabItem icon="list" type="icon-tab">
                            <WLabel text="Adipisicing adipisicing ipsum proident officia ut Lorem anim elit incididunt sint quis et labore." />
                        </WTabItem>
                    </WTab>
                </WContainer>
            </WContainer>
        </Layout>
    );
})();
