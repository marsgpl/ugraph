import React from 'react'
import { useModal } from 'hooks/useModal'
import { Button } from 'components/Button'
import { Icon, IconType } from 'components/Icon'
import s from './index.module.css'

export interface ModalProps {
    id?: string
    z?: number
    title?: string
    body?: React.ReactNode
    text?: string | string[]
    minWidth?: string | number
    maxWidth?: string | number
    /**
     * if user clicks on shadow, we close the modal.
     * set to true to prevent that
     */
    disableShadowClose?: boolean
}

export function Modal({
    id,
    z,
    title,
    body,
    text,
    disableShadowClose,
    minWidth,
    maxWidth,
}: ModalProps) {
    const { closeModal } = useModal()

    const close = React.useCallback(() => id && closeModal(id), [closeModal, id])

    const closeOnShadow = React.useCallback((event: React.MouseEvent) => {
        const cl = (event.target as Element).classList

        if (cl?.contains(s.Shadow) || cl?.contains(s.Center)) {
            close()
        }
    }, [close])

    return (
        <div
            className={s.Shadow}
            style={{
                zIndex: z,
            }}
            onClick={disableShadowClose ? undefined : closeOnShadow}
        >
            <div className={s.Center}>
                <div
                    className={s.Content}
                    style={{
                        minWidth,
                        maxWidth,
                    }}
                >
                    <div className={s.Head}>
                        <div className={s.HeadIcon} />

                        <div className={s.HeadTitle}>{title}</div>

                        <Button
                            className={s.HeadButton}
                            icon={<Icon type={IconType.Close} size={44} />}
                            onClick={close}
                        />
                    </div>

                    {Boolean(body) ? body : (
                        <div className={s.Text}>
                            {Array.isArray(text)
                                ? text.map((t, i) => <div key={i}>{t}</div>)
                                : text}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
