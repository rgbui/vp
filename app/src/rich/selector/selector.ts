import { Events } from "../../../util/events";
import { Editor } from "../editor";

export class Selector extends Events {
    vm: Vue;
    editor: Editor;
    constructor(vm: Vue, editor: Editor) {
        super();
        this.vm = vm;
        this.editor = editor;
    }
}