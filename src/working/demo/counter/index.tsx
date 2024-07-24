import { WidgetTypes } from "../../../";
import { Button, Label, Image, Container, Spacer } from "../../../ui";

class CounterWidget extends Container {
    img: Image;
    msg: Label;
    btn: Button;
    link: Button;
    counter: number;
    container: Container;

    constructor() {
        super({ orientation: "horizontal" });

        this.counter = -1;

        this.container = new Container({ orientation: "vertical", size: 300, padding: 8 });

        this.img = new Image("img-id", "/cedro-logo.svg");
        this.img.setType(WidgetTypes.FILL);
        this.img.setAlternateText("Cedro - Build an UI based on widgets");
        this.img.setFixedSize(128);
        this.img.fillHeight();

        this.msg = new Label("label-id", "span");
        this.msg.setType(WidgetTypes.FILL);
        this.msg.setFixedSize(80);
        this.msg.setHCentered(true);
        this.msg.setVCentered(true);

        this.btn = new Button("btn-id");
        this.btn.setType(WidgetTypes.FILL);
        this.btn.setText("Click me");
        this.btn.setVariant("contained");
        this.btn.setColor("success");
        this.btn.setFixedSize(40);

        this.btn.subscribe({
            event: "click",
            then: (_w, _e) => {
                this.counterStep();
            },
        });

        this.link = new Button("btn-id");
        this.link.setType(WidgetTypes.FILL);
        this.link.setText("About as Cedro");
        this.link.setVariant("text");
        this.link.setColor("warning");
        this.link.setFixedSize(40);

        this.link.subscribe({
            event: "click",
            then: (_w, _e) => {
                app?.alert(
                    "About as Cedro",
                    "Cedro is a JavaScript library written in TypeScript and based on widgets."
                );
            },
        });

        this.container.addChild(Spacer());
        this.container.addChild(this.img);
        this.container.addChild(this.msg);
        this.container.addChild(this.btn);
        this.container.addChild(this.link);
        this.container.addChild(Spacer());

        this.addChild(Spacer());
        this.addChild(this.container);
        this.addChild(Spacer());

        this.counterStep();
    }

    public counterStep() {
        this.counter++;
        this.msg.setText(`You clicked ${this.counter} times.`);
    }
}

const counterWidget = new CounterWidget();

export default counterWidget;
