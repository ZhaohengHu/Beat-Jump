import React, { useState, useEffect, useRef } from "react";
import "./score-board.css";
import { useSelector } from "react-redux";
import levels from "../levels/levels";

export default function ScoreBoard({ className}) {
  // 加载关卡中的数据
  // TODO 要优化获取关卡的方式，不要一次都加塞进来
  const judgedRes = useSelector((state) => state.judgedRes.status); 
  let levelNum = useSelector((state) => state.level.levelNum);
  let level = levels[levelNum];

  let processState = useSelector((state) => state.process.status);
  if (processState === "processing") {
    console.log("In ScoreBoard", new Date().getTime());
  }

  return (
    <div className={className}>
      <div className="score-left">
        <div className="score-left-item">
          <span>97.34%</span>
          <span>准确率</span>
        </div>
        <div className="score-left-item">
          <Timer />
          <span>时间</span>
        </div>
      </div>
      <div className="score-right">
        <div className="score-right-item">
          <Gold judged={judgedRes} />
        </div>
        <div className="score-right-item">
          <Silver judged={judgedRes} />
        </div>
        <div className="score-right-item">
          <Bronze judged={judgedRes} />
        </div>
        <div className="score-right-item">
          <Iron judged={judgedRes} />
        </div>
      </div>
    </div>
  );
}

function Timer() {
  const processState = useSelector((state) => state.process.status);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer = null;
    if (processState === "processing") {
      timer = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (processState === "ending") {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [processState]);

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
  return <span>{formatTime(time)}</span>;
}


// TODO 这四个可以合并到一起
function Gold({judged}) {
  const [num, setNum] = useState(0);
  const curCkp = useSelector((state) => state.ckp.status);
  useEffect(()=>{
    if(judged === 'perfect'){
      setNum(n => n+1);
    }
  }, [judged, curCkp])
  return (
    <>
      <span>🥇</span>
      <span>{num}</span>
    </>
  );
}

function Silver({judged}) {
  const [num, setNum] = useState(0);
  const curCkp = useSelector((state) => state.ckp.status);
  console.log(`silver: ${judged}, ${curCkp}`)
  useEffect(()=>{
    if(judged === 'good'){
      setNum(n => n+1);
    }
  }, [judged, curCkp])
  return (
    <>
      <span>🥈</span>
      <span>{num}</span>
    </>
  );
}

function Bronze({judged}) {
  const [num, setNum] = useState(0);
  const curCkp = useSelector((state) => state.ckp.status);
  useEffect(()=>{
    if(judged === 'bad'){
      setNum(n => n+1);
    }
  }, [judged, curCkp])
  return (
    <>
      <span>🥉</span>
      <span>{num}</span>
    </>
  );
}

function Iron({judged}) {
  const [num, setNum] = useState(0);
  const curCkp = useSelector((state) => state.ckp.status);
  useEffect(()=>{
    if(judged === 'miss'){
      setNum(n => n+1);
    }
  }, [judged, curCkp])
  return (
    <>
      <span>🏅</span>
      <span>{num}</span>
    </>
  );
}
