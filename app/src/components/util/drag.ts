

export function Drag(options: {
    mousedownEvent: MouseEvent,
    distance?: number,
    moveStart?: (event: MouseEvent) => void,
    moving?: (event: MouseEvent) => void,
    moveEnd?: (isMove: boolean, event: MouseEvent) => void,
    getDragElement?: () => HTMLElement,
    setDragBox?: (dragBox: HTMLElement) => void,
    dragBoxClassName?: string
}) {
    var parms = {
        isMove: false
    }
    var dis = options.distance || 4;
    var dragBox: HTMLElement;
    function createDragElement(dragElement: HTMLElement) {
        dragBox = document.createElement('div');
        if (options.dragBoxClassName) dragBox.setAttribute('class', options.dragBoxClassName);
        dragBox.style.position = 'absolute';
        dragBox.style.pointerEvents = 'none';
        dragBox.style.opacity = '0.3';
        dragBox.style.userSelect = 'none';
        dragBox.appendChild(dragElement);
        document.body.appendChild(dragBox);
        if (typeof options.setDragBox == 'function') options.setDragBox(dragBox);
    }
    function mousemove(event: MouseEvent) {
        if (Math.abs(event.pageX - options.mousedownEvent.pageX) > dis
            || Math.abs(event.pageY - options.mousedownEvent.pageY) > dis) {
            parms.isMove = true;
            if (typeof options.moveStart == 'function') options.moveStart(event);
            if (typeof options.getDragElement == 'function') {
                var dragElement = options.getDragElement();
                if (dragElement) {
                    createDragElement(dragElement);
                }
            }
        }
        if (parms.isMove == true) {
            if (dragBox) {
                dragBox.style.top = event.pageY + 'px';
                dragBox.style.left = event.pageX + 'px';
            }
            if (typeof options.moving == 'function') options.moving(event);
        }
    }
    function mouseup(event: MouseEvent) {
        if (typeof options.moveEnd == 'function') {
            options.moveEnd(parms.isMove, event);
        }
        if (dragBox) dragBox.remove();
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
    }
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup)
}