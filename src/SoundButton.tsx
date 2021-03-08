import React from 'react'
import audio from './assets/shotgunfire.wav'

function SoundButton() {
    const playSound = () => {
        
        var sound = new Audio(audio)
        sound.play()
    }

    return(
        <div>
            <button className="button" onClick={playSound}>{"Laukaus"}</button>
        </div>
         )
}

export default SoundButton