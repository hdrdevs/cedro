import "./style.css";
import { createWidget } from "../../../..";
import { Layout } from "../Layout";
import { WContainer } from "../../../../ui/container.ui";
import { WLabel } from "../../../../ui/label.ui";
import { WDataGrid, WDataGridColumn } from "../../../../ui/datagrid.ui";

export default (() => {
    const db = [
        { name: "horacio", years: 40 },
        { name: "daniel", years: 39 },
        { name: "ros", years: 38 },
    ];

    const onYearsClicked = (args: any) => {
        app?.alert("Alert", "Click on <strong>" + args.data.name + "</strong> ");
    };

    return createWidget(
        <Layout>
            <WContainer orientation="vertical" padding={10}>
                <WLabel
                    text="Vertical & Horizontal Tab Controls"
                    centerY
                    fixedSize={40}
                    variant="h3"
                />
                <WContainer orientation="vertical" padding={4}>
                    <WDataGrid data={JSON.stringify(db)} rowHeight={30}>
                        <WDataGridColumn
                            header="Name"
                            field="name"
                            width={200}
                            widgetType="label"
                            classNames="columnName"
                        />
                        <WDataGridColumn
                            header="Years"
                            field="years"
                            width={80}
                            widgetType="label"
                            classNames="columnYears"
                            onClick={onYearsClicked}
                        />
                    </WDataGrid>
                </WContainer>
            </WContainer>
        </Layout>
    );
})();
