import React from "react";
import levels from "../levels/levels";
import './rails.css'

// 构造每个音符块儿
export function Block({ note }) {
  
  return (
    <div className="block">
      <span>{note}</span>
    </div>
  )
}

export function Rail({ levelNum }){
  let notes = levels[levelNum - 1];
  // 按照notes的长度返回对应若干个Block
  return(
    <div className="rail">
      {notes.map((note, index) => 
        <Block key={index} note={note} />
      )}
    </div>
  )
}

export default function RailContainer({ className, levelNum }) {

  return (
    <div className={className}>
      <Rail levelNum={levelNum} />
      <Rail levelNum={levelNum} />
    </div>
  )
}