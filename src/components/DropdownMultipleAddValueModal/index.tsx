import React from 'react'
import { Button } from 'components/Button'
import { CheckBox } from 'components/CheckBox'
import { ModalActions } from 'components/ModalActions'
import { Table } from 'components/Table'
import s from './index.module.css'

export interface DropdownMultipleAddValueModal {
    onAdd: (values: string[]) => void
    onClose: () => void
    values: string[]
    names: Map<string, string | undefined>
}

export function DropdownMultipleAddValueModal({
    onAdd,
    onClose,
    values,
    names,
}: DropdownMultipleAddValueModal) {
    const [selection, setSelection] = React.useState(new Set<string>())

    const add = () => {
        onAdd(Array.from(selection))
        onClose()
    }

    return <>
        <Table
            className={s.Table}
            rows={values.map(value => {
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
                            {names.get(value) || value}
                        </div>,
                    ],
                }
            })}
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
