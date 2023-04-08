import { Route, Routes } from 'react-router-dom';

import AllRecipesContainer from './components/AllRecipes/AllRecipesContainer.js';
import NavBar from './components/Navigation/NavBar.js';

import './index.css';

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<AllRecipesContainer />} />
      </Routes>
    </div>
  );
};

export default App;