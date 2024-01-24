import type { ICatImage } from "types/Cat";
import type { ApiType } from "types/Categories";
import { CatAdapter } from "api/CatAdapter";
import axios from "axios";

export interface ICatImageArray {
  results: ICatImage[];
}

export interface ICatWaifuImArray {
  images: ICatImage[];
}

export interface ICatWaifuPicsArray {
  files: ICatImage[];
}

export const getNekoPictures = async (
  category: string,
  amount: number,
  api: ApiType
) => {
  if (category)
    switch (api) {
      case "neko":
        try {
          const response = await axios.get<ICatImageArray>(
            `https://nekos.best/api/v2/${category}`,
            { params: { amount } }
          );
          return CatAdapter.transform(response.data.results, api);
        } catch (error) {
          console.error("Error fetching data from neko API", error);
          return [];
        }
      case "waifu.im":
        try {
          const response = await axios.get<ICatWaifuImArray>(
            `https://api.waifu.im/search`,
            { params: { included_tags: category, many: true } }
          );
          return CatAdapter.transform(
            response.data.images.slice(0, amount),
            api
          );
        } catch (error) {
          console.error("Error fetching data from waifu.im API", error);
          return [];
        }
      case "waifu.pics":
        try {
          const response = await axios.post<ICatWaifuPicsArray>(
            `https://api.waifu.pics/many/sfw/${category}`,
            { exclude: [] }
          );
          return CatAdapter.transform(
            response.data.files.slice(0, amount),
            api
          );
        } catch (error) {
          console.error("Error fetching data from waifu.im API", error);
          return [];
        }
    }
  return [];
};
