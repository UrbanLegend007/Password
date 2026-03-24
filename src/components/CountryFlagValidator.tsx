import { useState, useEffect } from 'react'

const countries = [
    "AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AS","AT","AU","AW","AX","AZ",
    "BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS",
    "BT","BV","BW","BY","BZ","CA","CC","CD","CF","CG","CH","CI","CK","CL","CM","CN",
    "CO","CR","CU","CV","CW","CX","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE",
    "EG","EH","ER","ES","ET","FI","FJ","FK","FM","FO","FR","GA","GB","GD","GE","GF",
    "GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY","HK","HM",
    "HN","HR","HT","HU","ID","IE","IL","IM","IN","IO","IQ","IR","IS","IT","JE","JM",
    "JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KY","KZ","LA","LB","LC",
    "LI","LK","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MF","MG","MH","MK",
    "ML","MM","MN","MO","MP","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ","NA",
    "NC","NE","NF","NG","NI","NL","NO","NP","NR","NU","NZ","OM","PA","PE","PF","PG",
    "PH","PK","PL","PM","PN","PR","PS","PT","PW","PY","QA","RE","RO","RS","RU","RW",
    "SA","SB","SC","SD","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS",
    "ST","SV","SX","SY","SZ","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO",
    "TR","TT","TV","TW","TZ","UA","UG","UM","US","UY","UZ","VA","VC","VE","VG","VI",
    "VN","VU","WF","WS","YE","YT","ZA","ZM","ZW"
]

interface CountryFlagValidatorProps {
    password: string
}

function CountryFlagValidator({ password }: CountryFlagValidatorProps) {
    const [selectedCountry] = useState<string>(
        () => countries[Math.floor(Math.random() * countries.length)]
    )

    const [flagUrl, setFlagUrl]   = useState<string>('')
    const [loading, setLoading]   = useState<boolean>(true)
    const [error, setError]       = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        setError(false)

        const url = `https://flagcdn.com/w80/${selectedCountry.toLowerCase()}.png`
        const img = new Image()
        img.src = url
        img.onload  = () => { setFlagUrl(url); setLoading(false) }
        img.onerror = () => { setError(true);  setLoading(false) }
    }, [selectedCountry])

    const isValid = password.toUpperCase().includes(selectedCountry.toUpperCase())

    return (
        <div className={`sequence-validator ${isValid ? 'valid' : 'invalid'}`}>
            <span className="criterion-icon">{isValid ? '✅' : '⬜'}</span>

            <div className="flag-validator-content">
                {loading && <span className="flag-loading">Načítám vlajku…</span>}
                {!loading && !error && (
                    <img
                        src={flagUrl}
                        alt="Vlajka státu"
                        className="flag-image"
                    />
                )}
                {error && <span className="flag-error">⚠️</span>}

                <span className="flag-message">
          {isValid
              ? `Správně! Zkratka země je: ${selectedCountry} ✓`
              : `Heslo musí obsahovat zkratku této země`
          }
        </span>
            </div>
        </div>
    )
}

export default CountryFlagValidator