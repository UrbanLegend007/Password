import { useState, useEffect } from 'react'
import CharacterSequenceValidator, { validateSequence } from './CharacterSequenceValidator'
import PasswordTimeValidator, { validateTime } from './PasswordTimeValidator'
import CountryFlagValidator from './CountryFlagValidator'

interface PasswordStrengthProps {
    password: string
    startTime: number
}

interface Criterion {
    label: string
    test: (pw: string) => boolean
}

interface StrengthResult {
    label: string
    color: string
    score: number
    percentage: number
}

const criteria: Criterion[] = [
    { label: 'Minimálně 8 znaků',                       test: (pw) => pw.length >= 8 },
    { label: 'Alespoň jedno velké písmeno',              test: (pw) => /[A-Z]/.test(pw) },
    { label: 'Alespoň jedno číslo',                      test: (pw) => /[0-9]/.test(pw) },
    { label: 'Alespoň jeden speciální znak (!@#$%^&*)',  test: (pw) => /[!@#$%^&*]/.test(pw) },
]

function evaluatePassword(password: string, startTime: number): StrengthResult {
    const base       = criteria.filter((c) => c.test(password)).length
    const seqBonus   = validateSequence(password).isValid ? 1 : 0
    const timeBonus  = validateTime(password, startTime).isValid ? 1 : 0
    const score      = base + seqBonus + timeBonus
    const percentage = (score / (criteria.length + 2)) * 100

    let label: string
    let color: string

    if (score <= 1)      { label = 'Slabé';   color = '#ef4444' }
    else if (score <= 3) { label = 'Střední'; color = '#f97316' }
    else if (score <= 5) { label = 'Dobré';   color = '#eab308' }
    else                 { label = 'Silné';   color = '#22c55e' }

    return { label, color, score, percentage }
}

function PasswordStrength({ password, startTime }: PasswordStrengthProps) {
    const [visible, setVisible] = useState(false)

    const [passwordStrength, setPasswordStrength] = useState<StrengthResult>({
        label: '',
        color: '#94a3b8',
        score: 0,
        percentage: 0,
    })

    useEffect(() => {
        const strength = evaluatePassword(password, startTime)
        setPasswordStrength(strength)
    }, [password, startTime])

    useEffect(() => {
        if (!password) {
            document.title = 'Kontrola hesla'
            return
        }
        document.title = `Síla hesla: ${passwordStrength.label}`
    }, [passwordStrength, password])

    const { label, color, percentage } = passwordStrength

    return (
        <div className="strength-container">

            <div className="toggle-row">
                <button
                    className="btn toggle-btn"
                    onClick={() => setVisible((v) => !v)}
                    type="button"
                >
                    {visible ? '🙈 Skrýt heslo' : '👁️ Zobrazit heslo'}
                </button>
                {visible && password && (
                    <span className="visible-password">{password}</span>
                )}
            </div>

            {password.length > 0 && (
                <>
                    <div className="bar-wrapper">
                        <div
                            className="bar-fill"
                            style={{ width: `${percentage}%`, backgroundColor: color }}
                        />
                    </div>
                    <p className="strength-label">
                        Síla hesla: <strong style={{ color }}>{label}</strong>
                    </p>
                </>
            )}

            <ul className="criteria-list">
                {criteria.map((criterion) => {
                    const met = criterion.test(password)
                    return (
                        <li key={criterion.label} className={`criterion ${met ? 'met' : 'unmet'}`}>
                            <span className="criterion-icon">{met ? '✅' : '⬜'}</span>
                            {criterion.label}
                        </li>
                    )
                })}
                <li className="criterion">
                    <CharacterSequenceValidator password={password} />
                </li>
                <li className="criterion">
                    <PasswordTimeValidator password={password} startTime={startTime} minSeconds={3} />
                </li>
                <li className="criterion">
                    <CountryFlagValidator password={password} />
                </li>
            </ul>

        </div>
    )
}

export default PasswordStrength