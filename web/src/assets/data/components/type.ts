import type { IconType } from "react-icons/lib"

export type TComponentData = {
    name: string,
    description: {
        title: string,
        subTitle: string,
        details: string
    },    
    icon: IconType,
}

export type TComponents = TComponentData & {sub: TComponentData[]}