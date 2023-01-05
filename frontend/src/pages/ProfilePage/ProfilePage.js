import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useWindowSize from "../../hooks/useWindowSize";


const ProfilePage = () => {

const [user,token] = useAuth();
const innerWidth = useWindowSize();

if (innerWidth < 500){
    return(
        <div>
            <h1>Small Screen</h1>
            <h5>{innerWidth}</h5>
        </div>
    );
} else {
    return(
        <div>
            <h1>Big Screen</h1>
            <h5>{innerWidth}</h5>
        </div>
    );
}



    
};

export default ProfilePage;