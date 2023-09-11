import React from 'react'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { ModalActions } from 'components/ModalActions'
import {
    GRAPH_NODE_NAME_MAX_LEN,
    GraphNode,
    GraphNodes,
    getDropdownOptions,
    getBackwardRels,
} from 'models/Graph'
import { Form } from 'components/Form'
import { FormRow } from 'components/FormRow'
import { DropdownMultiple } from 'components/DropdownMultiple'
import { useEffectNoInitial } from 'hooks/useEffectNoInitial'

export interface EditGraphNodeModalProps {
    node: GraphNode
    nodes: GraphNodes
    onSave: (node: GraphNode) => void
    onDelete: (node: GraphNode) => void
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

    useEffectNoInitial(() => setNode(initialNode), [initialNode])

    const {
        inRels,
        options,
     } = React.useMemo(() => ({
        inRels: getBackwardRels(initialNode, nodes),
        options: getDropdownOptions(initialNode, nodes),
     }), [initialNode, nodes])

    const save = () => {
        onSave(node)
        onClose()
    }

    const del = () => {
        onDelete(initialNode)
        onClose()
    }

    const setName = (name: string) => setNode({
        ...node,
        name: name.substring(0, GRAPH_NODE_NAME_MAX_LEN),
    })

    const setRels = (rels: Set<string>) => setNode({ ...node, rels })

    const outRelsN = node.rels.size
    const inRelsN = inRels.size

    return <>
        <Form>
            <FormRow label="Name">
                <Input
                    value={node.name}
                    onChange={setName}
                    maxLength={GRAPH_NODE_NAME_MAX_LEN}
                />
            </FormRow>

            <FormRow label={'rels' + (outRelsN ? ` - ${outRelsN}` : '')}>
                <DropdownMultiple
                    selection={node.rels}
                    options={options}
                    onChange={setRels}
                />
            </FormRow>

            <FormRow label={'Backward rels' + (inRelsN ? ` - ${inRelsN}` : '')}>
                <DropdownMultiple
                    selection={inRels}
                    options={options}
                    readOnly
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
