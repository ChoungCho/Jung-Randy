import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameScene from './game/GameScene';
import TestMapViewer from './game/TestMapViewer';
import MaterialTestViewer from './game/MaterialTestViewer';
import RecipesGuide from './pages/RecipesGuide';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameScene />} />
        <Route path="/test" element={<TestMapViewer />} />
        <Route path="/material-test" element={<MaterialTestViewer />} />
        <Route path="/recipes" element={<RecipesGuide />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
