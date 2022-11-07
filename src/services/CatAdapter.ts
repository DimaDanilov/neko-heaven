import { ICatImage } from "../models/Cat";

export class CatAdapter {
    static transform(data: any): ICatImage[] {
        return data.map((item: any) => (<ICatImage>{
            artistHref: item.artist_href,
            artistName: item.artist_name,
            sourceUrl: item.source_url,
            url: item.url
        }))
    }
}