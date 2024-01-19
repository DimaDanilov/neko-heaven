import { useRef, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useCatStore } from "../../store/CatStore";
import { useWindowStore } from "../../store/WindowStore";
import { observer } from "mobx-react-lite";
import { ImageItem } from "./subcomponents/ImageItem";

const scrollSpeedMultiplier = 6;
const sectionPadding = 20; // Padding of the main section. Need a variable because it's calculated for needs in autoload new images

export const Slider = observer(() => {
  const catStore = useCatStore();
  const windowStore = useWindowStore();

  const divRef = useRef<HTMLDivElement>(null);

  const wheelHandler = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    if (divRef.current) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // Made cause of difference between touchpad and wheel
        divRef.current.scrollLeft += e.deltaX * scrollSpeedMultiplier;
      } else {
        divRef.current.scrollLeft += e.deltaY * scrollSpeedMultiplier;
      }
    }
  }, []);

  // Loading new images on button click (UPGRADE FEATURE LATER)
  const loadNewImages = async () => {
    await catStore.fetchImages(catStore.currentCategory, 6);
  };

  // Change of center of the scroll
  const scrollHandle = useCallback(() => {
    if (divRef.current) {
      windowStore.setSliderCenter(divRef.current.scrollLeft); // Count center of Slider again
      catStore.countScaleOfAllImages();
      // If you are in end of slider fetch new images
      if (
        Math.abs(
          windowStore.sliderCenter +
            windowStore.screenWidth / 2 -
            (divRef.current.scrollWidth + sectionPadding * 2)
        ) <=
        window.innerWidth / 8
      ) {
        loadNewImages();
      }
    }
  }, []);

  // First Initialization
  useEffect(() => {
    windowStore.setScreenWidth(window.innerWidth);
    windowStore.setSliderCenter(0);
    if (catStore.imgsArray.length === 0) {
      loadNewImages();
    }
    // Observer on resize of window
    window.addEventListener("resize", () => {
      windowStore.setScreenWidth(window.innerWidth);
      if (divRef.current) {
        windowStore.setSliderCenter(divRef.current.scrollLeft);
        catStore.countScaleOfAllImages();
      }
    });
  }, []);

  // When category change recreate slider
  useEffect(() => {
    catStore.resetCatArray();
    catStore.resetImgLoadingID();
    loadNewImages();
  }, [catStore.currentCategory]);

  return (
    <SliderContainer>
      <ImgContainer ref={divRef} onWheel={wheelHandler} onScroll={scrollHandle}>
        {/* All cat images */}
        {catStore.imgsArray.map((cat, index) => (
          <ImageItem key={cat.catInfo.url + index} cat={cat} />
        ))}
      </ImgContainer>
    </SliderContainer>
  );
});

const SliderContainer = styled.section`
  height: calc(100vh - 50px);
  padding: ${sectionPadding}px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`;
const ImgContainer = styled.div`
  padding: 0 10vw 0 35vw;
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 8%;
  height: 80%;
  &::-webkit-scrollbar {
    display: none;
  }
`;
