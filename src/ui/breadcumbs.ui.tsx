/*
 * Widget: Breadcums
 * Descripcion:
 *  El widget muestra la ruta en la que esta parado el usuario.
 * Por ejemplo:
 *  - Si el usuario esta en https://mipagina.com/admin/user/profile
 *    El widget debe mostrar algo asi como Admin >> Usuario >> Perfil.
 * Implementacion:
 *  Una idea es que este widget este conectado con las rutas definidas en la aplicacion.
 *  Entonces a las rutas le podemos agregar la propiedad de label o breadcumbLabel que
 *  indicaria el texto a mostrar cuando se esta en esa ruta.
 *  Ademas tambien le podemos definir un icono a cada ruta.
 *  
 *  Luego el widget Breadcumbs puede buscar en las rutas de la aplicacion, cual es la ruta actual
 *  y actualizarse mostrando graficamente donde se encuentra el usuario.
 *  Para esto podriamos agregar algun evento en las rutas o en la aplicacion que se dispare cuando
 *  se carga una url y donde los widget puedan suscribirse para capturar ese evento y hacer algo
 *  en consecuencia.
 *
 *  Vamos a usar el widget de toolbar configurado como barra de herramientas horizontal y los botenes
 *  que usa la barra de herramientas vamos a configurarlos para que muestren el icono hacia la derecha.
 *
 * */

import { Toolbar } from "./toolbar.ui";
import { connectWidgetCallback, getOnlyEventProps, Widget } from "./widget.ui";
import { WidgetProps } from "./widget.types";
import { normalizeWidget } from "./widget.normalize";
import { UID } from "../core/uid";
import { Button } from "./button.ui";
import { IconButton } from "./IconButton.ui";
import { RouteItem } from "src/interfaces/application.interface";

export class Breadcumbs extends Toolbar {
    constructor(id: string, parent: Widget | null) {
        super(id, parent, "horizontal");
        this.setVariant("contained");
        const connectEvent = () => {
            if (!window.app) {
                setTimeout(connectEvent, 500);
            }
            window.app?.subscribe({
                event: "location-change", then: () => {
                    this.configItems();
                }
            })
            this.configItems();
        }
        connectEvent();
    }

    private getRoute(name: string): RouteItem | null {
        if (!window.app) return null;
        const app = window.app;

        for (const route of app.routes) {

            const parts = route.src.split("/").filter((item) => item != "");
            const last = parts[parts.length - 1];

            if (!last) continue;

            if (last == name) {
                return route;
            }

        }

        return null;
    }

    private configItems() {
        if (!window.app) return;
        const app = window.app;
        const router = window.app.router;
        if (!router) return;

        for (const child of this.items.values()) {
            this.deleteItem(child.id);
        }

        const url = router.getCurrentLocation().url;
        const path = url.split("/");
        for (let i = 0; i < path.length; i++) {
            const itemName = path[i];
            const route = this.getRoute(itemName);
            if (!route) continue;
            const newWidget = new Button("item." + itemName, this);
            let widgetText = route.label ? route.label : itemName;
            newWidget.setText(widgetText.replaceAll(" ", "&nbsp;"))
            newWidget.setVariant("text");
            newWidget.subscribe({
                event: "click", then: () => {
                    app.goTo(route.src);
                }
            })
            this.addItem(newWidget.id, newWidget);

            if (i == path.length - 1) {
                //El ultimo no lleva separador
                break;
            }
            const separator = new IconButton("icon." + itemName, "keyboard_double_arrow_right", this);
            separator.setVariant("text");
            separator.setW(50);
            this.addItem(separator.id, separator);
            separator.setW(20);
        }

        this.render();
    }
}

export type wBreadcumbProps = WidgetProps & {
};

export const WBreadcumbs = (props: wBreadcumbProps) => {
    if (!props.id) {
        props.id = "breadcumbs." + UID();
    }

    connectWidgetCallback(props.id, getOnlyEventProps(props));

    return normalizeWidget(
        <div
            id={props.id}
            w-breadcumbs
        ></div>,
        props
    );
};

export function createBreadcumbs(id: string, _content: any, parent: Widget | null = null): Breadcumbs {
    let newBreadcumbs = new Breadcumbs(id, parent);

    return newBreadcumbs;
}
