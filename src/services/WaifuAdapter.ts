import { ICatImage } from "../models/Cat";

export class WaifuAdapter {
    static transform(data: any): ICatImage[] {
        return data.map((item: any) => (<ICatImage>{
            artistHref: "",
            artistName: "",
            sourceUrl: item.source,
            url: item.url
        }))
    }
}