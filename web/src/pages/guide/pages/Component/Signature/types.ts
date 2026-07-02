import type { PropsWithChildren } from "react";

// Types
import type { TPrevNextPage } from "@src/pages/type";

export interface ISignatureProps extends PropsWithChildren<any> {
    // do anything
}

export type TPages = {
    pages: TPrevNextPage | null
}