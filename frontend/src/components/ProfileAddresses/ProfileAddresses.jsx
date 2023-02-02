import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Modal } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";

const ProfileAddresses = () => {

    const [user, token] = useAuth();
    //const [addresses, setAddresses] =useState([])
    const [createAddressModal, setCreateAddressModal] =useState(false)
    const [addresses,getAddress] = useFetch('http://127.0.0.1:8000/api/address/','GET',null)


    // async function getAddress(){
    //     const response = await fetch('http://127.0.0.1:8000/api/address/',{
    //         headers:{
    //             Authorization: 'Bearer ' + token
    //         }
    //     })
    //     .then((response)=> response.json())
    //     .then((data) => setAddresses(data))
    // }

    useEffect(()=>{
        getAddress();
    },[])


    return ( 
        <div>
            <button onClick={()=>setCreateAddressModal(true)}>Add Address</button>
            <Modal show={createAddressModal} onHide={()=>setCreateAddressModal(false)} centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter An address</Modal.Title>
                </Modal.Header>
            </Modal>
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