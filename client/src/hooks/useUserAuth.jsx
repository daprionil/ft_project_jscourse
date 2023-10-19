import { useEffect, useState } from "react"
import { useAuthContext } from "../context/AuthProvider";
import clientAxios from "../config/axios";

const useUserAuth = () => {
    const {authToken} = useAuthContext();
    const [user, setUser] = useState();

    useEffect(() => {
        //! Get profile user by authToken
        if(authToken){
            clientAxios('/veterinarios/profile', {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`
                }
            })
            .then(({data}) => setUser(data.profile))
            return;
        }
        //! If not exist a token
        setUser({})
    },[authToken]);

    return user;
};

export default useUserAuth