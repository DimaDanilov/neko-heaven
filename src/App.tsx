import './App.css';
import { Header } from './components/Header/Header';
import { Slider } from './components/Slider/Slider';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PNG_CATEGORIES } from './models/Categories';

const categoriesRoutes = PNG_CATEGORIES.map((category, index) =>
  <Route key={category + index} path={category} element={<><Header /><Slider category={category} /></>} />
)

function App() {
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
