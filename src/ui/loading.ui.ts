import "./styles/loading.css";
import { Widget } from "./widget.ui";

export class Loading extends Widget {
    constructor(id: string, parent: Widget | null = null) {
        super(id, "div", parent);
        this.addClass("WUILoading");
        this.setVisible(false);
    }
}
