import { makeAutoObservable } from "mobx";

export interface CatImage {
    artist_href: string,
    artist_name: string,
    source_url: string,
    url: string
}

export interface CatImageArray {
    results: CatImage[];
};

class CatImagesStore {
    imagesArray: CatImage[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    // GET new images from API
    fetchImages(amount: number) {
        fetch(`https://nekos.best/api/v2/neko?amount=${amount}`)
            .then((response) => response.json())
            .then((json: CatImageArray) => {
                this.imagesArray = [...this.imagesArray, ...json.results]
            });
    }
}

export default new CatImagesStore();