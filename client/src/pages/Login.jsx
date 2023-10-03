import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
import { useState } from "react";
import { ValidateForms } from "../helpers/ValidateForms";
import clientAxios from "../config/axios";
import Loader from "../components/Loader";
import Alert from "../components/Alert";

//* Init values to form values
const initValuesFormLogin = {
    password: '',
    email: ''
}

//* Init values to set alert message
const initAlertMessageValues = {
    msg: null,
    type: null
}

const Login = () => {
    const {dispatch} = useAuthContext();
    const [ alertMessage, setAlertMessage ] = useState(initAlertMessageValues);
    const [ valuesFormLogin, setValuesFormLogin ] = useState(initValuesFormLogin);
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    //! Create alertMessage with type error
    const setErrorAlertMessage = msg => setAlertMessage({msg, type: 'error'});
    //! clear alertMessage
    const clearAlertMessage = () => setAlertMessage(initAlertMessageValues);

    //! Change values to login Form
    const handleChangeValuesForm = ({target:{value, name}}) => {
        setValuesFormLogin(state => ({
            ...state,
            [name]: value
        }));
    };

    //! Handle submit to login veterinario
    const handleSubmitLogin = evt => {
        evt.preventDefault();
        
        const {password, email} = valuesFormLogin;
        
        //! If exist empty values
        if(!password || !email){
            setErrorAlertMessage('Completa todos los campos');
            return;
        }
        
        //!If the email or password are invalid values
        const validateEmail = ValidateForms['email'](email);
        const validatePassword = ValidateForms['password'](password);
        
        if(!validateEmail || !validatePassword){
            setErrorAlertMessage('Las credenciales no son válidas');
            return;
        }

        //? Send request to login veterinario
        setLoading(true);
        clearAlertMessage();
        clientAxios.post('/veterinarios/login', { password, email})
            .then(({data}) => {
                //Continous validation
                if(data.token){
                    dispatch(data.token);
                    //! Send the user to admin profile
                    navigate('/admin')
                }
            })
            .catch(({response}) => {
                //! If exist and error from server
                if(response.data?.error){
                    setErrorAlertMessage(response.data.error);
                    return;
                }
                setErrorAlertMessage('Ha habido un error inesperado, intentalo de nuevo más tarde')
            })
            .finally(() => setLoading(false));
    };


    return (
        <>
            <div className="p-2">
                <h1 className="text-6xl font-black text-indigo-600">
                    Inicia Sesión y Administra tus <span className="text-black">pacientes</span>
                </h1>
            </div>
            <div className="w-full px-5 py-10 bg-white rounded-lg shadow-xl">
                <form
                    className="w-full"
                    onSubmit={handleSubmitLogin}
                >
                    <div className="flex flex-col w-full gap-4">
                        <label className="uppercase">
                            <span className="font-bold uppercase">Email</span>
                            <input
                                type="email"
                                className="w-full"
                                placeholder="Email de tu registro"
                                name="email"
                                value={valuesFormLogin.email}
                                onChange={handleChangeValuesForm}
                            />
                        </label>
                        <label className="uppercase">
                            <span className="font-bold uppercase">Password</span>
                            <input
                                type="password"
                                className="w-full"
                                placeholder="Contraseña"
                                name="password"
                                value={valuesFormLogin.password}
                                onChange={handleChangeValuesForm}
                            />
                        </label>
                        {
                            alertMessage.msg && <Alert {...alertMessage}/>
                        }
                        <div className="relative">
                            {
                                loading ?
                                    <Loader />
                                :   <button
                                        type="submit"
                                        className="w-full px-10 text-white btn md:w-min whitespace-nowrap"
                                        style={{ background: "black" }}
                                    >Iniciar Sesion</button>
                            }
                        </div>
                    </div>
                </form>
                <nav className="flex flex-col md:flex-row [&>a]:text-xl md:[&>a]:text-sm md:flex-nowrap items-center justify-center md:justify-between [&>a]:text-gray-500 [&>a]:font-bold mt-10">
                    <NavLink className='hover:underline' to='/signin' replace>Registrarse</NavLink>
                    <NavLink className='hover:underline' to='/resetpassword' replace >¿ Olvidaste la contraseña ?</NavLink>
                </nav>
            </div>
        </>
    )
}

export default Login;