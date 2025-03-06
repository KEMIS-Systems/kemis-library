import React from "react";

export interface ISplitButtonProps extends React.ButtonHTMLAttributes<any> {
    dropListItems: React.JSX.Element
    dropListIcon?: React.JSX.Element
    dropListClassName?: string
    buttonLabelClassName?: string
    buttonName: string
}