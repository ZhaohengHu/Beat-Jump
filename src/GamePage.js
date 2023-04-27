import React from "react";
import Navs from "./components/navigations/navs";
import levels from "./components/levels/levels";
import Process from "./components/games/process";
import RailContainer from "./components/games/rails";
import ScoreBoard from "./components/games/score-board";
import FootInfo from "./components/footinfo";
import { useDispatch, useSelector } from "react-redux";
import "./GamePage.css";
import { setProcess } from "./store/processSlice";

// 1. waiting （等待开始）
// 2. ready (预备状态，节奏提示)
// 2. processing （游戏进行）
// 3. ending （结束状态）

// 这样设计应该是有overlap的，但是好像有overlap也没啥问题，因为curJudge可以规定只判定一个
const PERFECTGAP = 50;
const GOODGAP = 100;
const BADGAP = 150;

function GamePage() {
  const levelNum = useSelector((state) => state.level.levelNum);
  const bpm = useSelector((state) => state.beat.bpm);
  const levelArr = levels[levelNum - 1];
  const processState = useSelector((state) => state.process.status);
  const beattime = 60000 / bpm;
  const ckpNum = levelArr.reduce((acc, cur) => acc + cur);
  const dispatch = useDispatch();
  console.log(`一共${ckpNum}个检查点`);

  let timemap = parseTimeCheckpoint(levelArr, beattime);
  let judeged = new Array(ckpNum).fill(false);
  let curJudge = 0;
  console.log(`timemap: ${JSON.stringify(timemap)}`);

  let start;
  function handleKeyDown(e) {
    if(curJudge >= ckpNum) return;
    if (e.repeat) return;
    let elapsed = parseInt(performance.now() - start);
    console.log(`按下${e.key}的时间点是${elapsed}，目前判断的是${curJudge}点`);

    // 判断elapsed的时间是否在timemap[curJudge]的区间内，
    // 如果在timemap[curJudge][0]和timemap[curJudge][1]之间，那么就是bad
    // 如果在timemap[curJudge][2]和timemap[curJudge][3]之间，那么就是good
    // 如果在timemap[curJudge][4]和timemap[curJudge][5]之间，那么就是perfect
    // 时间序列其实是 [0]-[2]-[4]-[5]-[3]-[1]，所以bad,good,perfect的判定区间是不连续的
    if(elapsed > timemap[curJudge][0] && elapsed < timemap[curJudge][2] || elapsed > timemap[curJudge][3] && elapsed < timemap[curJudge][1]) {
      console.log(`第${curJudge}个拍点bad`);
      judeged[curJudge] = true;
      return;
    } 

    if(elapsed > timemap[curJudge][2] && elapsed < timemap[curJudge][4] || elapsed > timemap[curJudge][5] && elapsed < timemap[curJudge][3]) {
      console.log(`第${curJudge}个拍点good`);
      judeged[curJudge] = true;
      return;
    }

    if(elapsed > timemap[curJudge][4] && elapsed < timemap[curJudge][5]) {
      console.log(`第${curJudge}个拍点perfect`);
      judeged[curJudge] = true;
      return;
    }
  }

  function step(timestamp) {
    if (start === undefined) {
      start = timestamp;
    }
    let elapsed = parseInt(timestamp - start);
    // 计时结束的地方，改变游戏状态
    if (elapsed > 1000 * levelArr.length) {
      window.cancelAnimationFrame(step);
      document.removeEventListener("keydown", handleKeyDown);
      dispatch(setProcess('ending'))
      return;
    }
    if (curJudge < ckpNum) {
      if (elapsed > timemap[curJudge][1]) {
        if (judeged[curJudge] === false) {
          console.log(
            `第${curJudge}个音符块miss, miss时间是${timemap[curJudge][1]}`
          );
        }
        console.log(
          `结束第${curJudge}个块的判定，判定区间为${timemap[curJudge][0]}-${timemap[curJudge][1]}`
        );
        curJudge++;
      }
    }
    window.requestAnimationFrame(step);
  }

  if (processState === "processing") {
    window.requestAnimationFrame(step);
    document.addEventListener("keydown", handleKeyDown);
  }
  return (
    <div className="page">
      <div className="header">
        <Navs />
      </div>
      <div className="content">
        <Process className="game-p" />
        <RailContainer className="game-r" levelNum={levelNum} />
        <ScoreBoard className="game-s" />
      </div>
      <div className="footer">
        <FootInfo />
      </div>
    </div>
  );
}

// TODO 这里会不会一直重新计算啊，随着GamePage组件刷新的话，拿到外面？
function parseTimeCheckpoint(arr, beattime) {
  const timemap = {};
  console.log(`arr = ${arr}`);
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    let subBeattime = beattime / arr[i];
    for (let j = 0; j < arr[i]; j++) {
      let cur = count++;
      let basetime = i * beattime;
      let minitime = j * subBeattime;
      let exacttime = basetime + minitime;
      console.log(`cur = ${cur}, exacttime = ${exacttime}`);
      timemap[cur] = [].concat(
        [exacttime - BADGAP, exacttime + BADGAP],
        [exacttime - GOODGAP, exacttime + GOODGAP],
        [exacttime - PERFECTGAP, exacttime + PERFECTGAP]
      );
    }
  }
  return timemap;
}

export default GamePage;
