import './index.scss'
import './index.css'
import {useState,useEffect} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import Background from'../../commonComponents/background/index.js'
import {Outlet} from 'react-router-dom'
export default()=>{
    const nav=useNavigate()
    const locationObj=useLocation()
    const [length,changeLength]=useState(0);
    const [flash,setFlash]=useState('');
    const [navs,setNavs]=useState(['Welcome','Notes','Cards','Achievement','Login','Mine']);
    useEffect(()=>{
        const id=setInterval(()=>{
            if(length===7)return;
            changeLength(pre=>++pre)
        },200)
        const id2=setInterval(()=>{
            if(length===7){
                setFlash(flash?'':'_')
            }
        },400)
        return()=>{
            clearInterval(id)
            clearInterval(id2)
        }
    },[flash,length])
    function changeRouter(tip){
        nav(tip.toLowerCase());
    }
    return(
      <>
        <nav id='index-nav'>
            <div className='logo-container'>
                <h3>{'斩钉截铁的梦想'.slice(0,length)}{flash}</h3>
            </div>
            <ul>
            {navs.map(tip=>(
                <li key={tip} onClick={()=>changeRouter(tip)} className={tip.toLowerCase()==locationObj.pathname.match(/\w+$/)[0]?'highlight':''}>{tip}</li>
            ))}
            </ul>  
            <i className={'iconfont icon-sousuo'}/>
        </nav>
        <div className='router-container' style={{width:locationObj.pathname.match(/\w+$/)[0]==='cards'?"60%":700}}>
            <Outlet/>
        </div>
        <Background/>
      </>
    )
}