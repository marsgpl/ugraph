import { GraphNode } from 'models/Graph'
import React from 'react'
import { useWH } from 'hooks/useWH'
import { getClosestParent } from 'lib/getClosestParent'
import { useModal } from 'hooks/useModal'
import { EditGraphNodeModal } from 'components/EditGraphNodeModal'
import s from './index.module.css'

const NODE_RADIUS = 10

export interface SvgCanvasProps {
    nodes: Map<string, GraphNode>
    setNodes: React.Dispatch<React.SetStateAction<Map<string, GraphNode>>>
}

export function SvgCanvas({
    nodes,
    setNodes,
}: SvgCanvasProps) {
    const { width, height } = useWH()
    const { openModal, closeModal } = useModal()

    const save = (node: GraphNode) => {
        const newNodes = new Map(nodes)
        newNodes.set(node.id, node)
        setNodes(newNodes)
    }

    const del = (nodeId: string) => {
        const newNodes = new Map(nodes)
        newNodes.delete(nodeId)
        setNodes(newNodes)
    }

    const openEditGraphNodeModal = (node: GraphNode) => {
        const modalId = 'edit-graph-node-' + node.id

        const onClose = () => closeModal(modalId)

        openModal({
            id: modalId,
            minWidth: 400,
            title: 'Edit graph node',
            body: <EditGraphNodeModal
                node={node}
                onSave={save}
                onDelete={del}
                onClose={onClose}
                nodes={nodes}
            />,
        })
    }

    const onMouseDown = (
        event: React.MouseEvent<SVGGElement>,
        node: GraphNode,
    ) => {
        if ((event.target as Element).tagName.toLowerCase() !== 'circle') { return }
        const g = getClosestParent<SVGGElement>(event.target, 'g')
        if (!g) { return }

        const {
            clientX: x1,
            clientY: y1,
        } = event

        const {
            x = 0,
            y = 0,
        } = node

        let dx = 0
        let dy = 0

        const onMouseMove = (event: MouseEvent) => {
            const {
                clientX: x2,
                clientY: y2,
            } = event

            dx = x2 - x1
            dy = y2 - y1

            const xi = x + dx
            const yi = y + dy

            node.x = xi
            node.y = yi

            g.setAttribute('transform', `translate(${xi}, ${yi})`)
        }

        const onMouseUp = () => {
            save(node)

            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)

            if (!dx && !dy) {
                openEditGraphNodeModal(node)
            }
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
    }

    const svgNodes: JSX.Element[] = []

    nodes.forEach(node => {
        const {
            id,
            name,
            x = 0,
            y = 0,
        } = node

        svgNodes.push(
            <g
                key={id}
                transform={`translate(${x}, ${y})`}
                onMouseDown={event => onMouseDown(event, node)}
            >
                <circle
                    className={s.Circle}
                    r={NODE_RADIUS}
                />
                {name && (
                    <text
                        x={13}
                        y={5}
                        className={s.Label}
                    >{name}</text>
                )}
            </g>
        )

        // <line x1="10" y1="10" x2="90" y2="90" stroke-width="1" stroke="black"/>
    })

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={s.Canvas}
            style={{
                width,
                height,
            }}
        >
            {svgNodes}
        </svg>
    )
}
