import { Mode } from "./mode";
import { Prop } from "./prop";
import { ViewType } from "./view.type";


export class View {
    childs: View[] = [];
    modes: Mode[] = [];
    props: Prop[] = [];
    type?: ViewType;
}