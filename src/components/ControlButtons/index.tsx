import { Button } from 'components/Button'
import { useModal } from 'hooks/useModal'
import { AddGraphNodeModal } from 'components/AddGraphNodeModal'
import { GraphNode } from 'models/Graph'
import s from './index.module.css'

export interface ControlButtonsProps {
    onGraphNodeAdd: (node: GraphNode) => void
}

export function ControlButtons({
    onGraphNodeAdd,
}: ControlButtonsProps) {
    const { openModal, closeModal } = useModal()

    const openAddGraphNodeModal = () => {
        const modalId = 'add-graph-node'

        const onClose = () => closeModal(modalId)

        openModal({
            id: modalId,
            minWidth: 400,
            title: 'Add new graph node',
            body: <AddGraphNodeModal
                onAdd={onGraphNodeAdd}
                onClose={onClose}
            />,
        })
    }

    return (
        <div className={s.Buttons}>
            <Button label="Add" onClick={openAddGraphNodeModal} />
        </div>
    )
}
