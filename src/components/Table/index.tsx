import { cn } from 'lib/cn'
import s from './index.module.css'
import { ReactNode } from 'react'

export interface TableCol {
    label?: string
    width?: number | string
}

export interface TableRow {
    selected?: boolean
    values: ReactNode[]
}

export interface TableProps {
    cols: TableCol[]
    rows: TableRow[]
    className?: string
    noHeader?: boolean
}

export function Table({
    cols,
    rows,
    className,
    noHeader,
}: TableProps) {
    return (
        <div className={cn(s.Table, className)}>
            {!noHeader && (
                <div className={cn(s.Row, s.RowHeader)}>
                    {cols.map((col, colIndex) => (
                        <div
                            key={colIndex}
                            className={cn(s.Cell, s.CellText)}
                        >
                            {col.label}
                        </div>
                    ))}
                </div>
            )}

            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className={cn(s.Row, row.selected && s.RowSelected)}>
                    {cols.map(((col, index) => {
                        const value = row.values[index]
                        const isString = typeof value === 'string'

                        return (
                            <div
                                key={index}
                                className={cn(s.Cell, isString && s.CellText)}
                                style={{
                                    width: col.width,
                                }}
                            >
                                {value}
                            </div>
                        )
                    }))}
                </div>
            ))}
        </div>
    )
}
