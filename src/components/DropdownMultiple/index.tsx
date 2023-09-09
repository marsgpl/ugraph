import { cn } from 'lib/cn'
import { Icon, IconType } from 'components/Icon'
import { DropdownOption } from 'components/Dropdown'
import { useModal } from 'hooks/useModal'
import { DropdownMultipleAddValueModal } from 'components/DropdownMultipleAddValueModal'
import s from './index.module.css'

export interface DropdownProps {
    values?: string[]
    onChange: (values: string[]) => void
    options: DropdownOption[]
    className?: string
}

export function DropdownMultiple({
    values,
    onChange,
    options,
    className,
}: DropdownProps) {
    const { openModal, closeModal } = useModal()

    const names = new Map<string, string>()
    const added = new Set<string>()
    const toAdd: string[] = []
    const existing = new Set<string>()
    const bad = new Set<string>()

    options.forEach(({ value, title }) => {
        title && names.set(value, title)
        existing.add(value)
    })

    values?.forEach(value => {
        added.add(value)
        !existing.has(value) && bad.add(value)
    })

    options.forEach(({ value }) => {
        !added.has(value) && toAdd.push(value)
    })

    const showAdd = () => {
        const modalId = 'dropdown-multiple-add'

        const onClose = () => closeModal(modalId)

        const onAdd = (moreValues: string[]) => onChange([
            ...values || [],
            ...moreValues,
        ])

        openModal({
            id: modalId,
            title: 'Add value',
            body: <DropdownMultipleAddValueModal
                onAdd={onAdd}
                onClose={onClose}
                values={toAdd}
                names={names}
            />,
            minWidth: 400,
            maxWidth: 400,
        })
    }

    const canAdd = toAdd.length > 0

    return (
        <div className={cn(s.Container, canAdd && s.ContainerCanAdd, className)}>
            <div className={s.Values}>
                {values?.map(value => {
                    const isBad = bad.has(value)

                    return (
                        <div
                            key={value}
                            className={cn(s.Value, isBad && s.ValueBad)}
                        >
                            {isBad ? '?' : (names.get(value) || value)}

                            <Icon
                                type={IconType.Close}
                                className={s.Del}
                                size={32}
                                color="#fff"
                                onClick={() => onChange(values.filter(v => v !== value))}
                            />
                        </div>
                    )
                })}
            </div>

            {canAdd && (
                <Icon
                    type={IconType.Plus}
                    className={s.Add}
                    size={48}
                    color="#888"
                    onClick={showAdd}
                />
            )}
        </div>
    )
}
