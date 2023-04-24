import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProcess } from "../../store/processSlice";
import './process.css'

// 处理4种状态
// 1. waiting （等待开始）
// 2. ready (预备状态，节奏提示)
// 2. processing （游戏进行）
// 3. ending （结束状态）

function Wait(){
    const processState = useSelector((state) => state.process.status)
    const dispatch = useDispatch()
    useEffect(() => {
        function handleKeyDown(e) {
            if(e.repeat) return;
            if(processState === 'waiting' && e.keyCode === 32) {
                console.log("检测到空格按下");
                dispatch(setProcess('ready'))
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    })
    
    return <p>按下空格开始</p>
}

function Ready(){
    const bpm = useSelector((state) => state.beat.bpm)
    // 制造4个方块，根据设置的bpm的值来按照规定节奏逐个消失
    const readyBlocks = Array.from({length: 4}, (v, k) => k);
    const mxCount = readyBlocks.length;
    const dispatch = useDispatch()

    function changeReadyBlock(index){
        if(index >= mxCount) return;
        // 把对应的block样式设为不可见
        document.getElementsByClassName('ready-block')[index].style.visibility = 'hidden'
        console.log(index)
    }

    let counter = 1;
    useEffect(() => {
        let interval;
        const promise = new Promise((resolve, reject) =>{
            interval = setInterval(() => {
                if(counter > mxCount){
                    clearInterval(interval)
                    resolve()
                }
                // TODO: 逐个消失
                changeReadyBlock(counter - 1)
                counter += 1;
            }, 60000/bpm)
        })
        promise.then(()=>{
            console.log('endddddd1')
            dispatch(setProcess('processing'))
        })
        return () => clearInterval(interval)
    },[bpm])
    console.log('endddddd2')


    return (
        <div className="ready-blocks">
            {readyBlocks.map((num, idx) => {
                return (
                    <div 
                        className={`ready-block ${idx === 0 ? 'bg-r' : 'bg-w'}`}
                        key={idx}>
                    </div>
                )
            })}
        </div>
    )
}


export default function Process({className}) {
    const process = useSelector((state) => state.process.status)

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