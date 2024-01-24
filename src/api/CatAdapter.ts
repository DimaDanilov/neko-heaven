import type { ICatImage } from "types/Cat";
import type { ApiType } from "types/Categories";

export class CatAdapter {
  static transform(data: any, api: ApiType): ICatImage[] {
    switch (api) {
      case "neko":
        return data.map(
          (item: any) =>
            <ICatImage>{
              artistHref: item.artist_href,
              artistName: item.artist_name,
              sourceUrl: item.source_url,
              url: item.url,
            }
        );
      case "waifu.im":
        return data.map(
          (item: any) =>
            <ICatImage>{
              artistHref: "",
              artistName: "",
              sourceUrl: item.source,
              url: item.url,
            }
        );
      case "waifu.pics":
        return data.map(
          (item: any) =>
            <ICatImage>{
              artistHref: "",
              artistName: "",
              sourceUrl: item,
              url: item,
            }
        );
    }
  }
}
