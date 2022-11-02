import { makeAutoObservable } from "mobx";

class WindowStore {
    screenWidth: number = NaN;
    sliderCenter: number = NaN;
    imgsPositionArray: Array<number> = [];
    imgsHeightArray: Array<number> = []

    constructor() {
        makeAutoObservable(this)
    }

    setScreenWidth(screenWidth: number) {
        this.screenWidth = screenWidth
    }

    setSliderCenter(scrollParam: number) {
        this.sliderCenter = scrollParam + (this.screenWidth / 2)
        this.countHeight();
    }

    setPositionOfImage(id: number, position: number) {
        this.imgsPositionArray[id] = position;
    }

    countHeightForID(id: number) {
        if (((this.sliderCenter - this.screenWidth / 2) < this.imgsPositionArray[id]) &&
            (this.imgsPositionArray[id] < (this.sliderCenter + this.screenWidth / 2))) {
            let newImageHeight = (-(((this.imgsPositionArray[id] - this.sliderCenter) ** 2) / (((this.screenWidth / 2) / 8) ** 2)) + 100) / 100;
            if (newImageHeight > 0) {
                this.imgsHeightArray[id] = (Number(newImageHeight.toFixed(2)));
            }
            else {
                this.imgsHeightArray[id] = 0; // If img scale should be lower than 0 then set scale to 0 (just in case) 
            }
        }
        else if (this.imgsHeightArray[id] !== 0) {
            this.imgsHeightArray[id] = 0;
        }
    }

    countHeight(id?: number) {
        if (id) {
            this.countHeightForID(id)
        }
        else {
            this.imgsPositionArray.forEach((_imgPosition, imgID) => {
                this.countHeightForID(imgID)
            })
        }
    }
}

export default new WindowStore();