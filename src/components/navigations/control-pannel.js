import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsSelecting } from '../../store/SelectingSlice'

function ControlPannel() {
  const levelNum = useSelector((state) => state.game.levelNum);
  const isSelecting = useSelector((state) => state.selecting.isSelecting)
  const dispatch = useDispatch()

  function handleLinkClick(){
    dispatch(setIsSelecting(!isSelecting))
  }

  return (
    <div>
      {isSelecting ? 
        <Link to="/" onClick={handleLinkClick}>完成选择</Link> :
        <Link to="/levels" onClick={handleLinkClick}> {`关卡${levelNum}`} </Link> 
      }
		</div>
  )
}

export default ControlPannel;