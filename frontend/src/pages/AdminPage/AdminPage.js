import React from "react";
import { useEffect, useState } from "react";

const AdminPage = () => {
    const [adminChoice, setAdminChoice] = useState('productList')

    let adminComponent;
    switch(adminChoice){
        case 'newProduct':
            adminComponent = <h1>New Product</h1>
            break;
        case 'productList':
            adminComponent = <h1>Product List</h1>
            break;
    }



    return(
        <div>
            <ul>
            <li className={adminChoice === 'ProductList' ? 'tab--active' : 'tab--inactive'} onClick={()=>setAdminChoice('productList')} >Product List</li>
            <li className={adminChoice === 'newProduct' ? 'tab--active' : 'tab--inactive'} onClick={()=>setAdminChoice('newProduct')} >New Product</li>
            
            </ul>
            {adminComponent}
        </div>
    )
};

export default AdminPage