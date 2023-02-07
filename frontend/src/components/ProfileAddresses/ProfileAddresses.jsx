import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Modal } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";

const ProfileAddresses = () => {

    const [user, token] = useAuth();
    const [createAddressModal, setCreateAddressModal] =useState(false)
    const defaultAddress = {street: "", city: "", state: "", zip_code:null}
    const [addressForm, setAddressForm] = useState(defaultAddress)
    const [addresses,getAddress] = useFetch('http://127.0.0.1:8000/api/address/','GET',null)
    const [data, sendPostAddress] = useFetch('http://127.0.0.1:8000/api/address/', 'POST', addressForm)




    useEffect(()=>{
        
        getAddress();
    },[])

    const handleInputChange = (e)=>{
        e.persist();
        setAddressForm({...addressForm, [e.target.name]: e.target.value})
        //console.log(addressForm)
    }
 
    const handleClose=()=>{
        setCreateAddressModal(false)
        setAddressForm(defaultAddress)
    }
    const handlePost= async()=>{

        await sendPostAddress();
        await getAddress();
        handleClose();
    }


    return ( 
        <div>
            <button onClick={()=>setCreateAddressModal(true)}>Add Address</button>
            

            <Modal show={createAddressModal} onHide={handleClose} centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter An address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="address-form">
                        <label>
                            Street:{" "}
                            <input
                            type="text"
                            name="street"
                            value={addressForm.street}
                            onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            City:{" "}
                            <input
                            type="text"
                            name="city"
                            value={addressForm.city}
                            onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            State:{" "}
                            <input
                            type="text"
                            name="state"
                            value={addressForm.state}
                            onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Zip Code:{}
                            <input
                            type="number"
                            name="zip_code"
                            value={addressForm.zip_code}
                            onChange={handleInputChange}
                            />
                        </label>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose}> Cancel</button>
                    <button onClick={handlePost}> SAVE</button>
                </Modal.Footer>
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