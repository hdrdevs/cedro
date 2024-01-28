export type TextDirectionValue = "ltr" | "rtl" | "auto";

export interface IMetaDataElement {
    lang: string | null;
    dir: TextDirectionValue | null;
    name: string;
    content: string;
}

export interface IMetaData {
    items: IMetaDataElement[];
    add(element: IMetaDataElement): void;
    get(name: string): IMetaDataElement | null;
    deleteByName(name: string): void;
}

export class MetaData implements IMetaData {
    items: IMetaDataElement[];
    constructor() {
        this.items = [];
    }

    add(element: IMetaDataElement): void {
        this.items.push(element);
        const meta = document.createElement("meta");
        meta.setAttribute("name", element.name);
        meta.setAttribute("content", element.content);
        if (element.lang) meta.setAttribute("lang", element.lang);
        if (element.dir) meta.setAttribute("dir", element.dir);
        document.head.appendChild(meta);
    }

    get(name: string): IMetaDataElement | null {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name === name) {
                return this.items[i];
            }
        }
        return null;
    }

    deleteByName(name: string): void {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name === name) {
                this.items.splice(i, 1);
                const deleteItem = document.querySelector(
                    `meta[name="${name}"]`
                );
                if (deleteItem) document.head.removeChild(deleteItem);
            }
        }
    }
}

export interface ISeo {
    title: string;
    meta: MetaData;

    setTitle(title: string): void;
    getTitle(): string;
}

export class Seo implements ISeo {
    title: string;
    meta: MetaData;
    constructor(title: string) {
        this.title = title;
        this.meta = new MetaData();
    }

    setTitle(title: string): void {
        document.title = title;
        this.title = title;
    }

    getTitle(): string {
        return this.title;
    }
}
