import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Modal } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";

const ProfileAddresses = () => {

    const [user, token] = useAuth();
    const [newAddressModal, setNewAddressModal] =useState(false)
    const [deleteAddressModal, setDeleteAddressModal] = useState(false)
    const [editAddressModal, setEditAddressModal] = useState(false)
    const defaultAddress = {street: "", city: "", state: "", zip_code:""}
    const [addressForm, setAddressForm] = useState(defaultAddress)
    const [addresses,getAddress] = useFetch('http://127.0.0.1:8000/api/address/','GET',null)
    const [postAddress, sendPostAddress] = useFetch('http://127.0.0.1:8000/api/address/', 'POST', addressForm)
    const [deleteAddress, sendDeleteAddress] = useFetch('http://127.0.0.1:8000/api/address/', 'DELETE', null)
    const [putAddress, sendPutAddress] = useFetch('http://127.0.0.1:8000/api/address/', 'DELETE', null)


    useEffect(()=>{
        getAddress(); // To load users address
    },[])

    const handleInputChange = (e)=>{ 
        e.persist();
        setAddressForm({...addressForm, [e.target.name]: e.target.value})
        console.log(addressForm)
    }
 
    const handleClose=()=>{ // to close newAddressModal and clear AddressForm
        setNewAddressModal(false)
        setEditAddressModal(false)
        setAddressForm(defaultAddress)
    }
    const handlePost= async()=>{ // 
        await sendPostAddress();
        await getAddress();
        handleClose();

    }

    const handleDelete= async(id)=>{
        await sendDeleteAddress(id);
        await getAddress();
        setDeleteAddressModal(false);
    }
    const handleEditModal=(data)=>{
        setAddressForm({street:data.street,city:data.city,state:data.state,zip_code:data.zip_code})
        setEditAddressModal(true)
    }




    return ( 
        <div>
            <button onClick={()=>setNewAddressModal(true)}>Add Address</button>
            

            <Modal show={newAddressModal} onHide={handleClose} centered={true}>
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
                    <button onClick={()=>{handleEditModal(address)}}>edit</button>
                    <Modal show={editAddressModal} onHide={()=>{handleClose()}}>
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
                    <button onClick={()=>{console.log(addressForm)}}>SAVE</button>
                </Modal.Footer>
                        
                    </Modal>

                    <button onClick={()=>{setDeleteAddressModal(true)}}>delete</button>
                    <Modal show={deleteAddressModal} onHide={()=>{setDeleteAddressModal(false)}}>
                        <Modal.Header closeButton>
                            <Modal.Title>Are you sure you want to delete this address?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <p>{address.street}</p>
                        <p>{address.city}, {address.state} {address.zip_code}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button onClick={()=>{setDeleteAddressModal(false)}}>Cancel</button>
                            <button onClick={()=>{handleDelete(address.id)}}>Delete Address</button>

                        </Modal.Footer>

                    </Modal>
                    
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