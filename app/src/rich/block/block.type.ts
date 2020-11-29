
export enum BlockType {
    text,
    line
}
export function BlockTypeToComponentName(type: BlockType) {
    switch (type) {
        case BlockType.text:
            return 'VcText'
    }
}