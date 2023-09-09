import React, { ReactNode } from 'react'
import { stringifyError } from 'lib/stringifyError'
import { Button } from 'components/Button'
import s from './index.module.css'

interface Props {
    children?: ReactNode
}

interface State {
    error?: unknown
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {}
    }

    static getDerivedStateFromError(error: unknown) {
        return { error }
    }

    resetError = () => {
        this.setState({
            error: undefined
        })
    }

    render() {
        const { error } = this.state

        if (error === undefined) {
            return this.props.children
        }

        return (
            <div className={s.Box}>
                <div className={s.Msg}>
                    {stringifyError(error)}
                </div>

                <Button
                    className={s.Btn}
                    text="Reset"
                    onClick={() => this.resetError()}
                />
            </div>
        )
    }
}
