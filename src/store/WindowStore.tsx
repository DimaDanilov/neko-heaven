import React from "react";
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

export const WindowStoreInstance = new WindowStore()
const WindowStoreContext = React.createContext(WindowStoreInstance)

export const useWindowStore = () => {
    return React.useContext(WindowStoreContext)
}

export default new WindowStore();