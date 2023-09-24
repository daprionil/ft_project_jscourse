import { useState } from "react"
import { NavLink } from "react-router-dom"

import { ValidateForms, messageValidationsError } from "../helpers/ValidateForms";
import Alert from "../components/Alert";
import clientAxios from "../config/axios";

const initialValue = {
    name: '',
    password: '',
    repeatPassword:'',
    email: '',
};

const initialValueAlert = {msg: null, type: null};

const SignIn = () => {
    const [ valuesForm, setValuesForm ] = useState(initialValue);
    const [ alertMessage, setAlertMessage ] = useState(initialValueAlert);

    //? This function will be clear state to form values
    const resetFormValues = () => setValuesForm(initialValue);

    //? Set error to alert message
    const setErrorAlert = (msg) => setAlertMessage({msg, type: 'error'});

    //? Reset and Clear Alert
    const clearAlert = () => setAlertMessage(initialValueAlert);

    //! Set values of valuesForm to state
    const handleChangeValuesForm = ({target:{value,name}}) => {
        setValuesForm(state => (
            {
                ...state,
                [name]:value
            }
        ))
    }

    //!Validate form with submit event
    const handleSubmitForm = async evt => {
        evt.preventDefault();
        
        const listFieldValuesForm = Object.entries(valuesForm);
        
        //! Validate if exist empty fields
        const validateEmptyFields = listFieldValuesForm.filter(([k,v]) => !v.trim());
        if(validateEmptyFields.length) return setErrorAlert('Completa todos los campos');

        //! Validate fields with regex
        for(let [name, value] of listFieldValuesForm){
            const existValidation = ValidateForms[name];
            if(existValidation){
                const resultValidation = existValidation(value);
                if(!resultValidation){
                    //! Set error in alert
                    setErrorAlert(messageValidationsError[name]);
                    return;
                }
                continue;
            }
            //! If the field is less than eight characters
            if(value.length < 8){
                //! Set error in alert
                setErrorAlert(`El campo [${name}] tiene menos de 8 carácteres`);
                return;
            }
        }

        //! Validate if the password has the same values
        if(valuesForm.password !== valuesForm.repeatPassword){
            setErrorAlert('Las contraseñas no coinciden');
            return;
        }
        
        try {
            //! Send request to SignUp
            await clientAxios.post(`/veterinarios`, {
                name: valuesForm.name,
                email: valuesForm.email,
                password: valuesForm.password
            });
            
            setAlertMessage({
                msg: `${valuesForm.name} tu cuenta ha sido creada exitosamente, Revisa tu email y confirmate!`,
                type: ''
            })
            resetFormValues();
        } catch (error) {
            if(error.code === 'ERR_NETWORK'){
                setErrorAlert('El servicio no se encuentra disponible, Intentalo más tarde')
                return;
            }
            const {response:{data:{error: msgerror}}} = error;
            setErrorAlert(msgerror)
        }
    };

    return (
        <>
            <div>
                <h1 className="text-6xl font-black text-indigo-600">
                    Crea tu cuenta y Administra tus <span className="text-black"> Pacientes</span>
                </h1>
            </div>
            <div className="w-full px-5 py-10 bg-white rounded-lg shadow-lg">
                <form
                    className="w-full"
                    onSubmit={handleSubmitForm}
                >
                    <div className="flex flex-col w-full gap-4">
                        <label className="uppercase">
                            <span className="font-bold uppercase">Nombre</span>
                            <input
                                onChange={handleChangeValuesForm}
                                value={valuesForm.name}
                                type="text"
                                className="w-full"
                                name="name"
                                placeholder="Tu nombre"
                            />
                        </label>
                        <label className="uppercase">
                            <span className="font-bold uppercase">Email</span>
                            <input
                                onChange={handleChangeValuesForm}
                                value={valuesForm.email}
                                type="email"
                                name="email"
                                className="w-full"
                                placeholder="Tu correo electrónico"
                            />
                        </label>
                        <label className="uppercase">
                            <span className="font-bold uppercase">Password</span>
                            <input
                                onChange={handleChangeValuesForm}
                                value={valuesForm.password}
                                type="password"
                                name="password"
                                className="w-full"
                                placeholder="Tu Contraseña"
                            />
                        </label>
                        <label className="uppercase">
                            <span className="font-bold uppercase">Repetir Contraseña</span>
                            <input
                                onChange={handleChangeValuesForm}
                                value={valuesForm.repeatPassword}
                                type="password"
                                name="repeatPassword"
                                className="w-full"
                                placeholder="Repite tu contraseñá"
                            />
                        </label>
                        {
                            alertMessage.msg && <Alert {...alertMessage}/>
                        }
                        <button
                            type="submit"
                            className="w-full px-10 text-white btn md:w-min"
                            style={{ background: "black" }}
                        >Registrarme</button>
                    </div>
                </form>
                <nav className="flex flex-col md:flex-row [&>a]:text-xl md:[&>a]:text-sm md:flex-nowrap items-center justify-center md:justify-between [&>a]:text-gray-500 [&>a]:font-bold mt-10">
                    <NavLink className='hover:underline' to='/' replace >Iniciar Sesión</NavLink>
                    <NavLink className='hover:underline' to='/resetpassword' replace >¿ Olvidaste la contraseña ?</NavLink>
                </nav>
            </div>
        </>
    )
}

export default SignIn