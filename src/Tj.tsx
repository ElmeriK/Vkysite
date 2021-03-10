import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TjPopup from './TjPopup'
import Modal from './Modal'





function Tj() {
    const backURL = "http://localhost:3001"
    const [showPopup, setShowPopup] = useState<Boolean>(false)
    const [tjPopupState, setTjPopupState] = useState<PopupState>("Open")
    const [tjList, setTjList] = useState<Tj[]>([])
    useEffect(() => { getTj().then(data => {setTjList(data)})}, [])

    function getTj() {
        return axios
            .get(backURL + '/api/tj')
            .then(response => response.data)
    }

    function addTj(desc: string, date: Date) {
        
        axios
            .post(backURL + '/api/tj', {desc: desc, date: date})

        var dateCurrent = new Date()
        var dateTj = new Date(date) 
        var newTjList = tjList
        newTjList.push({desc: desc, num: Math.ceil((dateTj.getTime() - dateCurrent.getTime()) / (1000 * 3600 * 24))})
        setTjList(newTjList)
    }

    const tjPopupOnClick = (event: React.MouseEvent, desc: string, date: Date) => {
        if (desc==="") {
            return
        }
        
        getTj().then(data => {
            setTjList(data)
            if (tjList.find(element => element.desc === desc)) {
                console.log("Same name: ", desc)
                setTjPopupState("Error")
            } else {
                addTj(desc, date)
                togglePopup()
            }
        })
    }

    const togglePopup = () => {
        setTjPopupState("Open")
        setShowPopup(!showPopup)
    }

    const deleteTj = (desc: string) => {
        axios.delete(backURL + '/api/tj', {data: {desc: desc}})
            .then(response => {
                var newTjList = tjList.filter(tj =>{
                            return tj.desc !== desc
                        })
                        setTjList(newTjList)

            })
        
    }


    var formattedTjList = tjList.map((tj) => 
        <li key={tj.desc}>
            {tj.desc} TJ {tj.num}
            <button className="button-small" onClick={(e) => deleteTj(tj.desc)}>Poista</button>
        </li>
    )
    return (
        <div>
            <div>
                <ul>
                    {formattedTjList}
                </ul>    
            </div>
            <div>
                {showPopup && <Modal handleClose={togglePopup} show={showPopup} children={<TjPopup onClick={tjPopupOnClick} popupState={tjPopupState} />} />}
                <button className="button" onClick = {togglePopup}>Lisää Tj</button>
            </div>
        </div>
    )
}


export default Tj