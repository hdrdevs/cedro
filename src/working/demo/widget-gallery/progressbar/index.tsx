import "./style.css";
import { createWidget } from "../../../..";
import { Layout } from "../Layout";
import { WContainer } from "../../../../ui/container.ui";
import { WLabel } from "../../../../ui/label.ui";
import { ProgressBar, WProgressBar } from "../../../../ui/progressbar.ui";

export default (() => {
    const animateProgressBar = (id: string) => {
        const progressBar = w.get(id) as ProgressBar;
        const increment = Math.floor(Math.random() * 2);

        if (!progressBar) return;
        let value = progressBar.getValue() + increment;
        if (value > 100) {
            value = 0;
        }
        progressBar.setValue(value);
    };

    setInterval(() => {
        animateProgressBar("progressBar1");
        animateProgressBar("progressBar2");
    }, 10);

    return createWidget(
        <Layout>
            <WContainer orientation="vertical" padding={10}>
                <WLabel text="Progress Bars" centerY fixedSize={40} variant="h3" />
                <WContainer orientation="vertical" padding={10}>
                    <WProgressBar value={50} paddingBar={4} fixedSize={55} />
                    <WProgressBar id="progressBar1" value={75} paddingBar={4} fixedSize={55} />
                    <WProgressBar value={25} fixedSize={55} />
                    <WProgressBar id="progressBar2" value={0} fixedSize={55} />
                </WContainer>
            </WContainer>
        </Layout>
    );
})();
