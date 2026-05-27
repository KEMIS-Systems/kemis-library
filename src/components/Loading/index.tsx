import React from "react";

import { cn } from "../../utils";

interface ILoading {
  show?: boolean;
}

export default function Loading({ show }: ILoading) {
  return (
    <>
      {show && (
        <div
          className={cn(
            "loading-box",
            "fixed w-full h-screen z-[3000] flex flex-col items-center justify-center top-0 left-0 bg-black/33"
          )}
        >
          <div
            className="loader w-[60px] h-[60px] rounded-full border-8 border-[#f3f3f3] border-t-[#414142] animate-spin"
            role="status"
          />
        </div>
      )}
    </>
  );
}
