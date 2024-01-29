import { IWidget } from "../interfaces/widget.interface";

declare global {
    interface Window {
        w: Map<string, IWidget>;
    }
}

export const initWidgetCollection = () => {
    
    if(!window.w) {
        window.w = new Map<string, IWidget>();
    }
        
}

