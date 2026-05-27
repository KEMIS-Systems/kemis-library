// Shim: react-icons@5 declares `IconType` returning `React.ReactNode`, which is
// incompatible with React 18 strict JSX (which expects `ReactElement | null`).
// Override the return type so consumers can render <IconX /> without ts-ignore.
// Remove this shim when react-icons publishes types compatible with React 18.

import type { ReactElement } from "react";
import type { IconBaseProps } from "react-icons/lib";

declare module "react-icons/lib" {
  export type IconType = (props: IconBaseProps) => ReactElement;
}
