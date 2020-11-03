import { Prop } from "./prop";
import { View } from "./view";

export class Mode {
    view: View;
    constructor(props: Prop[], view: View) {
        this.props = props;
        this.view = view;
    }
    props: Prop[] = [];
}