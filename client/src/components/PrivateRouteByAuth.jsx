import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthProvider"
import Loader from "./Loader";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteByAuth = ({children}) => {
    const [auth] = useAuthContext();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setLoading(true);
        if(auth !== null){
            setLoading(false);
        }
    },[auth]);

    return (
        <div>
            {
                loading ?
                    <Loader />
                : auth ?
                    <>
                        {children}
                        <Outlet/>
                    </>
                    : <Navigate to='/'/>
            }
        </div>
    )
}

export default PrivateRouteByAuth