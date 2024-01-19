import { ICatImage } from "../types/Cat";
import { ApiType } from "../types/Categories";
import { CatAdapter } from "./CatAdapter";

export interface ICatImageArray {
  results: ICatImage[];
}

export interface ICatWaifuArray {
  images: ICatImage[];
}

export const getNekoPictures = async (
  category: string,
  amount: number,
  api: ApiType
) => {
  if (category)
    switch (api) {
      case "neko":
        return fetch(`https://nekos.best/api/v2/${category}?amount=${amount}`)
          .then((response) => response.json())
          .then((json: ICatImageArray) =>
            CatAdapter.transform(json.results, api)
          );
      case "waifu":
        return fetch(
          `https://api.waifu.im/search/?included_tags=${category}&many=true`
        )
          .then((response) => response.json())
          .then((json: ICatWaifuArray) =>
            CatAdapter.transform(json.images.slice(0, amount), api)
          );
    }
  return [];
};
