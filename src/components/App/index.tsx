import React from 'react'
import { BindModals, ModalContext } from 'hooks/useModal'
import { SvgCanvas } from 'components/SvgCanvas'
import { Modal } from 'components/Modal'
import { ControlButtons } from 'components/ControlButtons'
import { GraphNode, loadNodes, saveNodes } from 'models/Graph'
import { useEffectNoInitial } from 'hooks/useEffectNoInitial'

export function App() {
    const { modals, openModal, closeModal } = BindModals()

    const [nodes, setNodes] = React.useState(loadNodes())

    const onNodeAdd = React.useCallback((node: GraphNode) => {
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
    }, [nodes])

    useEffectNoInitial(() => saveNodes(nodes), [nodes])

    return <>
        <ModalContext.Provider value={{
            openModal,
            closeModal,
        }}>
            <SvgCanvas
                nodes={nodes}
                setNodes={setNodes}
            />

            <ControlButtons
                onGraphNodeAdd={onNodeAdd}
            />

            {modals.map(props => <Modal key={props.id} {...props} />)}
        </ModalContext.Provider>
    </>
}
