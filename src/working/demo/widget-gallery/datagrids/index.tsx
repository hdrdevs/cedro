import "./style.css";
import { createWidget } from "../../../..";
import { Layout } from "../Layout";
import { WContainer } from "../../../../ui/container.ui";
import { WLabel } from "../../../../ui/label.ui";
import { WDataGrid, WDataGridColumn } from "../../../../ui/datagrid.ui";

export default (() => {
    const db = [
        { name: "Ana González", years: 19, country: "Colombia" },
        { name: "Diego Martínez", years: 55, country: "Chile" },
        { name: "Carla Sánchez", years: 37, country: "Perú" },
        { name: "Pedro Ramírez", years: 41, country: "Ecuador" },
        { name: "Laura Rodríguez", years: 23, country: "Venezuela" },
        { name: "José Fernández", years: 64, country: "Uruguay" },
        { name: "Sofía López", years: 50, country: "Paraguay" },
        { name: "Luis Pérez", years: 29, country: "Argentina" },
        { name: "María García", years: 18, country: "España" },
        { name: "Juan Hernández", years: 36, country: "México" },
        { name: "Ana Díaz", years: 47, country: "Colombia" },
        { name: "Diego Ruiz", years: 22, country: "Chile" },
        { name: "Carla Flores", years: 33, country: "Perú" },
        { name: "Pedro Acosta", years: 59, country: "Ecuador" },
        { name: "Laura Gómez", years: 43, country: "Venezuela" },
        { name: "José Suárez", years: 39, country: "Uruguay" },
        { name: "Sofía Castro", years: 26, country: "Paraguay" },
        { name: "Juan Mendoza", years: 60, country: "Argentina" },
        { name: "María Ortiz", years: 14, country: "España" },
        { name: "Luis Morales", years: 25, country: "México" },
        { name: "Ana Vargas", years: 36, country: "Colombia" },
        { name: "Diego Herrera", years: 40, country: "Chile" },
        { name: "Carla Jiménez", years: 51, country: "Perú" },
        { name: "Pedro Medina", years: 30, country: "Ecuador" },
        { name: "Laura Navarro", years: 65, country: "Venezuela" },
        { name: "José Torres", years: 22, country: "Uruguay" },
        { name: "Sofía Méndez", years: 38, country: "Paraguay" },
        { name: "Juan Ruiz", years: 46, country: "Argentina" },
        { name: "María Salazar", years: 37, country: "España" },
        { name: "Luis Castro", years: 28, country: "México" },
        { name: "Ana Sánchez", years: 55, country: "Colombia" },
        { name: "Diego Martínez", years: 22, country: "Chile" },
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
                            header="Country"
                            field="country"
                            width={150}
                            widgetType="label"
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
