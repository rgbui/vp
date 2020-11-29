import { Block } from "./block/block";
import Vue from "vue";

export interface EditorMousedownEvent {
    event: MouseEvent,
    block: Block,
    component: Vue;
    componentEle: HTMLElement,
    slotEle?: HTMLElement,
    slotName?: string,
    target:HTMLElement
}