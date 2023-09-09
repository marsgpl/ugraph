import React from 'react'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { ModalActions } from 'components/ModalActions'
import { GRAPH_NODE_NAME_MAX_LEN, GraphNode } from 'models/Graph'
import { uuid } from 'lib/uuid'
import { Form } from 'components/Form'
import { FormRow } from 'components/FormRow'
import { useWH } from 'hooks/useWH'

export interface AddGraphNodeModalProps {
    onAdd: (node: GraphNode) => void
    onClose: () => void
}

export function AddGraphNodeModal({
    onAdd,
    onClose,
}: AddGraphNodeModalProps) {
    const { width, height } = useWH()

    const [node, setNode] = React.useState<GraphNode>({
        id: uuid(),
    })

    const add = () => {
        node.x = width / 2
        node.y = height / 2
        node.name = node.name?.substring(0, GRAPH_NODE_NAME_MAX_LEN)

        onAdd(node)
        onClose()
    }

    const setName = (name: string) => setNode({ ...node, name })

    return <>
        <Form>
            <FormRow label="Name">
                <Input
                    value={node.name || ''}
                    onChange={setName}
                    autoFocus
                    onEnter={add}
                    maxLength={GRAPH_NODE_NAME_MAX_LEN}
                />
            </FormRow>
        </Form>

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
