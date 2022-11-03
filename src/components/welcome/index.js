import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import useTimeFormat from '../../hooks/useTimeFormat.js'
import './index.scss'
export default function Welcome(){
    const navigate=useNavigate()
    const [opacity,setOpacity]=useState(0)
    const [timeStamp,setTimeStamp]=useState(Date.now()-new Date(2022,8,20,23,30))
    const {hour,minute,second}=useTimeFormat(timeStamp)
    const resource=['earth.png','mars.png','moon.png','Rocket.webp','spaceman.webp','spacestation.png','star.webp','Start_Up.webp','ufo.png']
    function goIndex(){
        navigate('/index/notes')
    }
    useEffect(()=>{
       const id1=setInterval(()=>{
        setOpacity((pre)=>pre<1?pre+0.1:0)
       },200) 
       const id2=setInterval(()=>{
        setTimeStamp(Date.now()-new Date(2022,8,20,23,30))
       },1000)
       return ()=>{
           clearInterval(id2)
           clearInterval(id1)
       }
    },[timeStamp])
    return (
        <>
        <div id='welcome-container' onClick={goIndex}>
            <h2 style={{opacity}} className='tip'>点击任意位置跳转</h2>
            <div className='intro'>
                <img src={require('../../resource/favicon.png')} alt='logo'></img>
                <h1>Running-LiLi</h1>
                <h3>建站时长:{hour}时{minute}分{second}秒</h3>
                <h3>建站日期:2022-9-20 11:30</h3>
                <h3>访问数:33</h3>
                {
                    resource.map((src,key)=><img key={key} src={require(`../../resource/${src}`)} alt={src.split('.')[0]}></img>)
                }
            </div>  
            
        </div>
        </>
    )
}