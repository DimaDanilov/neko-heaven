import { makeAutoObservable, toJS } from "mobx";
import React from "react";
import { ICatImage, IImageItem } from "../models/Cat";
import { getCats } from "../services/CatRest";
import { WindowStoreInstance } from "./WindowStore";

class CatStore {
    imgsArray: IImageItem[] = [];
    imgLoadingID = 0; // ID of image that is loading right now (or last when no images left to load)

    constructor() {
        makeAutoObservable(this)
    }

    // GET new images from API
    async fetchImages(amount: number) {
        const data = await getCats(amount)
        this.setImages(data)
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

    // SET position of single image by ID
    setPositionOfImage(id: number, position: number) {
        this.imgsArray[id].position = position;
    }

    // SET scale of single image by ID
    countScaleOfImage(id: number) {
        if (((WindowStoreInstance.sliderCenter - WindowStoreInstance.screenWidth / 2) < this.imgsArray[id].position) &&
            (this.imgsArray[id].position < (WindowStoreInstance.sliderCenter + WindowStoreInstance.screenWidth / 2))) {
            let newImageHeight = (-(((this.imgsArray[id].position - WindowStoreInstance.sliderCenter) ** 2) / (((WindowStoreInstance.screenWidth / 2) / 8) ** 2)) + 100) / 100;
            if (newImageHeight > 0) {
                this.imgsArray[id].scale = (Number(newImageHeight.toFixed(2)));
            }
            else {
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
}

export const CatStoreInstance = new CatStore()
const CatStoreContext = React.createContext(CatStoreInstance)

export const useCatStore = () => {
    return React.useContext(CatStoreContext)
}

export default new CatStore();