import React from 'react'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { ModalActions } from 'components/ModalActions'
import { GRAPH_NODE_NAME_MAX_LEN, GraphNode } from 'models/Graph'
import { Form } from 'components/Form'
import { FormRow } from 'components/FormRow'
import { DropdownOption } from 'components/Dropdown'
import { DropdownMultiple } from 'components/DropdownMultiple'

export interface EditGraphNodeModalProps {
    node: GraphNode
    nodes: Map<string, GraphNode>
    onSave: (node: GraphNode) => void
    onDelete: (nodeId: string) => void
    onClose: () => void
}

export function EditGraphNodeModal({
    node: initialNode,
    nodes,
    onSave,
    onDelete,
    onClose,
}: EditGraphNodeModalProps) {
    const [node, setNode] = React.useState<GraphNode>(initialNode)

    const relsOpts = React.useMemo(() => {
        const options: DropdownOption[] = []

        nodes.forEach(({ id, name }) => {
            if (id === initialNode.id) { return }

            options.push({
                value: id,
                title: name || `id:${id}`,
            })
        })

        return options
    }, [
        nodes,
        initialNode,
    ])

    const save = () => {
        node.name = node.name?.substring(0, GRAPH_NODE_NAME_MAX_LEN)

        onSave(node)
        onClose()
    }

    const del = () => {
        onDelete(initialNode.id)
        onClose()
    }

    const setName = (name: string) => setNode({ ...node, name })

    const setRels = (rels: string[]) => setNode({ ...node, rels })

    const relsN = node.rels?.length || 0

    return <>
        <Form>
            <FormRow label="Name">
                <Input
                    value={node.name || ''}
                    onChange={setName}
                    maxLength={GRAPH_NODE_NAME_MAX_LEN}
                />
            </FormRow>

            <FormRow label={relsN ? `Rels - ${relsN}` : 'Rels'}>
                <DropdownMultiple
                    values={node.rels || []}
                    options={relsOpts}
                    onChange={setRels}
                />
            </FormRow>
        </Form>

        <ModalActions>
            <Button
                label="Delete"
                onClick={del}
                noBg
            />
            <Button
                label="Save"
                onClick={save}
            />
        </ModalActions>
    </>
}
