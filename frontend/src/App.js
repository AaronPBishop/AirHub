import { Route, Routes } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as sessionActions from "./store/user";

import BaseContainer from './components/BaseContainer/BaseContainer.js';
import NavBar from './components/Navigation/NavBar.js';

import './index.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(sessionActions.restoreUser()) }, []);

  return (
    <div>
      <NavBar />
      
      <Routes>
        <Route exact path='/' element={<BaseContainer />} />
      </Routes>
    </div>
  );
};

export default App;