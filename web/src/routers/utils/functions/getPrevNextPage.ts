
import { Components } from "@src/assets/data/components";
import type { TPrevNextPage } from "@src/pages/type";

export function getPrevNextPage(name: string, page: string): TPrevNextPage {
    const PAYLOAD_RETURN: TPrevNextPage = {
        prev: {
            name: '',
            path: ''
        },
        next: {
            name: '',
            path: ''
        }
    }

    const INDEX_FROM_SOURCE_PAGE = Components.findIndex(n => name === n.name)
    const INDEX_FROM_NAME_PAGE = Components[INDEX_FROM_SOURCE_PAGE].sub.findIndex(component => component.name === name);

    if(!INDEX_FROM_NAME_PAGE) return PAYLOAD_RETURN;


    if(INDEX_FROM_NAME_PAGE + 1 > Components[INDEX_FROM_SOURCE_PAGE].sub.length) {
        PAYLOAD_RETURN.next = null;
    } else {
        PAYLOAD_RETURN.next!.path = Components[INDEX_FROM_SOURCE_PAGE].sub[INDEX_FROM_NAME_PAGE + 1].path;
        PAYLOAD_RETURN.next!.name = Components[INDEX_FROM_SOURCE_PAGE].sub[INDEX_FROM_NAME_PAGE + 1].name;
    }

    if(INDEX_FROM_NAME_PAGE - 1 < 0) {
        PAYLOAD_RETURN.prev = null;
    } else {
        PAYLOAD_RETURN.prev!.path = Components[INDEX_FROM_SOURCE_PAGE].sub[INDEX_FROM_NAME_PAGE - 1].path;
        PAYLOAD_RETURN.prev!.name = Components[INDEX_FROM_SOURCE_PAGE].sub[INDEX_FROM_NAME_PAGE - 1].name;
    }

    return PAYLOAD_RETURN;
}