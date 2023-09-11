import React from 'react'
import { cn } from 'lib/cn'
import { Icon, IconType } from 'components/Icon'
import { useModal } from 'hooks/useModal'
import { DropdownMultipleAddValueModal } from 'components/DropdownMultipleAddValueModal'
import s from './index.module.css'

export interface DropdownOption {
    title: string
    value: string
    broken?: boolean
}

export interface DropdownMultipleProps {
    selection: Set<string>
    options: DropdownOption[]
    onChange?: (selection: Set<string>) => void
    readOnly?: boolean
    className?: string
}

export function DropdownMultiple({
    selection,
    options,
    onChange,
    readOnly,
    className,
}: DropdownMultipleProps) {
    const { openModal, closeModal } = useModal()

    const {
        selectedOptions,
        addOptions,
    } = React.useMemo(() => {
        const found = new Set<string>()

        const selectedOptions: DropdownOption[] = []
        const addOptions: DropdownOption[] = []

        options.forEach(option => {
            const { value } = option

            if (selection.has(value)) {
                found.add(value)
                selectedOptions.push(option)
            } else {
                addOptions.push(option)
            }
        })

        selection.forEach(value => {
            if (!found.has(value)) {
                selectedOptions.push({
                    title: '?',
                    value,
                    broken: true,
                })
            }
        })

        return {
            selectedOptions,
            addOptions,
        }
    }, [
        selection,
        options,
    ])

    const canEdit = !readOnly && !!onChange
    const canAdd = addOptions.length > 0 && canEdit

    const onDel = (value: string) => {
        if (!canEdit) { return }

        const newSelection = new Set(selection)
        newSelection.delete(value)
        onChange(newSelection)
    }

    const showAdd = () => {
        if (!canAdd) { return }

        const modalId = 'dropdown-multiple-add'

        const onClose = () => closeModal(modalId)

        const onAdd = (moreSelection: Set<string>) => {
            const newSelection = new Set([
                ...selection,
                ...moreSelection,
            ])

            onChange(newSelection)
        }

        openModal({
            id: modalId,
            title: 'Add value',
            body: <DropdownMultipleAddValueModal
                options={addOptions}
                onAdd={onAdd}
                onClose={onClose}
            />,
            minWidth: 400,
            maxWidth: 400,
        })
    }

    return (
        <div className={cn(s.Container, canAdd && s.ContainerCanAdd, className)}>
            <div className={s.Values}>
                {selectedOptions.map(({ title, value, broken }) => (
                    <div
                        key={value}
                        className={cn(
                            s.Value,
                            broken && s.ValueBad,
                            canEdit && s.ValueCanEdit,
                        )}
                    >
                        {title}

                        {canEdit && <Icon
                            type={IconType.Close}
                            className={s.Del}
                            size={32}
                            color="#fff"
                            onClick={() => onDel(value)}
                        />}
                    </div>
                ))}
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
