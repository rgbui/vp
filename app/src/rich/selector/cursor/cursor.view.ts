// import { Events } from "../../../../util/events";
// import { Editor } from "../../editor";
// import { Cursor } from "../cursor";

// export class CursorView extends Events {
//     private editor: Editor;
//     private vm: Vue;
//     constructor(vm: Vue, editor: Editor) {
//         super();
//         this.vm = vm;
//         this.editor = editor;
//     }
//     cursor: Cursor;
//     /**
//      * 光标定位元素
//      * @param event 
//      */
//     focus(cursor?: Cursor) {
//         this.cursor = cursor;
//     }
//     get isBlank() {
//         return this.cursor ? false : true;
//     }
//     render() {
//         if (this.cursor) {

//             // (this.vm as any).setPosition({
//             //     left: this.cursor.finallyPosX,
//             //     height: this.cursor.rect.height,
//             //     top: this.cursor.rect.y
//             // });
//         }
//     }
//     private timer: number;
//     open() {
//         if (!this.timer)
//             this.timer = setInterval(() => {
//                 if (this.vm.$el) {
//                     var el = this.vm.$el as HTMLDivElement;
//                     el.style.visibility =
//                         el.style.visibility == "hidden" ? "visible" : "hidden";
//                 }
//             }, 600);
//     }
//     close() {
//         if (this.timer) {
//             clearInterval(this.timer);
//             delete this.timer;
//         }
//     }
// }