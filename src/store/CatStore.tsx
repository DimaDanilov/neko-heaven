import { makeAutoObservable, runInAction } from "mobx";

export interface ICatImageResponse {
    artist_href: string,
    artist_name: string,
    source_url: string,
    url: string
}

export interface ICatImage extends ICatImageResponse {
    id: number,
}

export interface ICatImageArray {
    results: ICatImageResponse[];
};

class CatStore {
    imgsArray: ICatImage[] = [];
    imgLoadingID = 0; // ID of image that is loading right now (or last when no images left to load)

    constructor() {
        makeAutoObservable(this)
    }

    // GET new images from API
    fetchImages(amount: number) {
        fetch(`https://nekos.best/api/v2/neko?amount=${amount}`)
            .then((response) => response.json())
            .then((json: ICatImageArray) => {
                runInAction(() => {
                    this.imgsArray.push(...json.results.map((cat, index) => {
                        return {
                            id: this.imgsArray.length + index,
                            ...cat
                        }
                    }))
                })
            });
    }

    incrementImgLoadingID = () => this.imgLoadingID++
    decrementImgLoadingID = () => this.imgLoadingID--
}

export default new CatStore();