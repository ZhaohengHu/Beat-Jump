import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsSelecting } from '../../store/SelectingSlice'
import { setProcess } from "../../store/processSlice";
import { setBpm } from '../../store/beatSlice'
import '.././../style.css'

function ControlPannel() {
  const levelNum = useSelector((state) => state.level.levelNum);
  const isSelecting = useSelector((state) => state.selecting.isSelecting)
  const bpm = useSelector((state) => state.beat.bpm)
  const dispatch = useDispatch()
  const [isSpeedActive, setIsSpeedActive] = useState(false)


  // 构造从30-180的数组
  const bpms = Array.from({length: 151}, (v, k) => k + 30)
  function handleLinkClick(){
    dispatch(setIsSelecting(!isSelecting))
    dispatch(setProcess('waiting'))
  }

  function handleSpeedClick(){
    setIsSpeedActive(!isSpeedActive)
  }

  function handleChoosenBpm(e){
    console.log(e.target.innerHTML)
    dispatch(setBpm(Number(e.target.innerHTML)))
    setIsSpeedActive(false)
  }

  // TODO 要包含的内容
  // 1. 当前关卡
  // 2. beat速度（先设成死的，后续再补充调整的）
  // 3. 声音提示（是否开 是否关）
  return (
    <div className="control-pannel shadow">
      {isSelecting ? 
        <div className="cp-item">
          <Link to="/" onClick={handleLinkClick}>完成选择</Link>
        </div> :(
          <>
            <div className="cp-item">
              <button onClick={handleSpeedClick}>BPM{' '}{bpm} </button>
              {isSpeedActive ? (
                <ul className="speed-l ab bg-w bd-r shadow pd-1 tx-c"
                    role='listbox'>
                  {bpms.map( b => 
                    <li className="no-list-style "
                        role='option'
                        aria-selected={b === bpm}
                        key={b} 
                        onClick={handleChoosenBpm}>{b}</li>)}
                </ul>
              ):(
                <></>
              )}
            </div>

            <div className="cp-item">
              <Link to="/levels" onClick={handleLinkClick}> {`关卡${levelNum}`} </Link> 
            </div>
          </>
        )
      }
		</div>
  )
}

export default ControlPannel;