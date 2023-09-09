import { ReactNode } from 'react'
import s from './index.module.css'

export interface FormRowProps {
    label?: string
    children: ReactNode
}

export function FormRow({
    label,
    children,
}: FormRowProps) {
    return (
        <label className={s.Row}>
            {Boolean(label) && (
                <div className={s.Label}>{label}</div>
            )}

            {children}
        </label>
    )
}
