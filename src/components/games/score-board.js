import React from "react";
import "./score-board.css";
import { useSelector } from "react-redux";
import levels from "../levels/levels";  

export default function ScoreBoard({ className }) {
  // 加载关卡中的数据 
  // TODO 要优化获取关卡的方式，不要一次都加塞进来 
  let levelNum = useSelector((state) => state.level.levelNum);
  let level = levels[levelNum];

  let processState = useSelector((state) => state.process.status);
  if(processState === 'processing') {
    console.log("In ScoreBoard", new Date().getTime())
  }

  
  return (
    <div className={className}>
      <div className="score-left">
        <div className="score-left-item">
          <span>98.73%</span>
          <span>准确率</span>
        </div>
        <div className="score-left-item">
          <span>00:03</span>
          <span>时间</span>
        </div>
      </div>
      <div className="score-right">
        <div className="score-right-item">
          <span>🥇</span>
          <span>3</span>
        </div>
        <div className="score-right-item">
          <span>🥈</span>
          <span>2</span>
        </div>
        <div className="score-right-item">
          <span>🥉</span>
          <span>3</span>
        </div>
        <div className="score-right-item">
          <span>🏅</span>
          <span>0</span>
        </div>
      </div>
    </div>
  );
}
