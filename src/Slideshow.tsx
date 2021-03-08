import React, { useState } from "react";
    

    function Slideshow({images}: {images: string[]} ){
        const [index, setIndex] = useState(0);

        const left = () => {
            const nextIndex = index - 1;
            if (nextIndex < 0){
                setIndex(images.length - 1);
            } else {
                setIndex(nextIndex);
            }
        }

        const right = () => {
            const nextIndex = index + 1;
            if (nextIndex > images.length - 1){
                setIndex(0);
            } else {
                setIndex(nextIndex)
            }
        }

        return(
            <div>
                <div>
                    
                    <img src={images[index]} alt={index.toString()} height="400"/>
                    
                </div>
                <div>
                    <button className="button" onClick={left}>{"<"}</button>
                    <button className="button" onClick={right}>{">"}</button>
                </div>
            </div>
        )
}

export default Slideshow