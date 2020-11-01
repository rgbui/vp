import { Mode } from "./mode";
import { View } from "./view";



export class Prop {
    view: View;
    mode?: Mode;
    constructor(view: View, mode?: Mode) {
        this.view = view;
        this.mode = mode;
    }
    name?: string;
    value?: any;
}