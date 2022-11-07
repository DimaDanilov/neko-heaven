export interface ICatImage {
    artistHref: string
    artistName: string
    sourceUrl: string
    url: string
}

export interface IImageItem {
    id: number
    catInfo: ICatImage
    position: number
    scale: number
}
