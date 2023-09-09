import React from 'react'
import { cn } from 'lib/cn'
import { Icon, IconType } from 'components/Icon'
import is from '../Input/index.module.css'
import s from './index.module.css'

export interface DropdownOption {
    value: string
    title?: string
}

export interface DropdownProps {
    value?: string
    onChange: (value: string) => void
    options: DropdownOption[]
    className?: string
    disabled?: boolean
}

export function Dropdown({
    value,
    onChange,
    options,
    className,
    disabled,
}: DropdownProps) {
    const onSelectChange = React.useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) =>
            onChange(event.target.value),
        [onChange])

    return (
        <div className={cn(s.Container, className)}>
            <select
                value={value || ''}
                onChange={onSelectChange}
                className={cn(is.Input, s.Select, !value && s.Empty)}
                disabled={disabled}
            >
                {options.map(({
                    title,
                    value,
                }) => (
                    <option
                        key={value}
                        value={value}
                    >{title || value}</option>
                ))}
            </select>

            <Icon
                type={IconType.TriangleDown}
                className={s.Icon}
                size={24}
                color="#888"
            />
        </div>
    )
}
