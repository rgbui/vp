import { Events } from "../../../util/events";
import { Block } from "../block/block";
import { BlockType } from "../block/block.type";
import { Editor } from "../editor";
import { Cursor } from "./cursor";
import { SelectorState } from "./enum";
export interface SelectorView extends Vue {
    openCursor();
    renderCursor(style: { top: number, left: number, height: number });
    closeCursor();
}
export class Selector extends Events {
    private vm: SelectorView;
    private editor: Editor;
    constructor(vm: Vue, editor: Editor) {
        super();
        this.vm = vm as any;
        this.editor = editor;
        this.init();
    }
    private init() {
        this.editor.on('focus', () => {
            if (this.state == SelectorState.analogInput || this.state == SelectorState.input) {
                this.vm.openCursor();
            }
        });
        this.editor.on('blur', () => {
            this.vm.closeCursor();
        });
        this.on('selectorToggleState', (newState: SelectorState, oldState: SelectorState) => {

        });
        this.textarea.addEventListener('blur', (event: FocusEvent) => {
            if (!event.relatedTarget) this.editor.blur()
            else if ((this.editor.vm.$el as HTMLDivElement).contains(event.relatedTarget as HTMLDivElement))
                this.editor.blur();
        });
        this.textarea.addEventListener('keyup', this.keyup.bind(this));
        this.textarea.addEventListener('paster', this.paster.bind(this));
    }
    element: {
        block: Block,
        ele: HTMLElement,
        slotName?: string
    }
    state: SelectorState;
    cursor: Cursor;
    /**
     * 编辑器点击选择block元素
     * @param event 
     */
    selectBlockByContentMousedown(event: MouseEvent) {
        var ele = event.target as HTMLElement;
        var componentEle = ele.closest("[data-name]") as HTMLElement;
        var slotEle = ele.closest("[data-slot]") as HTMLElement;
        if (componentEle && slotEle && !componentEle.contains(slotEle)) {
            slotEle = undefined;
        }
        var component = componentEle ? (componentEle as any).ref : undefined;
        var block = component ? component.block : undefined;
        var slotName = slotEle ? slotEle.getAttribute("data-slot") : undefined;
        // if (!block) {
        //     //这里需要 有可能点在当前行文字左右空白处,需要通过计算查找点击在什么block元素上面
        // }
        if (block) {
            this.element = {
                ele,
                block,
                slotName
            }
            /**
             * 这里主要根据block实际情况来判断当前选择器的选择状态
             * 如果是文字创建光标，如果是图像，则是创建图像选择器
             */
            this.cursor = new Cursor(this);
            this.cursor.mousedown(event);
            this.selector(SelectorState.input);
        }
        else this.selector(SelectorState.analogInput);
    }
    selector(state: SelectorState) {
        var oldState = this.state;
        this.state = state;
        this.emit('selectorToggleState', state, oldState);
        this.render();
    }
    render() {
        if (this.state == SelectorState.input) {
            if (this.cursor) {
                var fi = this.cursor.finallyInput;
                var bound = this.editor.ele.getBoundingClientRect();
                this.vm.renderCursor({
                    top: this.cursor.rect.y + fi.y - bound.top,
                    left: this.cursor.rect.x + fi.x - bound.left,
                    height: this.cursor.rect.height
                });
            }
            else throw new Error('cursor is error..');
        }
    }
    /***
     * textearea
     */
    get textarea(): HTMLTextAreaElement {
        return this.vm.$refs.textarea as HTMLTextAreaElement;
    }
    focusIsInTextearea() {
        return document.activeElement === this.textarea
    }
    focusTextearea() {
        this.textarea.focus();
    }
    keyup(event: KeyboardEvent) {
        if (event.key == 'Backspace' || event.key == 'Delete') {
            if (this.textarea.value) {
                this.cursor.input(this.textarea.value);
            }
            else {
                //这里主要是判断当前的输入是否已同步至光标输入中，此时输入框是空的，但这是刚按下的，在按前可能还值
                //如果按前本身就是空的，那说明用户是想回退删除文本
                if (this.cursor.inputValue) this.cursor.input(this.textarea.value);
                else this.cursor.back();
            }
        }
        else if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'].includes(event.key)) {
            this.cursor.move(event.key as any);
        }
        else if (event.key == 'Enter') {
            //聚焦到输入空白处
            //this.focus();
        }
        else {
            if (this.state == SelectorState.analogInput) {
                var newBlock = Block.createBlock(this.editor,
                    {
                        type: BlockType.rowText, props: [
                            { name: 'text', val: this.textarea.value },
                            { name: 'height', val: 20 }
                        ]
                    }
                );
                newBlock.once('mounted', () => {
                    this.element = { block: newBlock, ele: newBlock.ele };
                    this.cursor = new Cursor(this);
                    this.cursor.input(this.textarea.value);
                })
                this.editor.render();
            }
            else {
                this.cursor.input(this.textarea.value);
            }
        }
    }
    paster(event: ClipboardEvent) {

    }
}