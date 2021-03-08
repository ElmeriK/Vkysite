/// <reference types="react-scripts" />
declare module '*png'
declare module '*wav'

interface Video {
    desc: string
    url: string
}

interface Tj {
    desc: string
    num: number
}

interface Food {
    content: string[]
    contentSnippet: string
    guid: string
    link: string
    title: string
}

type PopupState = "Open" | "Error" | "Loading"