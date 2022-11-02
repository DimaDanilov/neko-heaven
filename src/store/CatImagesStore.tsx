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

class CatImagesStore {
    imagesArray: CatImage[] = [];
    currentImageLoading = 0;

    constructor() {
        makeAutoObservable(this)
    }

    // GET new images from API
    fetchImages(amount: number) {
        fetch(`https://nekos.best/api/v2/neko?amount=${amount}`)
            .then((response) => response.json())
            .then((json: CatImageArray) => {
                this.imagesArray.push(...json.results.map((cat, index) => {
                    return {
                        id: this.imagesArray.length + index,
                        ...cat
                    }
                }))
            });
    }
}

export default new CatImagesStore();