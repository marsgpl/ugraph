import React from 'react'

export function useEffectNoInitial(effect: Function, deps: unknown[]) {
    const didMount = React.useRef(false)

    React.useEffect(() => {
        if (didMount.current) {
            effect()
        } else {
            didMount.current = true
        }
    }, deps)
}
