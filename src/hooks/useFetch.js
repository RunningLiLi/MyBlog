import {useState,useEffect} from 'react'
export default function useFetch(url){
    const [data,setData]=useState()
    const [err,setErr]=useState()
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        if(!url)return
        fetch(url)
        .then(res=>res.json())
        .then(setData)
        .then(()=>setLoading(false))
        .catch(setErr)
    },[url])
    return{
        data,
        loading,
        err
    }
}
