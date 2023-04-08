import React from 'react';
import  Navs  from './components/navigations/navs';
import levels from './components/levels/levels';
import Process from './components/games/process';
import RailContainer from './components/games/rails';
import ScoreBoard from './components/games/score-board';
import FootInfo from './components/footinfo'
import { useSelector } from 'react-redux';
import './GamePage.css'

function GamePage() {
  const levelNum = useSelector((state) => state.level.levelNum);
  
  return (
    <div className='page'>
      <div className='header'>
        <Navs />
      </div>
      <div className='content'>
        <Process className='game-p'/>
        <RailContainer className='game-r' levelNum={levelNum}/>
        <ScoreBoard className='game-s'/>  
      </div>
      <div className='footer'>
        <FootInfo />
      </div>
    </div>
  );
}

export default GamePage;
