import { BlockType } from "./block.type";

export class Prop {
    name: string
    value: any;
    mode?: Mode;
    block: Block;
}
export class Mode {
    props: Prop[] = [];
    block: Block;
}
export class Block {
    type: BlockType;
    props: Prop[] = [];
    modes: Mode[] = [];
}