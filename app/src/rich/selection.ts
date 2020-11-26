import { Events } from "../../util/events";
import { Editor } from "./editor";

export class Selection extends Events {
    private el: HTMLElement;
    private editor: Editor;
    constructor(el: HTMLElement, editor: Editor) {
        super();
        this.el = el;
        this.editor = editor;
    }
}