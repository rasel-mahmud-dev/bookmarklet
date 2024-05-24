import {useState} from 'react'
import './App.css'
import ExtensionApp from "../extension/ExtensionApp.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <ExtensionApp />
        </div>
    )
}

export default App
