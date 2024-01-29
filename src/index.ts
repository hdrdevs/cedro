import Application from "./core/application.core"
import {DOMcreateElement, DOMcreateFragment} from "./core/jsxsupport"
import {Widget, WidgetTypes, WidgetAlignTypes} from "./ui/widget.ui"
import {initWidgetCollection} from "./ui/widget.collection"

initWidgetCollection();

export{
    Application,
    Widget,
    WidgetTypes,
    WidgetAlignTypes,
    DOMcreateElement,
    DOMcreateFragment
}

