interface TimeResult {
    isValid: boolean
    elapsedSeconds: number
    message: string
}

interface PasswordTimeValidatorProps {
    password: string
    startTime: number
    minSeconds?: number
}

function PasswordTimeValidator({ password, startTime, minSeconds = 3 }: PasswordTimeValidatorProps) {
    const result = validateTime(password, startTime, minSeconds)

    if (!password) return null

    return (
        <div className={`sequence-validator ${result.isValid ? 'valid' : 'invalid'}`}>
            <span className="criterion-icon">{result.isValid ? '✅' : '⬜'}</span>
            <span>{result.message}</span>
        </div>
    )
}

export function validateTime(password: string, startTime: number, minSeconds = 3): TimeResult {
    if (!password) {
        return { isValid: false, elapsedSeconds: 0, message: 'Heslo je prázdné.' }
    }

    const elapsedSeconds = (Date.now() - startTime) / 1000
    const isValid = elapsedSeconds >= minSeconds

    return {
        isValid,
        elapsedSeconds: Math.round(elapsedSeconds * 10) / 10,
        message: isValid
            ? `Časová validace: heslo zadáno za ${elapsedSeconds.toFixed(1)}s ✓`
            : `Časová validace: heslo zadáno příliš rychle (${elapsedSeconds.toFixed(1)}s < ${minSeconds}s) — vypadá jako automaticky generované`,
    }
}

export default PasswordTimeValidator