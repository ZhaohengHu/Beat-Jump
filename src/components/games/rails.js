import React, { useEffect } from "react";
import levels from "../levels/levels";
import "./rails.css";
import { useSelector } from "react-redux";

// 构造每个音符块儿
export function Block({ note }) {
  return (
    <div className="block">
      <span>{note}</span>
    </div>
  );
}

export function Pointer() {
  return <div className="pointer"></div>;
}

export function Rail({ levelNum }) {
  let notes = levels[levelNum - 1];
  const bpmState = useSelector((state) => state.beat.bpm);
  const processState = useSelector((state) => state.process.status);
  let len = notes.length;

  if (processState === "processing") {
    let pointers = document.getElementsByClassName("pointer");
    console.log("here", pointers[0]);
    pointers[0].style.visibility = 'visible';
    // 遍历pointers
    let i = 0;
    let intervalId = setInterval(()=>{
      pointers[i].style.visibility = 'hidden';
      console.log(i)
      if(i+1 >= pointers.length) {
        clearInterval(intervalId);
        return;
      }
      pointers[i+1].style.visibility = 'visible';
      // 
      i++;
    }, 60000/bpmState);
  }

  // 按照notes的长度返回对应若干个Block
  return (
    <div className="rail">
      {notes.map((note, index) => (
        <div key={index} className="block-container">
          <Pointer />
          <Block note={note} />
        </div>
      ))}
    </div>
  );
}

export default function RailContainer({ className, levelNum }) {
  return (
    <div className={className}>
      <Rail levelNum={levelNum} />
      {/* <Rail levelNum={levelNum} /> */}
    </div>
  );
}
