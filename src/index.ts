import Application from "./core/application.core";
import { DOMcreateElement, DOMcreateFragment } from "./core/jsxsupport";
import { Widget } from "./ui/widget.ui";
import { initWidgetCollection } from "./ui/widget.collection";
import { createWidget } from "./ui/widget.builder";
import { WidgetAlignTypes, WidgetTypes } from "./ui/widget.types";

initWidgetCollection();

export {
    Application,
    createWidget,
    Widget,
    WidgetTypes,
    WidgetAlignTypes,
    DOMcreateElement,
    DOMcreateFragment,
};
