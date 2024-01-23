import "./App.css";
import { Header } from "components/common/Header/Header";
import { Slider } from "components/Slider/Slider";
import { Routes, Route, Navigate } from "react-router-dom";
import { categoryApiType, CAT_CATEGORIES } from "types/Categories";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useCatStore } from "store/CatStore";
import { Analytics } from "@vercel/analytics/react";

const categoriesRoutes = Object.keys(categoryApiType).map((category, index) => (
  <Route
    key={category + index}
    path={category}
    element={
      <>
        <Header />
        <Slider />
      </>
    }
  />
));

function App() {
  const catStore = useCatStore();
  const location = useLocation();

  useEffect(() => {
    if (
      `/${catStore.currentCategory}` !== location.pathname ||
      catStore.currentCategory === ""
    ) {
      catStore.setCategory(location.pathname.substring(1));
    }
  }, [location]);

  return (
    <>
      <Routes>
        {categoriesRoutes}
        <Route path="*" element={<Navigate to={CAT_CATEGORIES[0]} />} />
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
