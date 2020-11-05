import { Designer } from "../designer/designer";
import { View } from "./view";
export class Page {
    designer: Designer;
    views: View[] = [];
    constructor(designer: Designer) {
        this.designer = designer;
    }
    load(data) {
        for (var n in data) {
            if (n == 'views') continue;
            else this[n] = data[n];
        }
        if (Array.isArray(data.views)) {
            this.views = data.views.map(v => {
                var view = new View(this);
                view.load(v);
                return v;
            })
        }
    }
    createDefault() {

    }
    get() {
        var json: Record<string, any> = {};
        json.views = this.views.map(v => v.get())
        return json;
    }
    getRenderProps() {
        var json: Record<string, any> = {};
        json.views = this.views.map(v => v.getRenderProps());
        return json;
    }
}