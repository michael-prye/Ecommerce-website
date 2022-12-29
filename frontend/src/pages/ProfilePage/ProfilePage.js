import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useWindowSize from "../../hooks/useWindowSize";


const ProfilePage = () => {

const [user,token] = useAuth();
const innerWidth = useWindowSize();

    useEffect(()=>{
        console.log(innerWidth)
    },[])


    return(
        <div>
            <h1>{innerWidth}</h1>
        </div>

    );
};

export default ProfilePage;