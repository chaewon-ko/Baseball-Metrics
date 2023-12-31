import './App.css';
import Header from './Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './page/HomePage';
import NotFound from './page/NotFound';
import RecordPage from './page/RecordPage';
import ComparisonPage from './page/ComparisonPage';
import ExplainPage from './page/ExplainPage';
import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { themes } from './themes';
import Selectpitcher from './components/game/selectplayer/Selectpitcher';
import Selectbatter from './components/game/selectplayer/Selectbatter';
import Game from './components/game/Game';
import Ranking from './components/game/Ranking';

function App() {

  const [currentTheme, setCurrentTheme] = useState(themes.light);

  // 테마 변경 함수
  const changeTheme = (selectedTheme) => {
    setCurrentTheme(themes[selectedTheme]);
  };

  return (
    <ThemeProvider theme = {currentTheme}>
      <div className="App">
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/record' element={<RecordPage/>}></Route>
            <Route path='/compare' element={<ComparisonPage/>}></Route>
            <Route path='/game' element={<Selectpitcher/>}></Route>
            <Route path='/game/batter' element={<Selectbatter/>}></Route>
            <Route path='/game/play' element={<Game/>}></Route>
            <Route path='/game/rank' element={<Ranking/>}></Route>
            <Route path='/explaination' element={<ExplainPage/>}></Route>
            <Route path='*' element={<NotFound/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>

  );
}

export default App;
