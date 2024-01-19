import { makeAutoObservable } from "mobx";
import React from "react";
import { ICatImage, IImageItem } from "../types/Cat";
import { categoryApiType, validApiTypes } from "../types/Categories";
import { getNekoPictures } from "../api/CatApi";
import { WindowStoreInstance } from "./WindowStore";

class CatStore {
  imgsArray: IImageItem[] = [];
  imgLoadingID = 0; // ID of image that is loading right now (or last when no images left to load)
  currentCategory = "";
  imagesAreLoading = false; // Status of img downloading. If they are already download then don't start new download

  constructor() {
    makeAutoObservable(this);
  }

  // GET new images from API
  async fetchImages(category: string, amount: number) {
    if (this.imgLoadingID === this.imgsArray.length) {
      // Start fetch if last img is downloaded
      if (!this.imagesAreLoading) {
        // Start fetch only if status is acquire to do it
        if (validApiTypes.includes(categoryApiType[this.currentCategory])) {
          this.setImagesLoadingStatus(true);
          const data = await getNekoPictures(
            category,
            amount,
            categoryApiType[this.currentCategory]
          );
          this.setImages(data);
          this.setImagesLoadingStatus(false);
        }
      }
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
          scale: 1,
        };
      })
    );
  }

  // Empty image array
  resetCatArray() {
    this.imgsArray.length = 0;
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
    if (
      WindowStoreInstance.sliderCenter - WindowStoreInstance.screenWidth <
        this.imgsArray[id].position &&
      this.imgsArray[id].position <
        WindowStoreInstance.sliderCenter + WindowStoreInstance.screenWidth
    ) {
      let newImageHeight =
        (-(
          (this.imgsArray[id].position - WindowStoreInstance.sliderCenter) **
            2 /
          (WindowStoreInstance.screenWidth / 1.5 / 8) ** 2
        ) +
          100) /
        100;
      if (newImageHeight > 0) {
        this.imgsArray[id].scale = Number(newImageHeight.toFixed(2));
      } else if (this.imgsArray[id].scale !== 0) {
        this.imgsArray[id].scale = 0; // If img scale should be lower than 0 then set scale to 0 (just in case)
      }
    } else if (this.imgsArray[id].scale !== 0) {
      this.imgsArray[id].scale = 0;
    }
  }

  // SET scale of all images
  countScaleOfAllImages() {
    this.imgsArray.forEach((_imgPosition, imgID) => {
      this.countScaleOfImage(imgID);
    });
  }

  // SET img loading ID to next (to load next image)
  incrementImgLoadingID() {
    this.imgLoadingID++;
  }

  // SET img loading ID to 0
  resetImgLoadingID() {
    this.imgLoadingID = 0;
  }

  // SET if imgs already loading status
  setImagesLoadingStatus(status: boolean) {
    this.imagesAreLoading = status;
  }
}

export const CatStoreInstance = new CatStore();
const CatStoreContext = React.createContext(CatStoreInstance);

export const useCatStore = () => {
  return React.useContext(CatStoreContext);
};

export default new CatStore();
