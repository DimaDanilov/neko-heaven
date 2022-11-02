import { makeAutoObservable } from "mobx";

export interface CatImageResponse {
    artist_href: string,
    artist_name: string,
    source_url: string,
    url: string
}

export interface CatImage extends CatImageResponse {
    id: number,
}

export interface CatImageArray {
    results: CatImageResponse[];
};

class CatStore {
    imgsArray: CatImage[] = [];
    imgLoadingID = 0; // ID of image that is loading right now (or last when no images left to load)

    constructor() {
        makeAutoObservable(this)
    }

    // GET new images from API
    fetchImages(amount: number) {
        fetch(`https://nekos.best/api/v2/neko?amount=${amount}`)
            .then((response) => response.json())
            .then((json: CatImageArray) => {
                this.imgsArray.push(...json.results.map((cat, index) => {
                    return {
                        id: this.imgsArray.length + index,
                        ...cat
                    }
                }))
            });
    }
}

export default new CatStore();