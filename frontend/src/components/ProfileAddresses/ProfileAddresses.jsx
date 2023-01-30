import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const ProfileAddresses = () => {

    const [user, token] = useAuth();
    const [addresses, setAddresses] =useState(null)


    async function getAddress(){
        const response = await fetch('http://127.0.0.1:8000/api/address/',{
            headers:{
                Authorization: 'Bearer ' + token
            }
        })
        .then((response)=> response.json())
        .then((data) => setAddresses(data), )
    }

    useEffect(()=>{
        getAddress();
    }, [])

    return ( 
        <div>
            <div className="addresses">
                {addresses.map((address)=>(
                    <h1>{address.street}</h1>
                ))}
            </div>

        </div>
     );
}
 
export default ProfileAddresses;