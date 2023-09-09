export function getClosestParent<T extends Element>(
    node: Element | EventTarget | null,
    tagName: string,
): T | null {
    const tagNameLower = tagName.toLowerCase()

    while (node && (node as Element).tagName.toLowerCase() !== tagNameLower) {
        node = (node as Element).parentNode as Element
    }

    return node as T | null
}
