import React, { ReactNode } from 'react'
import { cn } from 'lib/cn'
import s from './index.module.css'

export interface ButtonProps {
    label?: string
    icon?: ReactNode
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    className?: string
    noBg?: boolean
}

export function Button({
    label,
    icon,
    onClick,
    className,
    noBg,
}: ButtonProps) {
    const content = icon || label

    return (
        <button
            onClick={onClick}
            className={cn(
                s.Button,
                !icon && !noBg && s.WithBg,
                icon && s.WithIcon,
                className,
            )}
        >
            {content}
        </button>
    )
}
