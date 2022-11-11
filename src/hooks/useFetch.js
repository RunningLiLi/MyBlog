import {useState,useEffect} from 'react'
import request from '../utility/request.ts'
export default function useFetch(path){
    const [data,setData]=useState()
    const [err,setErr]=useState()
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        if(!path)return
        request(path)
        .then(setData)
        .then(()=>setLoading(false))
        .catch(setErr)
    },[path])
    return{
        data,
        loading,
        err
    }
}

