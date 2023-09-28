import { useEffect, useState } from "react"
import { useAuthContext } from "../context/AuthProvider";
import clientAxios from "../config/axios";

const useUserAuth = () => {
    const [,,token] = useAuthContext();
    const [user, setUser] = useState();

    useEffect(() => {
        //! Get profile user by token
        if(token){
            clientAxios('/veterinarios/profile', {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            .then(({data}) => setUser(data.profile))
        }
    },[token]);

    return user;
};

export default useUserAuth