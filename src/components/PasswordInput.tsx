interface PasswordInputProps {
    password: string
    setPassword: (password: string) => void
}

function PasswordInput({ password, setPassword }: PasswordInputProps) {
    return (
        <div className="input-wrapper">
            <label className="input-label" htmlFor="password-field">
                Heslo
            </label>
            <input
                id="password-field"
                type="password"
                className="form-control password-input"
                placeholder="Zadejte heslo..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
    )
}

export default PasswordInput