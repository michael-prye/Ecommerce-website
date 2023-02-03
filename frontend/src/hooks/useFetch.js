import React from "react";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useFetch = (url,method,formData) => {
    const [user, token] = useAuth();
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    const fetchRequest = async ()=>{
        //console.log(formData)
        try{
            const response = await fetch(url,{
                method: method,
                headers:{Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'},
                body: formData? JSON.stringify(formData) :null
            })
            .then((response)=> response.json())
            .then((data)=> setData(data))
        } catch(error){
            console.log("ERROR: ", error)
        }
        
        
        
    }



        return [data, fetchRequest]
  
}
 
export default useFetch ;