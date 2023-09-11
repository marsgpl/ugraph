import { Button } from 'components/Button'
import { useModal } from 'hooks/useModal'
import { AddGraphNodeModal } from 'components/AddGraphNodeModal'
import { GraphNode, GraphNodes } from 'models/Graph'
import s from './index.module.css'
import React from 'react'

export interface ControlButtonsProps {
    nodes: GraphNodes
    setNodes: React.Dispatch<React.SetStateAction<GraphNodes>>
}

export function ControlButtons({
    nodes,
    setNodes,
}: ControlButtonsProps) {
    const { openModal, closeModal } = useModal()

    const openAddGraphNodeModal = () => {
        const modalId = 'add-graph-node'

        const onClose = () => closeModal(modalId)

        const onNodeAdd = (node: GraphNode) => {
            const { id } = node

            if (nodes.has(id)) {
                return openModal({
                    title: 'Error',
                    text: `Node with id ${id} already exists`,
                })
            }

            const newNodes = new Map(nodes)
            newNodes.set(id, node)
            setNodes(newNodes)
        }

        openModal({
            id: modalId,
            minWidth: 400,
            title: 'Add new graph node',
            body: <AddGraphNodeModal
                onAdd={onNodeAdd}
                onClose={onClose}
            />,
        })
    }

    const deleteAllNodes = () => {
        setNodes(new Map())
    }

    return (
        <div className={s.Buttons}>
            <Button label="Add" onClick={openAddGraphNodeModal} />
            <Button label="Clean" onClick={deleteAllNodes} />
        </div>
    )
}
