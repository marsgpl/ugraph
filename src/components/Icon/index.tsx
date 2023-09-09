import React from 'react'
import { forwardRef } from 'react'
import { cn } from 'lib/cn'
import s from './index.module.css'

const DEFAULT_COLOR = '#000'
const DEFAULT_SIZE = 48

export enum IconType {
    Close = 1,
    TriangleDown = 2,
    Plus = 3,
}

function getSvgAttrs(
    viewBoxSize: number,
    size: number,
    scale = .5,
    altStyles?: React.CSSProperties,
) {
    return {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: `0 0 ${viewBoxSize} ${viewBoxSize}`,
        style: {
            width: size * scale,
            height: size * scale,
            margin: size * (1 - scale) / 2,
            ...altStyles,
        },
    }
}

export interface IconProps {
    type: IconType
    color?: string
    size?: number
    onClick?: () => void
    className?: string
    scale?: number
}

function IconBase(
    {
        type,
        color: rawColor,
        size: rawSize,
        scale,
        onClick,
        className,
    }: IconProps,
    ref?: React.ForwardedRef<HTMLDivElement>,
) {
    const color = React.useMemo(() => rawColor || DEFAULT_COLOR, [rawColor])
    const size = React.useMemo(() => rawSize || DEFAULT_SIZE, [rawSize])

    const shape = React.useMemo(() => {
        switch (type) {
            case IconType.Close: return (
                <svg {...getSvgAttrs(50, size, scale || .5)}><path fill={color} d="M7.72 6.28 6.28 7.72 23.56 25 6.28 42.28l1.44 1.44L25 26.44l17.28 17.28 1.44-1.44L26.44 25 43.72 7.72l-1.44-1.44L25 23.56Z"/></svg>
            )
            case IconType.TriangleDown: return (
                <svg {...getSvgAttrs(24, size, scale || .5)}><path fill={color} d="m12 18.2 11.7-11H.2l11.8 11Z"/></svg>
            )
            case IconType.Plus: return (
                <svg {...getSvgAttrs(50, size, scale || .5)}><path fill={color} d="M25 2a23 23 0 1 0 0 46 23 23 0 0 0 0-46zm0 2a21 21 0 1 1 0 42 21 21 0 0 1 0-42zm-1 9v11H13v2h11v11h2V26h11v-2H26V13h-2z"/></svg>
            )
        }
    }, [
        type,
        color,
        size,
        scale,
    ])

    return (
        <div
            ref={ref}
            className={cn(s.Icon, className)}
            onClick={onClick}
            style={{
                width: size,
                height: size,
            }}
        >{shape}</div>
    )
}

export const Icon = forwardRef(IconBase)
