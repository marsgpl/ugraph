import React from 'react'
import { ModalProps } from 'components/Modal'
import { uuid } from 'lib/uuid'

const MODAL_MIN_Z = 10000

export interface ModalContextValue {
    openModal: (props: ModalProps) => string
    closeModal: (modalId: string) => void
}

export const ModalContext = React.createContext<ModalContextValue>({
    openModal: () => '',
    closeModal: () => {},
})

export const useModal = () => React.useContext(ModalContext)

export const computeModals = (modals: ModalProps[], badId: string, newModal?: ModalProps): ModalProps[] => {
    const newModals = modals.filter(({ id }) => id !== badId)

    if (newModal) {
        newModal.z = computeModals.z++

        newModals.push(newModal)
    }

    return newModals
}

computeModals.z = MODAL_MIN_Z

export const BindModals = () => {
    const [, setModalsDelta] = React.useState<number>()
    const modalsRef = React.useRef<ModalProps[]>([])

    const openModal = React.useCallback((props: ModalProps) => {
        const modalId = props.id || uuid()

        props.id = modalId

        modalsRef.current = computeModals(modalsRef.current, modalId, props)
        setModalsDelta(Date.now())

        return modalId
    }, [])

    const closeModal = React.useCallback((modalId: string) => {
        modalsRef.current = computeModals(modalsRef.current, modalId)
        setModalsDelta(Date.now())
    }, [])

    return {
        modals: modalsRef.current,
        openModal,
        closeModal,
    }
}
