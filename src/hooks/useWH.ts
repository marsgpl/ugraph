import React from 'react'

export function useWH() {
    const [width, setWidth] = React.useState(window.innerWidth)
    const [height, setHeight] = React.useState(window.innerHeight)

    React.useEffect(() => {
        const onResize = () => {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
        }

        window.addEventListener('resize', onResize)

        return () => window.removeEventListener('resize', onResize)
    }, [])

    return {
        width,
        height,
    }
}
