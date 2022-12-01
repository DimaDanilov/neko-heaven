import './App.css';
import { Header } from './components/Header/Header';
import { Slider } from './components/Slider/Slider';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PNG_CATEGORIES } from './models/Categories';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useCatStore } from './store/CatStore';

const categoriesRoutes = PNG_CATEGORIES.map((category, index) =>
  <Route key={category + index} path={category} element={<><Header /><Slider /></>} />
)

function App() {
  const catStore = useCatStore();

  const location = useLocation()

  useEffect(() => {
    if ((`/${catStore.currentCategory}` !== location.pathname) || (catStore.currentCategory === "")) {
      catStore.resetCatArray();
      catStore.resetImgLoadingID();
      catStore.setCategory(location.pathname.substring(1));
      (async () => {
        await catStore.fetchImages(catStore.currentCategory, 6);
      })()
    }
  }, [location]);

  return (
    <>
      <Routes>
        {categoriesRoutes}
        <Route path="*" element={<Navigate to={PNG_CATEGORIES[0]} />} />
      </Routes>
    </>
  );
}

export default App;
