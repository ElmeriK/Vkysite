import React, { useState } from "react";

function VideoPlaylist({videos}: {videos: Video[]}) {
    const [index, setIndex] = useState(0);

        const left = () => {
            const nextIndex = index - 1;
            if (nextIndex < 0){
                setIndex(videos.length - 1);
            } else {
                setIndex(nextIndex);
            }
        }

        const right = () => {
            const nextIndex = index + 1;
            if (nextIndex > videos.length - 1){
                setIndex(0);
            } else {
                setIndex(nextIndex)
            }
        }

    return (
        <div>
            <p>{videos[index].desc}</p>
            
            <iframe title={videos[index].desc} width="420" height="315" src={videos[index].url}></iframe>
            <div>
                <button className="button" onClick={left}>{"<"}</button>
                <button className="button" onClick={right}>{">"}</button>
            </div>
        </div>
    
    )
}

export default VideoPlaylist