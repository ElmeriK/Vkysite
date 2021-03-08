import React from "react"
import { useState } from "react"

type TjAddHandler = {
    (e: React.MouseEvent, desc: string, date: Date): void
}

function TjPopup ({onClick, popupState}: {onClick: TjAddHandler , popupState: PopupState}) {
    const [tjDesc, setTjDesc] = useState<string>("")
    const [tjDate, setTjDate] = useState<Date>(new Date())


    function handelDescChange (e: React.ChangeEvent<HTMLInputElement>) {
        setTjDesc(e.target.value)
    }

    function handelDateChange (e: React.ChangeEvent<HTMLInputElement>) {
        setTjDate(new Date(e.target.value))
    }

    return (
        <div className = "TjPopup">
            <p>Lisää uusi TJ</p>
            <label htmlFor = "date">Päivämäärä: </label>
            <input type = "date" id = "date" onChange={handelDateChange} name = "date" /><br></br>
            <label htmlFor ="desc">Kuvaus: </label>
            <input type = "text" id = "desc" onChange={handelDescChange} name = "desc" /><br></br>
            {(popupState === "Error") && <div>Kuvaus on jo käytössä</div> }
            <button onClick={(e) => onClick(e, tjDesc, tjDate)}>Lisää Tj</button>
        </div>
    )
}

export default TjPopup