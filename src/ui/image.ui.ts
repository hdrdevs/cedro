import "./styles/image.css";
import { Widget, WidgetTypes } from "./widget.ui";

export class Image extends Widget {
    imageContainer: Widget;
    image: Widget;
    constructor(id: string, src: string = "", parent: Widget | null = null) {
        super(id, "div", parent);

        this.imageContainer = new Widget(id + ".imageContainer", "div", this);
        this.imageContainer.addClass("WUIImageContainer");

        this.image = new Widget(id + ".image", "img", this.imageContainer);
        this.image.setType(WidgetTypes.CUSTOM);
        this.image.getBody().setAttribute("src", src);
    }

    public render(): void {
        super.render();

        this.imageContainer.setX(0);
        this.imageContainer.setY(0);
        this.imageContainer.setWH(this.getW(), this.getH());
    }

    public fillWidth(): void {
        this.image.addClass("WUIImageFillWidth");
    }

    public fillHeight(): void {
        this.image.addClass("WUIImageFillHeight");
    }

    public setAlternateText(text: string): void {
        this.image.getBody().setAttribute("alt", text);
    }

    public setImageUrl(url: string): void {
        this.image.getBody().setAttribute("src", url);
    }

    public getImageUrl(): string | null {
        return this.image.getBody().getAttribute("src");
    }

    public getAlternateText(): string | null {
        return this.image.getBody().getAttribute("alt");
    }
}
