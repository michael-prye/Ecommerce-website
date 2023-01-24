import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useWindowSize from "../../hooks/useWindowSize";
import ProfileAccount from "../../components/ProfileAccount/ProfileAccount";


const ProfilePage = () => {

const [user,token] = useAuth();
const innerWidth = useWindowSize();
const [profileChoice, setProfileChoice] = useState('account')

    let profileComponent;
    switch(profileChoice){
        case 'account':
            profileComponent = <ProfileAccount/>
            break;
        case 'payment':
            profileComponent = <h1>payment</h1>
            break;
        case 'orders':
            profileComponent = <h1>orders</h1>
            break;
        default:
            console.log('Not a valid choice')
    }


    return(
        <div>
           <ul>
            <li className={profileChoice === 'account' ? 'tab--active' : 'tab--inactive'} onClick={()=>setProfileChoice('account')} >Account</li>
            <li className={profileChoice === 'payment' ? 'tab--active' : 'tab--inactive'} onClick={()=>setProfileChoice('payment')}>payment methods</li>
            <li className={profileChoice === 'orders' ? 'tab--active' : 'tab--inactive'} onClick={()=>setProfileChoice('orders')}>Orders</li>
           </ul>
           {profileComponent}
           
        </div>
    );
}


    


export default ProfilePage;