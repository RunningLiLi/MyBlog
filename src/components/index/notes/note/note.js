import './note.scss'
import '../../index.css'
import Prompt from '../../../../commonComponents/prompt';
import { useState,useRef } from 'react';
export default function Note(props){
    const {title,classes,keys,date,cover,mainPoints,id}=props;
    const [mes,sendMes]=useState('')
    const note=useRef()
    function deleteArticle(e){
        e.stopPropagation()
        fetch('http://localhost:3000/articles/deleteArticleById/'+id,{method:'get',credentials:'include'})
        .then(res=>res.json())
        .then(res=>{
            if(res.status==200){
                sendMes(res.mes+Math.random())
                note.current.hidden=true
            }else{
                sendMes(res.mes+Math.random())
            }
            
        })
      
    }
    function goArticleDetail(){
      window.open('about:blank').location.href="http://localhost:3001/#/article?id="+id
    }
    return(
        <>
        <div id='note' ref={note} onClick={goArticleDetail}> 
            <section className='left'>
                <h3>{title}</h3>
                <div className='class'>{classes}</div>
                <div className='keys'>{keys.join('-')}</div>
                <div className='date'>{new Date(date*1).toLocaleString()}</div>
                <img src={cover} alt=''></img>
            </section>
            <section className='right'>
                <ul>
                {mainPoints.map((point,k)=>point&&<li key={k}>{k+1}.{point}</li>)}
                </ul> 
            </section>
            <i className='iconfont icon-shanchu' onClick={deleteArticle}></i>
            <i className='iconfont icon-gengxin'></i>
        </div>
        <Prompt mes={mes} delay={1000}/>
        </>
    )
}