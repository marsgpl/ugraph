import { cn } from 'lib/cn'
import s from './index.module.css'
import { ReactNode } from 'react'

export interface TableCol {
    label?: string
}

export interface TableRow {
    selected?: boolean
    values: ReactNode[]
}

export interface TableProps {
    cols?: TableCol[]
    rows: TableRow[]
    className?: string
}

export function Table({
    cols,
    rows,
    className,
}: TableProps) {
    return (
        <div className={cn(s.Table, className)}>
            {!!cols && (
                <div className={cn(s.Row, s.RowHeader)}>
                    {cols.map((col, colIndex) => (
                        <div key={colIndex} className={cn(s.Cell, s.CellText)}>
                            {col.label}
                        </div>
                    ))}
                </div>
            )}

            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className={cn(s.Row, row.selected && s.RowSelected)}>
                    {row.values.map(((value, index) => {
                        const isString = typeof value === 'string'

                        return (
                            <div key={index} className={cn(s.Cell, isString && s.CellText)}>
                                {value}
                            </div>
                        )
                    }))}
                </div>
            ))}
        </div>
    )
}
