import { ReactNode } from 'react'
import s from './index.module.css'

export interface FormProps {
    children: ReactNode
}

export function Form({
    children,
}: FormProps) {
    return (
        <div className={s.Form}>
            {children}
        </div>
    )
}
