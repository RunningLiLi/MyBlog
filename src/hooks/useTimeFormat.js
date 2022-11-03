import {useState,useEffect} from 'react'
export default function useTimeFormat(timeStamp){
    const [timeObj,setTimeObj]=useState({
        hour:Math.floor(timeStamp/1000/60/60),
        minute:Math.floor(timeStamp/1000/60%60),
        second:Math.floor(timeStamp/1000%60)
    })
    useEffect(() => {
        const id=setInterval(()=>{
           setTimeObj({
            hour:Math.floor(timeStamp/1000/60/60),
            minute:Math.floor(timeStamp/1000/60%60),
            second:Math.floor(timeStamp/1000%60)
        })
        },1000)
        return()=>{
            clearInterval(id)
        }
    }, [timeStamp])
    return timeObj
    
}