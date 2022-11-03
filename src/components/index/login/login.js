import "./login.scss";
import '../../index/index.css'
import Prompt from "../../../commonComponents/prompt";
import { useRef,useState } from "react";
import { useNavigate } from "react-router";
export default function Login() {
  const form=useRef()
  const nav=useNavigate();
  const [mes,sendMes]=useState('')
  function goRegister(){
      nav('../register')
  }
  function login(e){
    e.preventDefault()
    fetch('http://localhost:3000/users/login',{
      method:'post',
      credentials:'include',
      body:new FormData(form.current)
    }).then(res=>res.json())
    .then(res=>sendMes(res.mes+Math.random()))
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
