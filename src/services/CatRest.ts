import { ICatImage } from "../models/Cat";
import { CatAdapter } from "./CatAdapter";

export interface ICatImageArray {
    results: ICatImage[]
}

export const getCats = async (amount: number) => {
    return fetch(`https://nekos.best/api/v2/neko?amount=${amount}`)
    .then((response) => response.json())
    .then((json: ICatImageArray) => CatAdapter.transform(json.results));
}
