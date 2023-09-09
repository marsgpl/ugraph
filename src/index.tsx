import ReactDOM from 'react-dom/client'
import { App } from 'components/App'
import { ErrorBoundary } from 'components/ErrorBoundary'
import './index.css'

document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div')

    container.id = 'root'

    document.body.appendChild(container)

    const root = ReactDOM.createRoot(container)

    root.render(
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    )
})
