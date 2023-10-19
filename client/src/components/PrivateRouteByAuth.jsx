import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthProvider"
import Loader from "./Loader";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteByAuth = ({Layout}) => {
    const { confirm } = useAuthContext();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        setLoading(true);
        if(confirm !== null){
            setLoading(false);
        }
    },[confirm]);

    return (
        <div>
            {
                loading ?
                    <Loader />
                : confirm ?
                    <>
                        <Layout>
                            <Outlet />
                        </Layout>
                    </>
                    : <Navigate to='/'/>
            }
        </div>
    )
}

export default PrivateRouteByAuth