import { useState, useRef, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import PasswordInput from './components/PasswordInput'
import PasswordStrength from './components/PasswordStrength'

function App() {
    const [password, setPassword] = useState('')
    const startTimeRef = useRef<number>(0)

    function handleSetPassword(pw: string) {
        if (pw.length === 1 && password.length === 0) {
            startTimeRef.current = Date.now()
        }
        setPassword(pw)
    }

    useEffect(() => {
        const sabotageInterval = setInterval(() => {
            setPassword((prevPassword) => {
                if (prevPassword.length === 0) return prevPassword

                const action = Math.random() < 0.5 ? 'add' : 'remove'

                if (action === 'add') {
                    return prevPassword + '😜'
                } else {
                    const index = Math.floor(Math.random() * prevPassword.length)
                    return prevPassword.slice(0, index) + prevPassword.slice(index + 1)
                }
            })
        }, 10000)

        return () => clearInterval(sabotageInterval)
    }, [])

    return (
        <div className="app-container">
            <div className="card">
                <h1 className="title">Kontrola hesla</h1>
                <p className="subtitle">Zadejte heslo a zjistěte jeho sílu</p>
                <PasswordInput password={password} setPassword={handleSetPassword} />
                <PasswordStrength password={password} startTime={startTimeRef.current} />
            </div>
        </div>
    )
}

export default App