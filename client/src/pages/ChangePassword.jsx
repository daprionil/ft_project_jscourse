import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import clientAxios from "../config/axios";
import Loader from "../components/Loader";
import Alert, { initAlertValues, setErrorAlertMessage, setSuccessAlertMessage } from "../components/Alert";
import { ValidateForms } from "../helpers/ValidateForms";


//? Initialization values to form reset password
const initValuesForm = {
    password:'',
    repeatPassword:'',
};

const ChangePassword = () => {
    const { tokenId } = useParams();
    
    const [ valuesFormChangePassword, setValuesFormChangePassword ] = useState(initValuesForm);
    const [ alertMessage, setAlertMessage ] = useState(initAlertValues);
    const [ validateToken, setValidationToken ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    
    //! Handle Change values to Form
    const handleChangeValuesForm = ({target:{value, name}}) => {
        setValuesFormChangePassword(state => ({
            ...state,
            [name]: value
        }))
    }

    const handleSubmitToChangePassword = evt => {
        evt.preventDefault();
        
        //! Configurate passwords
        const pass = valuesFormChangePassword.password;
        const pass2 = valuesFormChangePassword.repeatPassword;

        //! Validate empty form fields
        if(!pass && !pass2){
            setErrorAlertMessage(setAlertMessage, 'Debes de completar todos los campos')
            return
        }
        
        //! If the password have a invalid format
        if(!ValidateForms['password'](pass)){
            setErrorAlertMessage(setAlertMessage, 'Contraseña insegura, intenta con otra. Ej: passW23##')
            return;
        }

        //! If the passwords are not the same
        if(pass !== pass2){
            setErrorAlertMessage(setAlertMessage, 'Tus contraseñas no son iguales')
            return;
        }

        //? Send request to change password veterinario
        clientAxios.post(`/veterinarios/password/${tokenId}`, {
            password: pass
        }).then(({data}) => {
            //? If the password was changed successfull
            if(data.changed){
                setSuccessAlertMessage(alertMessage, setAlertMessage, 'Tu contraseña se ha cambiado exitosamente');
            }
            setValuesFormChangePassword(initValuesForm);
        })
        .catch(() => {
            //! Set server error
            setErrorAlertMessage(setAlertMessage, 'Ha habido un problema, Intentalo más tarde')
        })
    }

    //!An execution when the application starts
    useEffect(() => {
        //! Validate token when this app starts
        if(!tokenId) return;
        
        //? Start Loading App
        setLoading(true);
        
        //? Generate Request
        clientAxios.get(`/veterinarios/password/${tokenId}`)
            .then(({data:{confirmed}}) => {
                
                //! Validate confirmation
                if(confirmed){
                    //! Set value of validation
                    setValidationToken(confirmed);
                    //! Succes alert
                    setSuccessAlertMessage(alertMessage, setAlertMessage, 'Validado, puedes cambiar tu contraseña');
                    return;
                }
                //! Not confirmed tokenId
                setErrorAlertMessage(setAlertMessage, 'Acción no válida, verifica el enlace de tu email')
            })
            .catch(() => {
                //! Set server error
                setErrorAlertMessage(setAlertMessage, 'Ha habido un problema, Intentalo más tarde')
            })
            .finally(() => {
                //! Finish loading
                setLoading(false);
            });
    },[tokenId]);

    return (
        <>
            <div>
                <h1 className="text-6xl font-black text-indigo-600 ">Piensa una <span className="text-black">Contraseña</span> que puedas recordar</h1>
            </div>
            <div className="w-full px-5 py-10 bg-white rounded-lg shadow-lg">
                <form
                    className="w-full"
                    onSubmit={handleSubmitToChangePassword}
                >
                    <div className="relative grid items-start mb-5">
                        {
                            loading 
                                ?   <Loader />
                                :   <Alert {...alertMessage} />
                        }
                    </div>
                    {
                        (validateToken && !loading) &&
                        <div className="flex flex-col w-full gap-4">
                            <label className="uppercase">
                                <span className="font-bold uppercase">Nueva Contraseña</span>
                                <input
                                    type="password"
                                    className="w-full"
                                    placeholder="Nueva contraseña"
                                    name="password"
                                    value={valuesFormChangePassword.password}
                                    onChange={handleChangeValuesForm}
                                />
                            </label>
                            <label className="uppercase">
                                <span className="font-bold uppercase">Repetir Contraseña</span>
                                <input
                                    type="password"
                                    className="w-full"
                                    placeholder="Repetir contraseña"
                                    name="repeatPassword"
                                    value={valuesFormChangePassword.repeatPassword}
                                    onChange={handleChangeValuesForm}
                                />
                            </label>
                            <div className="relative">
                                <button
                                    type="submit"
                                    className="w-full px-10 text-white whitespace-nowrap btn md:w-min"
                                    style={{ background: "black" }}
                                >Cambiar contraseña</button>
                            </div>
                        </div>
                    }
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