import "./style.css";
import { createWidget } from "../../../..";
import { Layout } from "../Layout";
import { WContainer, WLabel, WDataGrid, WDataGridColumn } from "../../../../ui";

export type GridRowInfo = {
    name: string;
    years: number;
    country: string;
    label: string;
    checked: boolean;
    porcentaje: number;
    icon: string;
};

export default (() => {

    const db: GridRowInfo[] = [
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

    const db2: GridRowInfo[] = [
        {
            name: "Valentina Romero",
            years: 24,
            country: "Argentina",
            label: "View",
            checked: false,
            porcentaje: 64,
            icon: "delete",
        },
        {
            name: "Tomás Silva",
            years: 52,
            country: "Uruguay",
            label: "View",
            checked: true,
            porcentaje: 79,
            icon: "delete",
        },
        {
            name: "Camila Torres",
            years: 31,
            country: "Chile",
            label: "View",
            checked: false,
            porcentaje: 43,
            icon: "delete",
        },
        {
            name: "Martín Delgado",
            years: 45,
            country: "Perú",
            label: "View",
            checked: true,
            porcentaje: 91,
            icon: "delete",
        },
        {
            name: "Lucía Herrera",
            years: 20,
            country: "Paraguay",
            label: "View",
            checked: false,
            porcentaje: 37,
            icon: "delete",
        },
        {
            name: "Andrés Molina",
            years: 63,
            country: "Colombia",
            label: "View",
            checked: true,
            porcentaje: 85,
            icon: "delete",
        },
        {
            name: "Daniela Rojas",
            years: 34,
            country: "México",
            label: "View",
            checked: false,
            porcentaje: 58,
            icon: "delete",
        },
        {
            name: "Santiago Vega",
            years: 29,
            country: "Ecuador",
            label: "View",
            checked: true,
            porcentaje: 72,
            icon: "delete",
        },
        {
            name: "Paula Castillo",
            years: 18,
            country: "España",
            label: "View",
            checked: false,
            porcentaje: 49,
            icon: "delete",
        },
        {
            name: "Ricardo Navarro",
            years: 41,
            country: "Venezuela",
            label: "View",
            checked: true,
            porcentaje: 67,
            icon: "delete",
        },
        {
            name: "Florencia Ibáñez",
            years: 27,
            country: "Argentina",
            label: "View",
            checked: false,
            porcentaje: 54,
            icon: "delete",
        },
        {
            name: "Gabriel Paredes",
            years: 56,
            country: "Chile",
            label: "View",
            checked: true,
            porcentaje: 88,
            icon: "delete",
        },
        {
            name: "Micaela Fuentes",
            years: 39,
            country: "Perú",
            label: "View",
            checked: false,
            porcentaje: 61,
            icon: "delete",
        },
        {
            name: "Sebastián Acuña",
            years: 47,
            country: "Uruguay",
            label: "View",
            checked: true,
            porcentaje: 93,
            icon: "delete",
        },
        {
            name: "Julieta Márquez",
            years: 22,
            country: "Colombia",
            label: "View",
            checked: false,
            porcentaje: 28,
            icon: "delete",
        },
        {
            name: "Fernando Lozano",
            years: 60,
            country: "México",
            label: "View",
            checked: true,
            porcentaje: 76,
            icon: "delete",
        },
        {
            name: "Agustina Peralta",
            years: 33,
            country: "Paraguay",
            label: "View",
            checked: false,
            porcentaje: 52,
            icon: "delete",
        },
        {
            name: "Bruno Cáceres",
            years: 44,
            country: "Ecuador",
            label: "View",
            checked: true,
            porcentaje: 84,
            icon: "delete",
        },
        {
            name: "Natalia Quiroga",
            years: 26,
            country: "España",
            label: "View",
            checked: false,
            porcentaje: 46,
            icon: "delete",
        },
        {
            name: "Héctor Salinas",
            years: 50,
            country: "Venezuela",
            label: "View",
            checked: true,
            porcentaje: 97,
            icon: "delete",
        },
        {
            name: "Rocío Benítez",
            years: 35,
            country: "Argentina",
            label: "View",
            checked: false,
            porcentaje: 69,
            icon: "delete",
        },
        {
            name: "Iván Cabrera",
            years: 48,
            country: "Chile",
            label: "View",
            checked: true,
            porcentaje: 74,
            icon: "delete",
        },
        {
            name: "Carolina Luna",
            years: 21,
            country: "Perú",
            label: "View",
            checked: false,
            porcentaje: 33,
            icon: "delete",
        },
        {
            name: "Esteban Duarte",
            years: 57,
            country: "Uruguay",
            label: "View",
            checked: true,
            porcentaje: 90,
            icon: "delete",
        },
        {
            name: "Verónica Méndez",
            years: 42,
            country: "Colombia",
            label: "View",
            checked: false,
            porcentaje: 63,
            icon: "delete",
        },
        {
            name: "Matías Godoy",
            years: 30,
            country: "México",
            label: "View",
            checked: true,
            porcentaje: 71,
            icon: "delete",
        },
        {
            name: "Elena Campos",
            years: 19,
            country: "Paraguay",
            label: "View",
            checked: false,
            porcentaje: 41,
            icon: "delete",
        },
        {
            name: "Ramiro Sosa",
            years: 53,
            country: "Ecuador",
            label: "View",
            checked: true,
            porcentaje: 86,
            icon: "delete",
        },
        {
            name: "Clara Villalba",
            years: 37,
            country: "España",
            label: "View",
            checked: false,
            porcentaje: 57,
            icon: "delete",
        },
        {
            name: "Julián Ortega",
            years: 46,
            country: "Venezuela",
            label: "View",
            checked: true,
            porcentaje: 94,
            icon: "delete",
        },
        {
            name: "Tamara Figueroa",
            years: 28,
            country: "Argentina",
            label: "View",
            checked: false,
            porcentaje: 62,
            icon: "delete",
        },
        {
            name: "Leandro Méndez",
            years: 40,
            country: "Chile",
            label: "View",
            checked: true,
            porcentaje: 78,
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

    const getGridData = async (page: number, pageSize: number) => {
        return {
            rows: page == 1 ? db : db2,
            page: page,
            pageSize: pageSize,
            totalPages: 2,
        };
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
                    <WDataGrid rowHeight={30} dataProvider={getGridData}>
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
