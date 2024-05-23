import { Widget } from "./widget.ui";

export class Switch extends Widget {
    state: boolean;
    constructor(id: string) {
        super(id + ".Switch");
        this.state = false;
    }

    public setState(state: boolean) {
        this.state = state;
    }

    public getState(): boolean {
        return this.state;
    }
}
