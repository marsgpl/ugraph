export interface GraphNode {
    id: string
    name?: string
    rels?: string[]
    x?: number
    y?: number
}

export const GRAPH_NODE_NAME_MAX_LEN = 128
