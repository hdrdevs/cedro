import { SideBar } from "./sidebar";
import { WHPanel } from "../../../ui/hpanel.ui";
import { WContainer } from "../../../ui/container.ui";

export type LayoutProps = {
    children: any;
};

export const Layout = (props: LayoutProps) => {
    return (
        <WHPanel id="widget-gallery-side-panel">
            <SideBar />
            <WContainer id="widgets-container" orientation={"vertical"} padding={8}>
                {props.children}
            </WContainer>
        </WHPanel>
    );
};
