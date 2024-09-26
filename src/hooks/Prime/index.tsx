import { PrimeReactProvider } from "primereact/api";
import React from "react";

// Types
import { IPrimeProps } from "./types";

export function PrimeProvider({children, ...props}: IPrimeProps) {
    return <PrimeReactProvider {...props}>
        {children}
    </PrimeReactProvider>
}