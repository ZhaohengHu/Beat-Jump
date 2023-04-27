import React, { useState, useEffect } from "react";
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
          <span>97.34%</span>
          <span>准确率</span>
        </div>
        <div className="score-left-item">
          <Timer/>
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

export function Timer(){
    const processState = useSelector((state) => state.process.status);
    const [time, setTime] = useState(0);

    useEffect(()=>{
        let timer = null;
        if(processState === 'processing') {
          timer = setInterval(()=>{
              setTime(time => time+1);
          }, 1000);
        } else if(processState === 'ending') {
          clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [processState]);

    function formatTime(time) {
      const minutes = Math.floor(time/60);
      const seconds = time%60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return (
      <span>{formatTime(time)}</span>
    );
}