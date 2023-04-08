import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import selectingReducer from './SelectingSlice'

const store = configureStore({
  reducer: {
    game: gameReducer,
    selecting: selectingReducer,
  },
});

export default store;


// https://juejin.cn/post/7090508915988758559 
// reduxjs/toolkit讲解