import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useWindowSize from "../../hooks/useWindowSize";


const ProfilePage = () => {

const [user,token] = useAuth();
const innerWidth = useWindowSize();
const [profileChoice, setProfileChoice] = useState('account')

    let profileComponent;
    switch(profileChoice){
        case 'account':
            profileComponent = <h1>account</h1>
            break;
        case 'payment':
            profileComponent = <h1>payment</h1>
            break;
        case 'orders':
            profileComponent = <h1>orders</h1>
            break;
        default:
            console.log('Not a vidlid choice')
    }


    return(
        <div>
           <ul>
            <li className={profileChoice === 'account' ? 'tab--active' : 'tab--inactive'} onClick={()=>setProfileChoice('account')} >Account</li>
            <li className={profileChoice === 'payment' ? 'tab--active' : 'tab--inactive'} onClick={()=>setProfileChoice('payment')}>payment methods</li>
            <li className={profileChoice === 'orders' ? 'tab--active' : 'tab--inactive'} onClick={()=>setProfileChoice('orders')}>Orders</li>
           </ul>
           {profileComponent}
           {user.is_employee ?
           <h1>i am a</h1> :'not true'}
        </div>
    );
}


    


export default ProfilePage;