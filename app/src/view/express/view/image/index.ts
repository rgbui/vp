import { ViewExpressType } from "../view.declare";
import { ViewType } from "../view.type";

export var image: ViewExpressType = {
    type: ViewType.image,
    props: [
        { name: 'src' }
    ]
}