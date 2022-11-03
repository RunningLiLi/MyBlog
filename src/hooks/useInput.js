import { useState } from "react";
export default function useInput(initValue){
    const [value,setValue]=useState(initValue);
    return [
        {onChange:(e)=>setValue(e.target.value),value},
        (curValue)=>setValue(curValue)
    ]
}