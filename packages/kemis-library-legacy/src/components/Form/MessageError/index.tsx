import React from "react";
import { ControllerFieldState } from "react-hook-form";

interface IMessageError {
    fieldState: ControllerFieldState
}
function MessageError({ fieldState }: IMessageError) {
    return (
        <>
            {
                fieldState.error && (
                    <span className="mt-3 font-semibold text-red-500 text-sm flex flex-row items-center justify-between">
                        {fieldState.error.message}
                    </span>
                )
            }
        </>
    )
}

export default MessageError