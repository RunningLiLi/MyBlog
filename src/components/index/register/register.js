import "./register.scss";
import { useState } from "react";
import Prompt from "../../../commonComponents/prompt";
import useInput from "../../../hooks/useInput";
import { useNavigate } from "react-router";
import request from "../../../utility/request.ts";
export default () => {
  const [verificationCode, setVerificationCode] = useState(
    Array.apply(null, Array("", "", "", ""))
  );
  const [mes, sendMes] = useState("");
  const [nameObj] = useInput("");
  const [passwordObj] = useInput("");
  const [emailObj] = useInput("");
  const nav=useNavigate()
  function inputHandler(e) {
    verificationCode.map(
      (v, k) => (verificationCode[k] = e.target.value.split("")[k] ?? "")
    );
    setVerificationCode([...verificationCode]);
  }
  function sendVerificationCode(e) {
    e.preventDefault();
    if (emailObj.value && emailObj.value.includes("@")) {
      request("/users/sendverificationCode", {
        method: "post",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          email: emailObj.value,
        }),
      })
        .then((res)=>{sendMes(res.mes + Math.random());});
    } else {
      sendMes("请填入正确的邮箱" + Math.random());
    }
  }
  function submit(e) {
    e.preventDefault();
    if (
      passwordObj.value &&
      nameObj.value &&
      verificationCode &&
      emailObj.value
    ) {
      request("/users/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          password: passwordObj.value,
          name: nameObj.value,
          verificationCode: verificationCode.join(""),
          email: emailObj.value,
        }),
      })
        .then((res)=>{
          if(res.status===200){
            setTimeout(() => {
              nav('../login')
            }, 500);
          }
          sendMes(res.mes + Math.random()
          )});
    } else {
      sendMes("请完善信息" + Math.random());
    }
  }
  return (
    <>
      <div id="register-container">
        <form>
          <div className="useName">
            <i className="iconfont icon-yonghuming" />
            userName:
            <input type="text" name="userName" required {...nameObj} maxLength='8' minLength='2'></input>
          </div>
          <div className="passWord">
            <i className="iconfont icon-mima" />
            password:
            <input
              type="password"
              name="password"
              required
              maxLength='20'
              minLength='11'
              {...passwordObj}
            ></input>
          </div>
          <div className="telephone">
            <i className="iconfont icon-email-fill" />
            <input type="text" {...emailObj} name="email" required></input>
            <div className="verificationCode">
              <input
                className="fakeInput"
                onChange={inputHandler}
                maxLength="4"
              ></input>
              {verificationCode.map((v, k) => {
                return (
                  <input
                    key={k}
                    value={v}
                    className="codeInput"
                    onChange={() => {}}
                  ></input>
                );
              })}
            </div>
            <button onClick={sendVerificationCode}>Send</button>
          </div>
          <button className="submit" onClick={submit}>
            <i className="iconfont icon-denglu"></i>sign up
          </button>
        </form>
      </div>
      <Prompt mes={mes} delay={1500}></Prompt>
    </>
  );
};
