import React from "react";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useFetch = (url,method,formData) => {
    const [user, token] = useAuth();
    const [data, setData] = useState([])
    const [error, setError] = useState(null)


    const fetchRequest = async (id)=>{
        let finalUrl = ""
        if (id){
            finalUrl = url.concat("?id=",id)
        }else{
            finalUrl = url
        }
        console.log(finalUrl)


        const response = await fetch(finalUrl,{
            method: method,
            headers:{Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'},
            body: formData? JSON.stringify(formData) :null
            })
            .then((response)=>  response.json())
            .then((data)=>setData(data)
             )


    }



        return [data, fetchRequest]
  
}
 
export default useFetch ;