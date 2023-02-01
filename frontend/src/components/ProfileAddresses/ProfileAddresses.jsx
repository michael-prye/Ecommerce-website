import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const ProfileAddresses = () => {

    const [user, token] = useAuth();
    const [addresses, setAddresses] =useState([])
    const [createAddressModal, setCreateAddressModal] =useState(false)


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
            <button onClick={()=>setCreateAddressModal(true)}>Add Address</button>
            {addresses.length ? (
                <div>
                    {addresses.map((address)=>(
                <div className="account-card">
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} {address.zip_code}</p>
                    <button>edit</button>
                    <button>delete</button>
                </div>
                ))}
                    </div>
                ) :(
                    <h1>
                        NO ADDRESS
                    </h1>
                )}
                
            

        </div>
     );
}
 
export default ProfileAddresses;