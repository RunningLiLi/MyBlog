import baseConfig from "../config";
export default function request(path:string,config:{headers?:{Authorization?:string},isAuth?:boolean}={isAuth:false}){
    const baseUrl=baseConfig.baseUrl;
    const auth=localStorage.getItem("auth")
    if(config.isAuth){
        if(!auth){
            alert("用户未登录")
        }else{
            config.headers.Authorization=auth;
        }
    }
    return fetch(baseUrl+path,config).then(res=>res.json())
}
