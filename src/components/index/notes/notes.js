import './notes.scss'
import Note from './note/note.js'
import '../index.css'
import Fetch from '../../../commonComponents/fetch'
// import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import useInput from '../../../hooks/useInput'
import request from '../../../utility/request.ts'
import baseData from "../../../config"
export default function Notes(){
    // const nav= useNavigate()
    const [classes,setClasses]=useState([])
    const [typeAt]=useInput('All')
    const [basisAt]=useInput('Date')
    const [isAscending,changeAs]=useState(false)
    function goEdit(){
        window.open('about:blank').location.href=baseData.host+"/#/editor"
    } 
    function changeOrder(e){
        e.target.classList.toggle('icon-shengxu')
        e.target.classList.toggle('icon-jiangxu')
        changeAs(!isAscending);
    }
    function order(pre,next){
        return isAscending?pre[basisAt.value.toLowerCase()]-next[basisAt.value.toLowerCase()]
        :next[basisAt.value.toLowerCase()]-pre[basisAt.value.toLowerCase()]
    }
    useEffect(()=>{
        request('/articles/getAllClasses')
        .then(res=>{
            res.map(v=>{
                if(!classes.includes(v.classes)){
                    classes.push(v.classes)
                }
            })
            setClasses([...classes])
        })
    },[])
    
    return (
        <Fetch renderSuccess={renderSuccess} url={`/articles/getAllArticles/${typeAt.value}`}/>
    )
    function renderSuccess(data) {
        return(
        <div id='notes-container'>
            <header className='notes-header'>
                <div className='classes-sort'>
                    <i className='iconfont icon-fenlei'></i>
                    <select className='classes' {...typeAt}>
                        <option>All</option>
                        {classes.map((v,k)=>v?<option key={k}>{v}</option>:"")}
                    </select>
                    <i className='iconfont icon-shengxu' onClick={changeOrder}></i>
                    <select className='sort' {...basisAt}>
                        <option>Date</option>
                        <option>Stars</option>
                        <option>Font</option>
                    </select>
                </div>
                <i className='iconfont icon-bianjimoban' onClick={goEdit}></i>
            </header>
            <section className='body'>
                {data.sort(order).map(data=><Note key={data.id} {...data}></Note>)}
            </section>
        </div>    
        )    
    }
}