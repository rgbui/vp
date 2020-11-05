import { Designer } from "../designer/designer";
import { Mode } from "./mode";
import { Page } from "./page";
import { Prop } from "./prop";
import { ViewType } from "../express/view/view.type";
export class View {
    childs: View[] = [];
    modes: Mode[] = [];
    props: Prop[] = [];
    type: ViewType;
    parent: View;
    page: Page;
    get Designer(): Designer {
        return this.page.designer;
    }
    constructor(page: Page | View) {
        if (page instanceof Page)
            this.page = page;
        else if (page instanceof View) {
            this.parent = page;
            this.page = this.parent.page;
        }
    }
    load(data) {
        for (var n in data) {
            if (n == 'childs') continue;
            else {
                this[n] = data[n]
            }
        }
        if (Array.isArray(data.childs)) {
            this.childs = data.childs.map(c => {
                var view = new View(this);
                view.load(c);
                return view;
            })
        }
    }
    get() {
        var json: Record<string, any> = {};
        json.type = this.type;
        json.childs = this.childs.map(c => c.get());
        return json;
    }
    getRenderProps() {
        var json = {};
        return json;
    }
}