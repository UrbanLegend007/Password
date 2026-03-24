interface SequenceResult {
    isValid: boolean
    validSequenceCount: number
    message: string
}

interface CharacterSequenceValidatorProps {
    password: string
}

function CharacterSequenceValidator({ password }: CharacterSequenceValidatorProps) {
    const result = validateSequence(password)

    return (
        <div className={`sequence-validator ${result.isValid ? 'valid' : 'invalid'}`}>
            <span className="criterion-icon">{result.isValid ? '✅' : '⬜'}</span>
            <span>{result.message}</span>
        </div>
    )
}

export function validateSequence(password: string): SequenceResult {
    let validSequenceCount = 0

    for (let i = 0; i <= password.length - 4; i++) {
        const chunk = password.slice(i, i + 4)
        const hasLower   = /[a-z]/.test(chunk)
        const hasUpper   = /[A-Z]/.test(chunk)
        const hasDigit   = /[0-9]/.test(chunk)
        const hasSpecial = /[!@#$%^&*]/.test(chunk)

        if (hasLower && hasUpper && hasDigit && hasSpecial) {
            validSequenceCount++
        }
    }

    const isValid = validSequenceCount >= 1

    return {
        isValid,
        validSequenceCount,
        message: isValid
            ? `Sekvence znaků: nalezeno ${validSequenceCount} platná sekvence`
            : 'Sekvence znaků: heslo musí obsahovat malé, velké, číslo a spec. znak za sebou (okno 4 znaků)',
    }
}

export default CharacterSequenceValidator