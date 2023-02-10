import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";


const HomePage = () => {

  const [user, token] = useAuth();




    useEffect(()=> {
      console.log(user.first_name)
    })
  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
      {user.is_employee ?(
        <h2>is_employee </h2>
      ):(
        <h2>Customer</h2>
      )}
      
    </div>
  );
};

export default HomePage;
