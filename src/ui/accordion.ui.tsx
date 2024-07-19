import "./styles/accordion.css";
import { IconButton } from "./IconButton.ui";
import { Label } from "./label.ui";
import { Widget, WidgetTypes } from "./widget.ui";
import { createWidget, normalizeWidget, WidgetProps } from "./widget.builder";

const ACCORDION_HEADER_HEIGHT = 40;

type AccordionItem = {
    header: Widget;
    content: Widget;
};

export class Accordion extends Widget {
    items: Map<string, AccordionItem>;
    selectedItemId: string | null;
    constructor(id: string, parent: Widget | null = null) {
        super(id, "div", parent);

        this.items = new Map<string, AccordionItem>();

        this.selectedItemId = null;

        this.addClass("WUIAccordion");
    }

    public selectItem(id: string): void {
        const selected = this.items.get(id);

        if (this.selectedItemId !== null) {
            //deseleccionamos
            const previous = this.items.get(this.selectedItemId);

            if (previous) {
                previous.content.setFixedSize(0);
            }
        }

        if (selected) {
            this.selectedItemId = id;
            selected.content.setFixedSize(null);
        }

        this.render();
    }

    public addItem(title: string, icon: string, content: Widget): void {
        const header =
            icon !== ""
                ? new IconButton(content.id + ".header", icon, null)
                : new Label(content.id + ".header", "span", null);

        header.setType(WidgetTypes.FILL);
        header.setFixedSize(ACCORDION_HEADER_HEIGHT);
        header.setText(title);

        header.subscribe({
            event: "click",
            then: (_e, _w) => {
                this.selectItem(content.id);
            },
        });

        content.setType(WidgetTypes.FILL);
        content.setFixedSize(0);

        this.items.set(content.id, { header, content });

        this.addChild(header);
        this.addChild(content);
    }
}

export type WAccordionProps = WidgetProps & {
    children: any;
};

export type WAccordionItemProps = {
    title?: string | null;
    icon?: string | null;
    children: any;
};

export const WAccordion = (props: WAccordionProps) => {
    return normalizeWidget(
        <div id={props.id} w-accordion>
            {props.children}
        </div>,
        props
    );
};

export const WAccordionItem = (props: WAccordionItemProps) => {
    return (
        <div w-accordion-item w-title={props.title} w-icon={props.icon}>
            {props.children}
        </div>
    );
};

export function createAccordion(id: string, content: any, parent: Widget | null = null): Accordion {
    let newAccordion = new Accordion(id, parent);
    let firstWidgetId = "";

    content.childNodes.forEach((accordionItem: HTMLElement, _index: number) => {
        if (accordionItem.getAttribute("w-accordion-item") !== null) {
            const accordionTitle = accordionItem.getAttribute("w-title");
            const accordionIcon = accordionItem.getAttribute("w-icon");

            if (!accordionItem.firstChild) {
                throw new Error("Accordion Item must have a content");
            }

            const widget = createWidget(accordionItem.firstChild);

            if (widget !== null) {
                newAccordion.addItem(accordionTitle || "Untitled", accordionIcon || "", widget);

                if (firstWidgetId === "") {
                    firstWidgetId = widget.id;
                }
            }
        }
    });

    newAccordion.selectItem(firstWidgetId);

    return newAccordion;
}
