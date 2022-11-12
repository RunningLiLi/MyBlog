import "./login.scss";
import '../../index/index.css'
import Prompt from "../../../commonComponents/prompt";
import { useRef,useState } from "react";
import { useNavigate } from "react-router";
import request from "../../../utility/request.ts";
export default function Login() {
  const form=useRef()
  const nav=useNavigate();
  const [mes,sendMes]=useState('')
  function goRegister(){
      nav('../register')
  }
  function login(e){
    e.preventDefault()
    request('/users/login',{
      method:'post',
      credentials:'include',
      body:new FormData(form.current)
    })
    .then(res=>{
      sendMes(res.mes+Math.random());
      if(res.status===200){
        setTimeout(()=>{
          nav('../notes')
        },500)
      }
    })
  }
  return (
    <>
      <div id="login-container">
       <form ref={form}>
          <div className='useName'>
            <i className='iconfont icon-yonghuming'/>userName:
            <input type='text' name='userName'></input>
          </div> 
          <div className='passWord'>
          <i className='iconfont icon-mima'/>password:
          <input type='password' name='password'></input>
          </div> 
          <div className='remember-logUp'>
            <div>自动登录<input type='checkbox' defaultChecked={false} name='autoLogin'></input></div> 
            <i className='iconfont icon-zhucehuiyuan' onClick={goRegister}></i>
          </div>
          <button onClick={login}><i className='iconfont icon-denglu'></i>sign in</button>
       </form>
      </div>
      <Prompt mes={mes} delay={1500}/>
    </>
  );
}
