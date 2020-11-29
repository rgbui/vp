import { Events } from "../../../util/events";
import { Editor } from "../editor";

export class Selection extends Events {
    private vm: Vue;
    private editor: Editor;
    constructor(vm: Vue, editor: Editor) {
        super();
        this.vm = vm;
        this.editor = editor;
    }
}