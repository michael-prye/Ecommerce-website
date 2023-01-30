import { useContext } from "react";
import AuthContext from "../../context/AuthContext";




const ProfileAccount = () => {
    const {user} = useContext(AuthContext);



    return ( 
        <div>
            <div className="account-card">
               <h2>ABOUT YOU</h2>
               <div className="body">
                <div className="info-group">
                    <h3>Name</h3>
                    <p>{user.first_name} {user.last_name}</p>
                </div>
                <div className="info-group">
                    <h3>Username</h3>
                    <p>{user.username}</p>
                </div>
                <div className="info-group">
                    <h3>Email</h3>
                    <p>{user.email}</p>
                </div>


               </div>
            </div>
        </div>
     );
}
 
export default ProfileAccount;