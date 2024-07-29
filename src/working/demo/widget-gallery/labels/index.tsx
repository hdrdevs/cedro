import "./style.css";
import { createWidget } from "../../../..";
import { Layout } from "../Layout";
import { WContainer } from "../../../../ui/container.ui";
import { WLabel } from "../../../../ui/label.ui";

export default createWidget(
    <Layout>
        <WContainer orientation="vertical" padding={10}>
            <WLabel text="H1-6 Labels" centerY fixedSize={40} variant="h3" />
            <WContainer orientation="vertical">
                <WLabel
                    text="H1 Label Variant (primary)"
                    variant="h1"
                    color="primary"
                    fixedSize={55}
                />
                <WLabel
                    text="H2 Label Variant (secondary)"
                    variant="h2"
                    color="secondary"
                    fixedSize={50}
                />
                <WLabel text="H3 Label Variant (error)" variant="h3" color="error" fixedSize={45} />
                <WLabel
                    text="H4 Label Variant (success)"
                    variant="h4"
                    color="success"
                    fixedSize={40}
                />
                <WLabel text="H6 Label Variant (info)" variant="h5" color="info" fixedSize={30} />
                <WLabel
                    text="H6 Label Variant (warning)"
                    variant="h6"
                    color="warning"
                    fixedSize={20}
                />
            </WContainer>
            <WLabel text="Span Labels" centerY fixedSize={40} variant="h3" />
            <WContainer orientation="vertical">
                <WLabel text="Span label" variant="span" color="primary" fixedSize={55} />
                <WLabel
                    text="Span label (horizontally centered)"
                    variant="h2"
                    color="secondary"
                    fixedSize={50}
                    centerX
                />
                <WLabel text="Span label (vertically centered)" variant="spane" centerY />
                <WLabel
                    text="Span label (vertically and horizontally centered)"
                    variant="span"
                    centerX
                    centerY
                />
            </WContainer>
        </WContainer>
    </Layout>
);
