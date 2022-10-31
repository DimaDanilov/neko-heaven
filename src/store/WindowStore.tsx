import { makeAutoObservable } from "mobx";

class WindowStore {
    screenWidth: number = NaN;
    sliderCenter: number = NaN;

    constructor() {
        makeAutoObservable(this)
    }

    setScreenWidth(screenWidth: number) {
        this.screenWidth = screenWidth
    }
    setSliderCenter(scrollParam: number) {
        this.sliderCenter = scrollParam + (this.screenWidth / 2)
    }
}

export default new WindowStore();