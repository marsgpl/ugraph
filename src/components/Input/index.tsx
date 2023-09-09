import React, { forwardRef } from 'react'
import { cn } from 'lib/cn'
import s from './index.module.css'

export type InputNode = HTMLInputElement | HTMLTextAreaElement

export interface InputProps {
    value?: string
    onChange?: (newValue: string) => void
    onEnter?: (event: React.KeyboardEvent) => void
    disabled?: boolean
    readOnly?: boolean
    className?: string
    lines?: number
    placeholder?: string
    maxLength?: number
    autoFocus?: boolean
}

function InputBase(
    {
        value,
        onChange: onChangeCallback,
        onEnter,
        disabled,
        className,
        lines,
        placeholder,
        maxLength,
        readOnly,
        autoFocus,
    }: InputProps,
    ref?: React.ForwardedRef<InputNode>,
) {
    const onChange = React.useCallback((event: React.ChangeEvent<InputNode>) => {
        let newValue = event.target.value

        if (maxLength) {
            newValue = newValue.substring(0, maxLength)
        }

        onChangeCallback?.(newValue)
    }, [
        onChangeCallback,
        maxLength,
    ])

    const onKeyDown = React.useCallback((event: React.KeyboardEvent) => {
        if (onEnter && event.key.toLowerCase() === 'enter') {
            onEnter(event)
        }
    }, [onEnter])

    return (lines && lines > 1) ? (
        <textarea
            ref={ref as React.RefObject<HTMLTextAreaElement>}
            rows={lines}
            className={cn(s.Textarea, className, readOnly && s.ReadOnly)}
            value={value}
            onChange={onChange}
            onKeyDown={onEnter && onKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            maxLength={maxLength}
            readOnly={readOnly}
            autoCorrect="off"
            autoCapitalize="none"
            autoComplete="off"
            spellCheck="false"
            autoFocus={autoFocus}
        />
    ) : (
        <input
            ref={ref as React.RefObject<HTMLInputElement>}
            className={cn(s.Input, className, readOnly && s.ReadOnly)}
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={onEnter && onKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            maxLength={maxLength}
            readOnly={readOnly}
            autoCorrect="off"
            autoCapitalize="none"
            autoComplete="off"
            spellCheck="false"
            autoFocus={autoFocus}
        />
    )
}

export const Input = forwardRef(InputBase)
