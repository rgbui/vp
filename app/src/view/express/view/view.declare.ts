import { ViewType } from "./view.type"


export type ViewExpressPropType = {
    name: string,
    default?: any
}

export type ViewExpressType = {
    type:ViewType;
    props: ViewExpressPropType[]
}