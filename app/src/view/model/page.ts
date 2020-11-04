import { Designer } from "../designer/designer";
import { View } from "./view";

export class Page {
    designer: Designer;
    view: View[] = [];
    constructor(designer: Designer) {
        this.designer = designer;
    }
    load(data) {
        for (var n in data) {
            if (n == 'views') continue;
            else this[n] = data[n];
        }
        if (Array.isArray(data.views)) {

        }
    }
    createDefault() {

    }
    get() {
        var json: Record<string, any> = {};
        return json;
    }
}