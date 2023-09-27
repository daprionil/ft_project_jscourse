import { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import clientAxios from "../config/axios";


const ConfirmAccount = () => {
    const { token } = useParams();
    
    const [ loading, setLoading ] = useState(true);
    const [ confirmState, setConfirmState ] = useState({msg: null, type: null});
    const [ confirmedAccount, setConfirmedAccount ] = useState(false);

    const sendingRequest = useRef();
    
    useEffect(() => {
        //! Validate if a request had previously been initiated
        if(sendingRequest.current) return;
        sendingRequest.current = true;
        
        //!Init state to loading
        setLoading(true);
        
        //! Send request to confirm Account
        clientAxios.get(`veterinarios/confirm/${token}`)
            .then((response) => {
                //* If the response sucess with 200 - confirmed Account succesful
                if(response.status === 200){
                    setConfirmState({
                        msg: response.data.message,
                        type: 'success'
                    });
                    //* Change confirmedAccount
                    setConfirmedAccount(true);
                }
            })
            .catch(({response}) => {
                //! If the response is 401 - Unauthorized
                if(response.status === 401){
                    setConfirmState({
                        msg: response.data.message,
                        type: 'error'
                    });
                }
            })
            // clear loading
            .finally(() => setLoading(false));
    },[]);

    return (
        <>
            <div>
                <h1 className="text-6xl font-black text-indigo-600">
                    Crea tu cuenta y Administra tus <span className="text-black"> Pacientes</span>
                </h1>
            </div>
            <div className="relative w-full px-5 py-10 bg-white rounded-lg shadow-lg">
                {
                    loading ?
                        <Loader />
                    :   <Alert {...confirmState}/>
                }
                {
                    (!loading && confirmedAccount) &&
                    <nav className="flex flex-col md:flex-row [&>a]:text-xl md:[&>a]:text-sm md:flex-nowrap items-center justify-center md:justify-between [&>a]:text-gray-500 [&>a]:font-bold mt-10">
                        <NavLink className='hover:underline' to='/' replace >Iniciar Sesión</NavLink>
                        <NavLink className='hover:underline' to='/resetpassword' replace >¿ Olvidaste la contraseña ?</NavLink>
                    </nav>
                }
            </div>
        </>
    )
}

export default ConfirmAccount;