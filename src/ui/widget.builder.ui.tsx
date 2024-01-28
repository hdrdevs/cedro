import { DOMcreateElement } from '../core/jsxsupport'; //import { DOMcreateElement, DOMcreateFragment } from '../core/jsxsupport';
import { IWidget } from "../interfaces/widget.interface";
import { Widget, WidgetAlignTypes, WidgetTypes } from "./widget.ui";
import { Button, ButonVariants } from "./button.ui";
import { InputTypes, Textbox } from "./textbox.ui";
import { Colors } from "./colors.ui";
import { IconButton } from "./IconButton.ui";
import { w } from "./windget.collection";
import { Icon, IconVariants } from "./Icon.ui";
import { Menu } from "./menu.ui";
import { Select } from "./select.ui";

export interface XSelectProps {
    id: string;
    title: string;
    width?: number | null;
    height?: number | null;
    classNames?: string | null;
    children: any;
}

export interface XSelectOptionProps {
    id: string;
    label: string;
    icon?: string | null;
}

/**
 * Creates a select option component with the given properties.
 *
 * @param {XSelectOptionProps} id - The unique identifier for the option.
 * @param {XSelectOptionProps} label - The label for the option.
 * @param {XSelectOptionProps | null} icon - The optional icon for the option.
 * @return {JSX.Element} The select option component.
 */
export const XSelectOption = ({
    id,
    label,
    icon = null,
}: XSelectOptionProps) => {
    return (
        <div id={id} widget-label={label} widget-icon={icon} w-select-option>
            &nbsp;
        </div>
    );
};

/**
 * Render a custom select component.
 *
 * @param {string} id - The ID of the select component.
 * @param {string} title - The title of the select component.
 * @param {number|null} width - The width of the select component, or null if not set.
 * @param {number|null} height - The height of the select component, or null if not set.
 * @param {string|null} classNames - The class names for the select component, or null if not set.
 * @param {ReactNode} children - The child components to be rendered inside the select component.
 * @return {ReactElement} The rendered select component.
 */
export const XSelect = ({
    id,
    title,
    width = null,
    height = null,
    classNames = null,
    children,
}: XSelectProps) => {
    return (
        <div
            id={id}
            w-select
            widget-title={title}
            widget-width={width}
            widget-height={height}
            widget-class={classNames}
        >
            {children}
        </div>
    );
};

export interface XMenuProps {
    id: string;
    triggerId: string;
    children: any;
}

export interface XMenuOptionProps {
    id: string;
    label: string;
    icon?: string | null;
}

export const XMenuOption = ({ id, label, icon = null }: XMenuOptionProps) => {
    return (
        <div id={id} widget-label={label} widget-icon={icon} w-menu-option>
            &nbsp;
        </div>
    );
};

/**
 * Renders an XMenu component.
 *
 * @param {string} id - The ID of the XMenu component.
 * @param {string} triggerId - The ID of the trigger element for the XMenu component.
 * @param {ReactNode} children - The content to be rendered inside the XMenu component.
 * @returns {JSX.Element} - The rendered XMenu component.
 */
export const XMenu = ({ id, triggerId, children }: XMenuProps) => {
    return (
        <div id={id} widget-trigger-id={triggerId} w-menu>
            {children}
        </div>
    );
};

export interface XIconProps {
    id: string;
    variant?: IconVariants | null;
    icon: string;
    classNames?: string | null;
}

export const XIcon = ({ id, variant, icon, classNames = null }: XIconProps) => {
    return (
        <span
            id={id}
            widget-variant={variant}
            widget-icon={icon}
            widget-class={classNames}
            w-icon
        >
            &nbsp;
        </span>
    );
};

export interface XIconButtonProps {
    id: string;
    title?: string | null;
    size?: number | null;
    variant?: ButonVariants | null;
    color?: Colors | null;
    icon: string;
    classNames?: string | null;
    visible?: boolean | null;
}

/**
 * Renders an `XIconButton` component.
 *
 * @param {XIconButtonProps} id - The ID of the icon button.
 * @param {string} title - The title of the icon button.
 * @param {string} size - The size of the icon button.
 * @param {string} variant - The variant of the icon button.
 * @param {string} color - The color of the icon button.
 * @param {string} icon - The icon of the icon button.
 * @param {string} className - The classes to apply separatesd by a space.
 * @param {boolean} visible - The visible state of the icon button.
 * @return {JSX.Element} The rendered `XIconButton` component.
 */
export const XIconButton = ({
    id,
    title = null,
    size,
    variant,
    color,
    icon,
    classNames = null,
    visible = true,
}: XIconButtonProps) => {
    return (
        <span
            id={id}
            widget-text={title}
            widget-size={size}
            widget-variant={variant}
            widget-color={color}
            widget-icon={icon}
            widget-class={classNames}
            widget-visible={visible}
            w-iconbutton
        >
            &nbsp;
        </span>
    );
};

export interface XButtonProps {
    id: string;
    title: string;
    size?: number | null;
    variant?: ButonVariants | null;
    color?: Colors | null;
    width?: number | null;
    height?: number | null;
    classNames?: string | null;
}

/**
 * Renders an XButton component.
 *
 * @param {XButtonProps} id - The id of the button.
 * @param {XButtonProps} title - The title of the button.
 * @return {JSX.Element} The rendered XButton component.
 */
export const XButton = ({
    id,
    title,
    size,
    variant,
    color,
    width = null,
    height = null,
    classNames = null,
}: XButtonProps) => {
    return (
        <button
            id={id}
            widget-text={title}
            widget-size={size}
            widget-variant={variant}
            widget-color={color}
            widget-width={width}
            widget-height={height}
            widget-class={classNames}
        >
            &nbsp;
        </button>
    );
};

export interface XTextBoxProps {
    id: string;
    title: string;
    type?: InputTypes | null;
    width?: number | null;
    height?: number | null;
    classNames?: string | null;
}

/**
 * Renders a custom text box component.
 *
 * @param {XTextBoxProps} id - The ID of the text box.
 * @param {XTextBoxProps} title - The title of the text box.
 * @return {JSX.Element} The rendered text box component.
 */
export const XTextBox = ({
    id,
    title,
    type = null,
    width = null,
    height = null,
    classNames = null,
}: XTextBoxProps) => {
    return (
        <input
            id={id}
            w-textbox
            widget-title={title}
            widget-input-type={type}
            widget-width={width}
            widget-height={height}
            widget-class={classNames}
        >
            &nbsp;
        </input>
    );
};

export interface XSeparatorProps {
    size: number;
}

/**
 * Renders a horizontal separator with a specific size.
 *
 * @param {XSeparatorProps} size - The size of the separator.
 * @return {JSX.Element} A div element representing the separator.
 */
export const XSeparator = ({ size }: XSeparatorProps) => {
    return <div widget-size={size}>&nbsp;</div>;
};

/**
 * A component that adds horizontal or vertical spacing.
 *
 * @return {JSX.Element} A div element with a non-breaking space.
 */
export const XSpacer = () => {
    return <div>&nbsp;</div>;
};

export interface XVerticalContainerProps {
    children: any;
    padding: number;
    overflow?: boolean | null;
}

/**
 * Renders a vertical container with the given padding and children.
 *
 * @param {XVerticalContainerProps} padding - The padding of the container.
 * @param {React.ReactNode} children - The children components to render inside the container.
 * @return {React.ReactNode} The rendered vertical container.
 */
export const XVerticalContainer = ({
    padding,
    children,
    overflow = false,
}: XVerticalContainerProps) => {
    return (
        <div
            id="section1Container"
            widget-align={WidgetAlignTypes.VERTICAL}
            widget-padding={padding}
            widget-overflow={overflow}
        >
            {children}
        </div>
    );
};

export interface XHorizontalContainerProps {
    children: any;
    padding: number;
    size?: number | null;
}

/**
 * Renders a horizontal container component.
 *
 * @param {XHorizontalContainerProps} props - The props for the component.
 * @param {number} props.padding - The padding value for the container.
 * @param {ReactNode} props.children - The children to render inside the container.
 * @return {ReactElement} The rendered horizontal container component.
 */
export const XHorizontalContainer = ({
    padding,
    children,
    size = null,
}: XHorizontalContainerProps) => {
    return (
        <div
            id="section1Container"
            widget-align={WidgetAlignTypes.HORIZONTAL}
            widget-padding={padding}
            widget-size={size}
        >
            {children}
        </div>
    );
};

/**
 * Creates a widget based on the provided content and parent.
 *
 * @param {any} content - The content for the widget.
 * @param {IWidget | null} parent - The parent widget.
 * @return {Widget | null} The created widget.
 */
export function createWidget(
    content: any,
    parent: IWidget | null = null,
    freedom: boolean = false
): Widget | null {
    let id = content.id;
    const tagName = content.tagName;

    if (tagName) {
        if (!id) {
            id = parent?.id + Math.random().toString().substring(0, 10);
        }
        const dataType =
            content.getAttribute("widget-type") === null
                ? WidgetTypes.FILL
                : parseInt(content.getAttribute("widget-type")); // parseInt(content.getAttribute("widget-type"));
        const dataAlign =
            content.getAttribute("widget-align") === null
                ? WidgetAlignTypes.HORIZONTAL
                : parseInt(content.getAttribute("widget-align"));

        const dataPadding =
            content.getAttribute("widget-padding") === null
                ? 0
                : parseInt(content.getAttribute("widget-padding"));

        const dataSize: number | null =
            content.getAttribute("widget-size") === null
                ? null
                : parseInt(content.getAttribute("widget-size"));

        if (tagName.toLowerCase() === "button") {
            const newButton = new Button(id, parent as Widget);
            const dataText = content.getAttribute("widget-text");

            const dataVariant = content.getAttribute("widget-variant");
            const dataColor = content.getAttribute("widget-color");

            const dataWidth = content.getAttribute("widget-width");
            const dataHeight = content.getAttribute("widget-height");

            const dataClases = content.getAttribute("widget-class");

            if (dataSize) {
                newButton.setFixedSize(dataSize);
            }

            if (dataVariant) {
                newButton.setVariant(dataVariant);
            }

            if (dataColor) {
                newButton.setColor(dataColor);
            }

            if (freedom) {
                newButton.setType(WidgetTypes.FREE);
            }

            if (dataWidth) {
                newButton.setInitialW(dataWidth);
            }

            if (dataHeight) {
                newButton.setInitialH(dataHeight);
            }

            if (dataClases) {
                const clases = dataClases.split(" ");
                for (const clase of clases) {
                    newButton.addClass(clase);
                }
            }

            newButton.setAlign(dataAlign);
            newButton.setType(dataType);
            newButton.setPadding(dataPadding);
            newButton.setText(dataText);
            w.set(id, newButton);
            return newButton;
        } else if (content.getAttribute("w-textbox")) {
            const newTextbox = new Textbox(id, parent as Widget);
            const dataTitle = content.getAttribute("widget-title");

            const dataInputType = content.getAttribute("widget-input-type");

            const dataWidth = content.getAttribute("widget-width");
            const dataHeight = content.getAttribute("widget-height");

            const dataClases = content.getAttribute("widget-class");

            if (dataInputType) {
                newTextbox.setInputType(dataInputType);
            }

            if (dataSize) {
                newTextbox.setFixedSize(dataSize);
            }

            if (dataWidth) {
                newTextbox.setInitialW(dataWidth);
            }

            if (dataHeight) {
                newTextbox.setInitialH(dataHeight);
            }

            if (dataClases) {
                const clases = dataClases.split(" ");
                for (const clase of clases) {
                    newTextbox.addClass(clase);
                }
            }

            newTextbox.setAlign(dataAlign);
            newTextbox.setType(dataType);
            newTextbox.setPadding(dataPadding);
            newTextbox.setTitle(dataTitle);
            w.set(id, newTextbox);
            return newTextbox;
        } else if (content.getAttribute("w-iconbutton")) {
            const dataIcon = content.getAttribute("widget-icon");
            const dataClases = content.getAttribute("widget-class");
            const dataVisible = content.getAttribute("widget-visible");
            const newIconButton = new IconButton(
                id,
                dataIcon,
                parent as Widget
            );
            const dataTitle = content.getAttribute("widget-text");
            if (dataSize) {
                newIconButton.setFixedSize(dataSize);
            }

            if (dataClases) {
                const clases = dataClases.split(" ");
                for (const clase of clases) {
                    newIconButton.addClass(clase);
                }
            }

            if (!dataVisible) {
                newIconButton.setVisible(false);
            }

            newIconButton.setAlign(dataAlign);
            newIconButton.setType(dataType);
            newIconButton.setPadding(dataPadding);
            newIconButton.setText(dataTitle);
            w.set(id, newIconButton);
            return newIconButton;
        } else if (content.getAttribute("w-icon")) {
            const dataIcon = content.getAttribute("widget-icon");
            const dataVariant = content.getAttribute("widget-variant");
            const dataClases = content.getAttribute("widget-class");
            const newIcon = new Icon(
                id,
                dataIcon,
                dataVariant,
                parent as Widget
            );

            if (dataClases) {
                const clases = dataClases.split(" ");
                for (const clase of clases) {
                    newIcon.addClass(clase);
                }
            }

            newIcon.setAlign(dataAlign);
            newIcon.setType(dataType);
            newIcon.setPadding(dataPadding);

            w.set(id, newIcon);
            return newIcon;
        } else if (content.getAttribute("w-menu")) {
            const dataTriggerId = content.getAttribute("widget-trigger-id");
            const newMenu = new Menu(id, dataTriggerId, null);

            (content as HTMLElement).childNodes.forEach((child) => {
                const optionMenu = child as HTMLElement;
                if ((optionMenu as HTMLElement).getAttribute("w-menu-option")) {
                    const dataOptionId = optionMenu.getAttribute("id");
                    const dataOptionLabel =
                        optionMenu.getAttribute("widget-label");
                    const dataOptionIcon = optionMenu.getAttribute(
                        "widget-icon"
                    )
                        ? optionMenu.getAttribute("widget-icon")
                        : "";

                    if (dataOptionId) {
                        newMenu.addOption(
                            dataOptionId,
                            dataOptionIcon || "",
                            dataOptionLabel || ""
                        );
                    }
                }
            });

            w.set(id, newMenu);
            return newMenu;
        } else if (content.getAttribute("w-select")) {
            const newSelect = new Select(id, parent as Widget);

            (content as HTMLElement).childNodes.forEach((child) => {
                const optionSelect = child as HTMLElement;
                if (
                    (optionSelect as HTMLElement).getAttribute(
                        "w-select-option"
                    )
                ) {
                    const dataItemId = optionSelect.getAttribute("id");
                    const dataItemLabel =
                        optionSelect.getAttribute("widget-label");
                    const dataItemIcon = optionSelect.getAttribute(
                        "widget-icon"
                    )
                        ? optionSelect.getAttribute("widget-icon")
                        : "";

                    if (dataItemId) {
                        newSelect.addItem(
                            dataItemId,
                            dataItemLabel || "",
                            dataItemIcon || ""
                        );
                    }
                }
            });

            const dataTitle = content.getAttribute("widget-title");
            const dataWidth = content.getAttribute("widget-width");
            const dataHeight = content.getAttribute("widget-height");
            const dataClases = content.getAttribute("widget-class");

            if (dataWidth) {
                newSelect.setInitialW(dataWidth);
            }

            if (dataHeight) {
                newSelect.setInitialH(dataHeight);
            }

            if (dataClases) {
                const clases = dataClases.split(" ");
                for (const clase of clases) {
                    newSelect.addClass(clase);
                }
            }

            newSelect.setType(dataType);
            newSelect.setAlign(dataAlign);
            newSelect.setPadding(dataPadding);
            newSelect.setTitle(dataTitle);

            w.set(id, newSelect);
            return newSelect;
        } else {
            const newWidget = new Widget(id, tagName, parent);

            const dataClases = content.getAttribute("widget-class");

            if (dataClases) {
                const clases = dataClases.split(" ");
                for (const clase of clases) {
                    newWidget.addClass(clase);
                }
            }

            newWidget.setAlign(dataAlign);

            newWidget.setPadding(dataPadding);

            if (dataSize) {
                newWidget.setFixedSize(dataSize);
            }

            if (dataType === WidgetTypes.FREE) {
                freedom = true;
            }

            if (!freedom) {
                newWidget.setType(dataType);
            } else {
                newWidget.setType(WidgetTypes.FREE);
            }

            const dataOverflow = content.getAttribute("widget-overflow");

            if (dataOverflow) {
                newWidget.setOverflow(true);
            }

            content.getAttributeNames().forEach((key: string) => {
                newWidget
                    .getBody()
                    .setAttribute(key, content.getAttribute(key));
            });

            (content as HTMLElement).childNodes.forEach((child) => {
                if (child.hasChildNodes() == true) {
                    createWidget(child, newWidget, freedom);
                } else {
                    newWidget.getBody().appendChild(child);
                }
            });
            //console.log("new widget", newWidget);
            w.set(id, newWidget);
            return newWidget;
        }
    }

    return content;
}
