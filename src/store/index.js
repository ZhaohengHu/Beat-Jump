import { configureStore } from '@reduxjs/toolkit';
import levelReducer from './levelSlice';
import selectingReducer from './SelectingSlice'
import processReducer from './processSlice'
import bpmReducer from './beatSlice'
import judgedResReducer from './judgedResSlice'
import ckpReducer from './ckpSlice'

const store = configureStore({
  reducer: {
    level: levelReducer,
    selecting: selectingReducer,
    process: processReducer,
    beat: bpmReducer,
    judgedRes: judgedResReducer,
    ckp: ckpReducer,
  },
});

export default store;


// https://juejin.cn/post/7090508915988758559 
// reduxjs/toolkit讲解