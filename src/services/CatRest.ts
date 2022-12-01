import { ICatImage } from "../models/Cat";
import { CatAdapter } from "./CatAdapter";

export interface ICatImageArray {
    results: ICatImage[]
}

export const getCats = async (category: string, amount: number) => {
    if (category)
        return fetch(`https://nekos.best/api/v2/${category}?amount=${amount}`)
            .then((response) => response.json())
            .then((json: ICatImageArray) => CatAdapter.transform(json.results));
    else return []
}
