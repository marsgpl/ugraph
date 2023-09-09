import { cn } from 'lib/cn'
import s from './index.module.css'

export interface CheckBoxProps {
    checked?: boolean
    onChange: (selected: boolean) => void
}

export function CheckBox({
    checked,
    onChange,
}: CheckBoxProps) {
    return (
        <div
            className={cn(s.Box, checked && s.BoxChecked)}
            onClick={() => onChange(!checked)}
        />
    )
}
