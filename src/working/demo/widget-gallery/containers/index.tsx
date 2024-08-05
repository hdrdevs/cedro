import "./style.css";
import { createWidget } from "../../../..";
import { Layout } from "../Layout";
import { WContainer } from "../../../../ui/container.ui";
import { WLabel } from "../../../../ui/label.ui";
import { WVPanel } from "../../../../ui/vpanel.ui";
import { WHPanel } from "../../../../ui/hpanel.ui";
import { WAccordion, WAccordionItem } from "../../../../ui/accordion.ui";

export default (() => {
    return createWidget(
        <Layout>
            <WContainer orientation="vertical" padding={10}>
                <WLabel text="Containers" centerY fixedSize={40} variant="h3" />
                <WContainer orientation="horizontal" variant="outlined" padding={8}>
                    <WHPanel>
                        <WContainer orientation="vertical" variant="plain" fixedSize={300}>
                            <WLabel
                                text="Horizontal Panel first child"
                                centerY
                                fixedSize={40}
                                variant="h3"
                            />
                            <WContainer orientation="vertical" variant="contained" padding={20}>
                                <WLabel text="Accordion" centerY fixedSize={40} variant="h3" />
                                <WAccordion>
                                    <WAccordionItem title="cabecera 1" icon="draw">
                                        <WLabel text="In laborum occaecat ea amet qui labore duis ea voluptate ullamco." />
                                    </WAccordionItem>
                                    <WAccordionItem title="cabecera 2" icon="home">
                                        <WLabel text="Laboris mollit duis tempor do ad ut." />
                                    </WAccordionItem>
                                </WAccordion>
                            </WContainer>
                        </WContainer>
                        <WContainer orientation="vertical" variant="plain">
                            <WLabel
                                text="Horizontal Panel second child"
                                centerY
                                fixedSize={40}
                                variant="h3"
                            />
                            <WContainer orientation="vertical" variant="outlined">
                                <WVPanel>
                                    <WContainer
                                        orientation="vertical"
                                        variant="contained"
                                        fixedSize={200}
                                    >
                                        <WLabel
                                            text="Consectetur cupidatat nulla eiusmod adipisicing."
                                            centerY
                                        />
                                    </WContainer>
                                    <WContainer orientation="vertical" variant="contained">
                                        <WLabel
                                            text="Amet ea ea pariatur officia nisi fugiat sint magna."
                                            centerY
                                        />
                                    </WContainer>
                                </WVPanel>
                            </WContainer>
                        </WContainer>
                    </WHPanel>
                </WContainer>
            </WContainer>
        </Layout>
    );
})();
