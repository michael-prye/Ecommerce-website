import { useContext } from "react";
import AuthContext from "../../context/AuthContext";




const ProfileAccount = () => {
    const {user} = useContext(AuthContext);



    return ( 
        <div>
            <h1>{user.username}</h1>
            <h1>{user.last_name}</h1>
        </div>
     );
}
 
export default ProfileAccount;