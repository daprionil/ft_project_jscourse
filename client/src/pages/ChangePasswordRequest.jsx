import { useState } from "react"
import { NavLink } from "react-router-dom"
import { ValidateForms } from "../helpers/ValidateForms";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import clientAxios from "../config/axios";

const ChangePassword = () => {
    const [ emailFormValue, setEmailFormValue ] = useState('');
    const [ alertMessage, setAlertMesage ] = useState({msg:null, type: null});
    const [ loading, setLoading ] = useState(false);
    
    //! Generate alert to error form
    const setErrorAlert = msg => {
        setAlertMesage({
            msg,
            type: 'error'
        });
    };

    //? Change values to emailFormValue
    const handleChangeEmail = ({target:{value}}) => setEmailFormValue(value.trim());
    
    //? Validate with submit event and send request to reset password
    const handleSubmit = async evt => {
        evt.preventDefault();

        //! If email is empty
        if(!emailFormValue){
            //! Set error
            setErrorAlert('El email no puede estar vacío');
            return;
        }

        //! If the email is invalid
        const isValidEmail = ValidateForms['email'](emailFormValue);
        if(!isValidEmail) {
            //! Set error
            setErrorAlert('El email no es válido');
            return;
        }
        
        try {
            setLoading(true);
            
            //! Send request to reset Password
            const response = await clientAxios.post('/veterinarios/password', {
                email: emailFormValue
            });
            
            //? Success request and email was sent
            setAlertMesage({
                msg: response.data.message,
                type: null
            });
        } catch ({response}) {
            
            //!If the error comes from the server
            if(response?.status === 404 && response.data?.error){
                setErrorAlert(response.data.error);
                return;
            }
            
            //! Other errors
            setErrorAlert('Ha habido un problema, revisa tus credenciales o intentalo más tarde');
        }finally{
            //! Clear loading and form values
            setLoading(false);
            setEmailFormValue('');
        }
    };

    return (
        <>
            <div>
                <h1 className="text-6xl font-black text-indigo-600 ">Recupera tu acceso y no pierdas tus <span className="text-black">Pacientes</span></h1>
            </div>
            <div className="w-full px-5 py-10 bg-white rounded-lg shadow-lg">
                <form
                    className="w-full"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col w-full gap-4">
                        <label className="uppercase">
                            <span className="font-bold uppercase">Email</span>
                            <input
                                type="email"
                                className="w-full"
                                placeholder="Email de tu registro"
                                onChange={handleChangeEmail}
                                value={emailFormValue}
                            />
                        </label>
                        {
                            alertMessage.msg &&
                            <Alert {...alertMessage}/>
                        }
                        <div className="relative">
                        {
                            loading ?    
                                <Loader />
                            :   <button
                                    type="submit"
                                    className="w-full px-10 text-white whitespace-nowrap btn md:w-min"
                                    style={{ background: "black" }}
                                >Enviar instrucciones</button>
                        }
                        </div>
                    </div>
                </form>
                <nav className="flex flex-col md:flex-row [&>a]:text-xl md:[&>a]:text-sm md:flex-nowrap items-center justify-center md:justify-between [&>a]:text-gray-500 [&>a]:font-bold mt-10">
                    <NavLink className='hover:underline' to='/signin' replace >Registrarse</NavLink>
                    <NavLink className='hover:underline' to='/' replace >Iniciar Sesion</NavLink>
                </nav>
            </div>
        </>
    )
}

export default ChangePassword