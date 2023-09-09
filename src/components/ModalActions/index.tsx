import { ReactNode } from 'react'
import s from './index.module.css'

export interface ModalActionsProps {
    children: ReactNode
}

export function ModalActions({
    children,
}: ModalActionsProps) {
    return (
        <div className={s.Actions}>
            {children}
        </div>
    )
}
