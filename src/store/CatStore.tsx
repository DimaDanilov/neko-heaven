import { makeAutoObservable } from "mobx";
import React from "react";
import { ICatImage, IImageItem } from "../models/Cat";
import { categoryApiType } from "../models/Categories";
import { getCats, getWaifu } from "../services/CatRest";
import { WindowStoreInstance } from "./WindowStore";

class CatStore {
    imgsArray: IImageItem[] = [];
    imgLoadingID = 0; // ID of image that is loading right now (or last when no images left to load)
    currentCategory = "";

    constructor() {
        makeAutoObservable(this)
    }

    // GET new images from API
    async fetchImages(category: string, amount: number) {
        if (categoryApiType[this.currentCategory] === "neko") {
            const data = await getCats(category, amount)
            this.setImages(data)
        }
        else if (categoryApiType[this.currentCategory] === "waifu") {
            const data = await getWaifu(category, amount)
            this.setImages(data)
        }
    }

    // SET new images to API
    setImages(data: ICatImage[]) {
        this.imgsArray.push(
            ...data.map((item, index) => {
                return {
                    id: this.imgsArray.length + index,
                    catInfo: item,
                    position: 0,
                    scale: 1
                }
            })
        )
    }

    // Empty image array
    resetCatArray() {
        this.imgsArray.length = 0
    }

    setCategory(category: string) {
        this.currentCategory = category;
    }

    // SET position of single image by ID
    setPositionOfImage(id: number, position: number) {
        this.imgsArray[id].position = position;
    }

    // SET scale of single image by ID
    countScaleOfImage(id: number) {
        if (((WindowStoreInstance.sliderCenter - WindowStoreInstance.screenWidth) < this.imgsArray[id].position) &&
            (this.imgsArray[id].position < (WindowStoreInstance.sliderCenter + WindowStoreInstance.screenWidth))) {
            let newImageHeight = (-(((this.imgsArray[id].position - WindowStoreInstance.sliderCenter) ** 2) / (((WindowStoreInstance.screenWidth / 2) / 8) ** 2)) + 100) / 100;
            if (newImageHeight > 0) {
                this.imgsArray[id].scale = (Number(newImageHeight.toFixed(2)));
            }
            else if (this.imgsArray[id].scale !== 0) {
                this.imgsArray[id].scale = 0; // If img scale should be lower than 0 then set scale to 0 (just in case) 
            }
        }
        else if (this.imgsArray[id].scale !== 0) {
            this.imgsArray[id].scale = 0;
        }
    }

    // SET scale of all images
    countScaleOfAllImages(id?: number) {
        if (id) {
            this.countScaleOfImage(id)
        }
        else {
            this.imgsArray.forEach((_imgPosition, imgID) => {
                this.countScaleOfImage(imgID)
            })
        }
    }

    // SET img loading ID to next (to load next image)
    incrementImgLoadingID() {
        this.imgLoadingID++
    }

    // SET img loading ID to 0
    resetImgLoadingID() {
        this.imgLoadingID = 0
    }
}

export const CatStoreInstance = new CatStore()
const CatStoreContext = React.createContext(CatStoreInstance)

export const useCatStore = () => {
    return React.useContext(CatStoreContext)
}

export default new CatStore();