import { DropdownOption } from 'components/DropdownMultiple'
import { uuid } from 'lib/uuid'

export interface GraphNode {
    id: string
    name: string
    rels: Set<string>
    x: number
    y: number
}

export type GraphNodeStored = [
    string, // id
    string, // name
    string[], // rels
    number, // x
    number, // y
]

export type GraphNodes = Map<string, GraphNode>
export type GraphNodesStored = GraphNodeStored[]

export const GRAPH_NODE_NAME_MAX_LEN = 128
export const LOCAL_STORAGE_KEY_GRAPH_NODES = 'n'

export function parseStoredGraphNode(stored: GraphNodeStored): GraphNode {
    const [id, name, rels, x, y] = stored

    return {
        id,
        name,
        rels: new Set(rels),
        x,
        y,
    }
}

export function packGraphNode(node: GraphNode): GraphNodeStored {
    const { id, name, rels, x, y } = node

    return [
        id,
        name,
        Array.from(rels),
        x,
        y,
    ]
}

export function loadNodes(): GraphNodes {
    const text = window.localStorage.getItem(LOCAL_STORAGE_KEY_GRAPH_NODES)
    const list = JSON.parse(text || '[]') as GraphNodesStored

    return list.reduce<GraphNodes>((map, storedNode) => {
        const node = parseStoredGraphNode(storedNode)
        map.set(node.id, node)
        return map
    }, new Map())
}

export function saveNodes(nodes: GraphNodes): void {
    const list: GraphNodesStored = []

    nodes.forEach(node => {
        list.push(packGraphNode(node))
    })

    const text = JSON.stringify(list)

    window.localStorage.setItem(LOCAL_STORAGE_KEY_GRAPH_NODES, text)
}

export function newGraphNode(node: Partial<GraphNode> = {}): GraphNode {
    return {
        id: node.id || uuid(),
        name: node.name || '',
        rels: node.rels || new Set(),
        x: node.x || 0,
        y: node.y || 0,
    }
}

export function getBackwardRels(node: GraphNode, nodes: GraphNodes): Set<string> {
    const nodeId = node.id
    const inRels = new Set<string>()

    nodes.forEach(({ id, rels }) => {
        if (id === nodeId) { return }
        if (rels.has(nodeId)) {
            inRels.add(id)
        }
    })

    return inRels
}

export function getDropdownOptions(node: GraphNode, nodes: GraphNodes): DropdownOption[] {
    const nodeId = node.id
    const options: DropdownOption[] = []

    nodes.forEach(({ id, name }) => {
        if (id === nodeId) { return }

        options.push({
            title: name || `id: ${id}`,
            value: id,
        })
    })

    return options.sort(
        ({ title: t1 }, { title: t2 }) =>
            t1 > t2 ? 1 : t1 < t2 ? -1 : 0)
}
