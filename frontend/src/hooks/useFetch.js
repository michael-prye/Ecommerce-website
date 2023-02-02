import React from "react";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useFetch = (url,method,formData) => {
    const [user, token] = useAuth();
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    const fetchRequest = async ()=>{
        if (method == 'GET'){
            const response = await fetch(url,{
                headers:{Authorization: 'Bearer ' + token}
            })
            .then((response)=> response.json())
            .then((data)=> setData(data))
        }
        
    }



        return [data, fetchRequest, data]
  
}
 
export default useFetch ;