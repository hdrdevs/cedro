import "./style.css";
import { createWidget } from "../../../..";
import { Layout } from "../Layout";
import { WContainer } from "../../../../ui/container.ui";
import { WLabel } from "../../../../ui/label.ui";
import { WDataGrid, WDataGridColumn } from "../../../../ui/datagrid.ui";

export default (() => {
    const db = [
        {
            name: "Ana González",
            years: 19,
            country: "Colombia",
            label: "View",
            checked: true,
            porcentaje: 82,
            icon: "delete",
        },
        {
            name: "Diego Martínez",
            years: 55,
            country: "Chile",
            label: "View",
            checked: false,
            porcentaje: 45,
            icon: "delete",
        },
        {
            name: "Carla Sánchez",
            years: 37,
            country: "Perú",
            label: "View",
            checked: true,
            porcentaje: 67,
            icon: "delete",
        },
        {
            name: "Pedro Ramírez",
            years: 41,
            country: "Ecuador",
            label: "View",
            checked: false,
            porcentaje: 92,
            icon: "delete",
        },
        {
            name: "Laura Rodríguez",
            years: 23,
            country: "Venezuela",
            label: "View",
            checked: true,
            porcentaje: 38,
            icon: "delete",
        },
        {
            name: "José Fernández",
            years: 64,
            country: "Uruguay",
            label: "View",
            checked: false,
            porcentaje: 76,
            icon: "delete",
        },
        {
            name: "Sofía López",
            years: 50,
            country: "Paraguay",
            label: "View",
            checked: true,
            porcentaje: 59,
            icon: "delete",
        },
        {
            name: "Luis Pérez",
            years: 29,
            country: "Argentina",
            label: "View",
            checked: false,
            porcentaje: 20,
            icon: "delete",
        },
        {
            name: "María García",
            years: 18,
            country: "España",
            label: "View",
            checked: true,
            porcentaje: 88,
            icon: "delete",
        },
        {
            name: "Juan Hernández",
            years: 36,
            country: "México",
            label: "View",
            checked: false,
            porcentaje: 14,
            icon: "delete",
        },
        {
            name: "Ana Díaz",
            years: 47,
            country: "Colombia",
            label: "View",
            checked: true,
            porcentaje: 71,
            icon: "delete",
        },
        {
            name: "Diego Ruiz",
            years: 22,
            country: "Chile",
            label: "View",
            checked: false,
            porcentaje: 50,
            icon: "delete",
        },
        {
            name: "Carla Flores",
            years: 33,
            country: "Perú",
            label: "View",
            checked: true,
            porcentaje: 66,
            icon: "delete",
        },
        {
            name: "Pedro Acosta",
            years: 59,
            country: "Ecuador",
            label: "View",
            checked: false,
            porcentaje: 95,
            icon: "delete",
        },
        {
            name: "Laura Gómez",
            years: 43,
            country: "Venezuela",
            label: "View",
            checked: true,
            porcentaje: 23,
            icon: "delete",
        },
        {
            name: "José Suárez",
            years: 39,
            country: "Uruguay",
            label: "View",
            checked: false,
            porcentaje: 84,
            icon: "delete",
        },
        {
            name: "Sofía Castro",
            years: 26,
            country: "Paraguay",
            label: "View",
            checked: true,
            porcentaje: 62,
            icon: "delete",
        },
        {
            name: "Juan Mendoza",
            years: 60,
            country: "Argentina",
            label: "View",
            checked: false,
            porcentaje: 77,
            icon: "delete",
        },
        {
            name: "María Ortiz",
            years: 14,
            country: "España",
            label: "View",
            checked: true,
            porcentaje: 48,
            icon: "delete",
        },
        {
            name: "Luis Morales",
            years: 25,
            country: "México",
            label: "View",
            checked: false,
            porcentaje: 69,
            icon: "delete",
        },
        {
            name: "Ana Vargas",
            years: 36,
            country: "Colombia",
            label: "View",
            checked: true,
            porcentaje: 93,
            icon: "delete",
        },
        {
            name: "Diego Herrera",
            years: 40,
            country: "Chile",
            label: "View",
            checked: false,
            porcentaje: 32,
            icon: "delete",
        },
        {
            name: "Carla Jiménez",
            years: 51,
            country: "Perú",
            label: "View",
            checked: true,
            porcentaje: 58,
            icon: "delete",
        },
        {
            name: "Pedro Medina",
            years: 30,
            country: "Ecuador",
            label: "View",
            checked: false,
            porcentaje: 75,
            icon: "delete",
        },
        {
            name: "Laura Navarro",
            years: 65,
            country: "Venezuela",
            label: "View",
            checked: true,
            porcentaje: 40,
            icon: "delete",
        },
        {
            name: "José Torres",
            years: 22,
            country: "Uruguay",
            label: "View",
            checked: false,
            porcentaje: 81,
            icon: "delete",
        },
        {
            name: "Sofía Méndez",
            years: 38,
            country: "Paraguay",
            label: "View",
            checked: true,
            porcentaje: 55,
            icon: "delete",
        },
        {
            name: "Juan Ruiz",
            years: 46,
            country: "Argentina",
            label: "View",
            checked: false,
            porcentaje: 96,
            icon: "delete",
        },
        {
            name: "María Salazar",
            years: 37,
            country: "España",
            label: "View",
            checked: true,
            porcentaje: 21,
            icon: "delete",
        },
        {
            name: "Luis Castro",
            years: 28,
            country: "México",
            label: "View",
            checked: false,
            porcentaje: 61,
            icon: "delete",
        },
        {
            name: "Ana Sánchez",
            years: 55,
            country: "Colombia",
            label: "View",
            checked: true,
            porcentaje: 73,
            icon: "delete",
        },
        {
            name: "Diego Martínez",
            years: 22,
            country: "Chile",
            label: "View",
            checked: false,
            porcentaje: 35,
            icon: "delete",
        },
    ];

    const onYearsClicked = (args: any) => {
        app?.alert("Alert", "Click on <strong>" + args.data.name + "</strong> ");
    };

    const onBtnClicked = (args: any) => {
        app?.alert(
            "Alert",
            "Click on <strong>" +
                args.data.name +
                "</strong> and his has <strong>" +
                args.data.years +
                "</strong> Years old "
        );
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
                        <WDataGridColumn
                            header="Progress"
                            field="porcentaje"
                            width={120}
                            widgetType="progressbar"
                            classNames="columnYears"
                        />
                        <WDataGridColumn
                            header="&nbsp;"
                            field="label"
                            width={80}
                            widgetType="button"
                            onClick={onBtnClicked}
                        />
                        <WDataGridColumn
                            header="&nbsp;"
                            field="icon"
                            width={45}
                            widgetType="iconbutton"
                            onClick={onBtnClicked}
                        />
                    </WDataGrid>
                </WContainer>
            </WContainer>
        </Layout>
    );
})();
