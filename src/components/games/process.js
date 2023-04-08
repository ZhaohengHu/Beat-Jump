import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProcess } from "../../store/processSlice";


// 处理4种状态
// 1. waiting （等待开始）
// 2. ready (预备状态，节奏提示)
// 2. processing （游戏进行）
// 3. ending （结束状态）

function Wait(){
    const dispatch = useDispatch()
    useEffect(() => {
        document.onkeydown = (e) => {
            if(e.keyCode === 32){
                dispatch(setProcess('ready'))
            }
        }
    })
    
    return <p>按下空格开始</p>
}

function Ready(){
    const bpm = useSelector((state) => state.beat.bpm)
    // 制造4个方块，根据beat的值来按照规定节奏闪烁并逐个消失
    

    return <p>ready状态</p>
}


export default function Process({className}) {
    const process = useSelector((state) => state.process.status)
    console.log(process)

    let componentToRender;
    switch(process){
        case 'waiting':
            componentToRender = (
                <div className="game-tip">
                    <Wait />
                </div>
            )
            break;
        case 'ready':
            componentToRender = (
                <div className="game-tip">
                    <Ready />
                </div>
            )
            break;
        case 'processing':
            componentToRender = (
                <div className="game-tip">
                    <p>processing状态</p>
                </div>
            )
            break;
        case 'ending':
            componentToRender = (
                <div className="game-tip">
                    <p>ending状态</p>
                </div>
            )
            break;
        default:
            componentToRender = (
                <div className="game-tip">
                    
                </div>
            )
    }
    return (
        // 根据状态不同，返回四种不同组件
        <div className={className}>
            {componentToRender}
        </div>
    )
}