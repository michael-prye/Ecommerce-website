import React from "react";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useFetch = (url,method,formData) => {
    const [user, token] = useAuth();
    const [data, setData] = useState([])
    const [error, setError] = useState(null)


    const fetchRequest = async (id,image)=>{
        let finalUrl = ""
        const imageData = new FormData()
        if (id){
            finalUrl = url.concat("?id=",id)
        }else{
            finalUrl = url
        }
        console.log(finalUrl)
        if(image){
            imageData.append('name', formData.name)
            imageData.append('image', formData.image)
            imageData.append('default', formData.default)
            console.log('formdata appended')
            
        }
        if(method=="DELETE"){ // if else statement to handle if request returns a body of json text
            const response = await fetch(finalUrl,{
                method: method,
                headers:{Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'},
                body: formData? JSON.stringify(formData) :null
                })
                .then((response)=>  response.text())
                .then((data)=>setData((data))
                 )
        }else if (image){
            const response = await fetch(finalUrl,{
                method: method,
                headers:{Authorization: 'Bearer ' + token},
                body: imageData
                })
                .then((response)=>  response.text())
                .then((data)=>setData((data))
                 )
        }else{
            const response = await fetch(finalUrl,{
                method: method,
                headers:{Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'},
                body: formData? JSON.stringify(formData) :null
                })
                .then((response)=>  response.json())
                .then((data)=>setData((data))
                 )

        }

        


    }



        return [data, fetchRequest]
  
}
 
export default useFetch ;