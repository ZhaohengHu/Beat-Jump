import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLevelNum } from './store/levelSlice'
import './LevelPage.css';

import FootInfo from './components/footinfo';
import Navs from './components/navigations/navs';

function LevelPage() {
  const dispatch = useDispatch();

  const handleLevelClick = (levelNum) => {
    dispatch(setLevelNum(levelNum));
  };

  return (
    <div className='page'>
      <div className='header'>
        <Navs />
      </div>
      <div className='content'>
        <h1>选择关卡</h1>
        <ul>
          <li>
            <button onClick={() => handleLevelClick(1)}>
              关卡1
            </button>
          </li>
          <li>
            <button onClick={() => handleLevelClick(2)}>
              关卡2
            </button>
          </li>
          <li>
            <button onClick={() => handleLevelClick(3)}>
              关卡3
            </button>
          </li>
        </ul>
      </div>
      <div className='footer'>
        <FootInfo />
      </div>
    </div>
  );
}

export default LevelPage;