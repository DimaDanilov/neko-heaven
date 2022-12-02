import { ICatImage } from "../models/Cat";
import { CatAdapter } from "./CatAdapter";
import { WaifuAdapter } from "./WaifuAdapter";

export interface ICatImageArray {
    results: ICatImage[]
}

export interface ICatWaifuArray {
    images: ICatImage[]
}

export const getCats = async (category: string, amount: number) => {
    if (category)
        return fetch(`https://nekos.best/api/v2/${category}?amount=${amount}`)
            .then((response) => response.json())
            .then((json: ICatImageArray) => CatAdapter.transform(json.results));
    else return []
}

export const getWaifu = async (category: string, amount: number) => {
    if (category)
        return fetch(`https://api.waifu.im/search/?included_tags=${category}&many=true`)
            .then((response) => response.json())
            .then((json: ICatWaifuArray) => WaifuAdapter.transform(json.images.slice(0, amount)));
    else return []
}
