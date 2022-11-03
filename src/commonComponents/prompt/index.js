import './index.scss'
import { useState,useEffect,useCallback } from 'react'
export default function ({mes,delay}){
    const [isShow,changeShow]=useState(true)
    function antiShakeFake(func,delayTime){
        let id=null;
        return ()=>{
        id&&clearTimeout(id)
        id=setTimeout(() => {
                func()
            }, delayTime);
        }
    }
    const antiShake=useCallback(antiShakeFake(()=>{changeShow(false)},delay),[])
    useEffect(()=>{
        changeShow(true)
        antiShake();
    },[mes])
    if(!isShow || !mes)return ''
    return( 
    <div className='prompt-container'>
        {mes.replace(/\d.\d+$/,'')}
    </div>
    )
}