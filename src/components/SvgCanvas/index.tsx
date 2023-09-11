import React from 'react'
import { GraphNode, GraphNodes } from 'models/Graph'
import { useWH } from 'hooks/useWH'
import { getClosestParent } from 'lib/getClosestParent'
import { useModal } from 'hooks/useModal'
import { EditGraphNodeModal } from 'components/EditGraphNodeModal'
import s from './index.module.css'

const NODE_RADIUS = 10

export interface SvgCanvasProps {
    nodes: GraphNodes
    setNodes: React.Dispatch<React.SetStateAction<GraphNodes>>
}

export function SvgCanvas({
    nodes,
    setNodes,
}: SvgCanvasProps) {
    const { width, height } = useWH()
    const { openModal, closeModal } = useModal()

    const linesRef = React.useRef<{
        from: Map<string, SVGLineElement[]>
        to: Map<string, SVGLineElement[]>
    }>({
        from: new Map(),
        to: new Map(),
    })

    const svgNodes = React.useMemo(() => {
        linesRef.current = {
            from: new Map(),
            to: new Map(),
        }

        const save = (node: GraphNode) => {
            const newNodes = new Map(nodes)
            newNodes.set(node.id, node)
            setNodes(newNodes)
        }

        const del = (node: GraphNode) => {
            const newNodes = new Map(nodes)
            newNodes.delete(node.id)
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

            const { id, x, y } = node

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

                const xs = String(xi)
                const ys = String(yi)

                g.setAttribute('transform', `translate(${xs}, ${ys})`)

                linesRef.current.from.get(id)?.forEach(line => {
                    line.setAttribute('x1', xs)
                    line.setAttribute('y1', ys)
                })

                linesRef.current.to.get(id)?.forEach(line => {
                    line.setAttribute('x2', xs)
                    line.setAttribute('y2', ys)
                })
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
        const drawnLines = new Set<string>()

        nodes.forEach(node => {
            const {
                id,
                name,
                rels,
                x,
                y,
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

            rels.forEach(toId => {
                const toNode = nodes.get(toId)

                if (!toNode) { return }

                const drawnId = [id, toId].sort().join(':')

                if (drawnLines.has(drawnId)) { return }

                drawnLines.add(drawnId)

                svgNodes.unshift(
                    <line
                        ref={node => {
                            if (!node) { return }

                            const from = linesRef.current.from.get(id) || []
                            const to = linesRef.current.to.get(toId) || []

                            if (!from.length) linesRef.current.from.set(id, from)
                            if (!to.length) linesRef.current.to.set(toId, to)

                            from.push(node)
                            to.push(node)
                        }}
                        key={drawnId}
                        className={s.Line}
                        x1={x}
                        y1={y}
                        x2={toNode.x}
                        y2={toNode.y}
                    />
                )
            })
        })

        return svgNodes
    }, [nodes])

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
