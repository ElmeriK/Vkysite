import React from "react"

type Server = {
    name: string
    address: string
}

function ServerList() {
    var list: Server[] = [
        {name: "Google", address: "https://www.google.com/"}, 
        {name: "Youtube", address: "https://www.youtube.com/"}
    ]
    const formattedList =  list.map((server) => 
        <li key={server.address}>
            <p>{server.name}</p>
            <a className="App-link" href={"http://" + server.address} >{server.address}</a>
        </li>
    )

    return(
        <div>
            <ul>
                {formattedList}
            </ul>
        </div>
    )
}

export default ServerList