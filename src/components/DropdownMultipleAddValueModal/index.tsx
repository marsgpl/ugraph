import React from 'react'
import { Button } from 'components/Button'
import { CheckBox } from 'components/CheckBox'
import { ModalActions } from 'components/ModalActions'
import { Table } from 'components/Table'
import { DropdownOption } from 'components/DropdownMultiple'
import s from './index.module.css'
import { Input } from 'components/Input'

export interface DropdownMultipleAddValueModal {
    options: DropdownOption[]
    onAdd: (selection: Set<string>) => void
    onClose: () => void
}

export function DropdownMultipleAddValueModal({
    options,
    onAdd,
    onClose,
}: DropdownMultipleAddValueModal) {
    const [selection, setSelection] = React.useState(new Set<string>())
    const [filter, setFilter] = React.useState('')

    const add = () => {
        onAdd(selection)
        onClose()
    }

    const rows = React.useMemo(() => {
        const filterNormalized = filter.trim().toLowerCase()

        return options
            .filter(({ title, value }) =>
                title.trim().toLowerCase().includes(filterNormalized) || selection.has(value))
            .map(({ title, value }) => {
                const selected = selection.has(value)

                const onChangeSelect = (selected: boolean) => {
                    const newSelection = new Set(selection)
                    if (selected) {
                        newSelection.add(value)
                    } else {
                        newSelection.delete(value)
                    }
                    setSelection(newSelection)
                }

                const onToggleSelect = () => {
                    const newSelection = new Set(selection)
                    if (selected) {
                        newSelection.delete(value)
                    } else {
                        newSelection.add(value)
                    }
                    setSelection(newSelection)
                }

                return {
                    selected,
                    values: [
                        <CheckBox
                            checked={selected}
                            onChange={onChangeSelect}
                        />,
                        <div
                            className={s.Cell}
                            onClick={onToggleSelect}
                        >
                            {title || value}
                        </div>,
                    ],
                }
            })
    }, [filter, options, selection])

    return <>
        <div className={s.Search}>
            <Input
                value={filter}
                onChange={setFilter}
                placeholder="Filter"
                autoFocus
            />
        </div>

        <Table
            className={s.Table}
            noHeader
            maxHeight={295}
            cols={[
                { width: 48 },
                { width: '100%' },
            ]}
            rows={rows}
        />

        <ModalActions>
            <Button
                label="Cancel"
                onClick={onClose}
                noBg
            />
            <Button
                label="Add"
                onClick={add}
            />
        </ModalActions>
    </>
}
