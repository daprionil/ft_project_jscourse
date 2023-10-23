import { useState } from "react"
import MenuAdmin from "../components/MenuAdmin"
import { useAuthContext } from "../context/AuthProvider";
import Alert, { initAlertValues, setErrorAlertMessage, setSuccessAlertMessage } from "../components/Alert";
import Loader from "../components/Loader";
import { ValidateForms } from "../helpers/ValidateForms";
import changePasswordVeterinario from "../controllers/changePasswordVeterinario";

const initFormPasswordValues = {
    password: '',
    passwordrepeat: '',
    passwordcurrent: ''
}

const ChangePasswordAdmin = () => {
    const { authToken } = useAuthContext();
    
    const [ formPasswordValues, setFormsPasswordValues ] = useState(initFormPasswordValues);
    const [ alertMessage, setAlertMessage ] = useState(initAlertValues);
    const [ loading, setLoading ] = useState(false);

    //? Handle change to password state
    const handleChangeFormValues = ({target:{name, value}}) => {
        setFormsPasswordValues(state => ({
            ...state,
            [name]:value
        }));
    };
    
    //? Send request to change password from admin profile
    const handleSubmit = evt => {
        evt.preventDefault();

        //! Validate form - If exist empty fields
        const existEmptyValues = Object.values(formPasswordValues).some( v => !(v.trim()));
        if(existEmptyValues){
            setErrorAlertMessage(setAlertMessage, 'Completa todos los campos');
            return;
        }

        //! Validate form - If the password have a incorrect format
        const validationPassword = ValidateForms.password(formPasswordValues.password);
        if(!validationPassword){
            setErrorAlertMessage(setAlertMessage, 'La contraseña no es válida, Ej: passW23#');
            return;
        }
        
        //! Validate form - If the new password are equal
        if(formPasswordValues.password !== formPasswordValues.passwordrepeat){
            setErrorAlertMessage(setAlertMessage, 'Las contraseñas no son iguales');
            return;
        }

        //! Validate form - If the new password are equal to current password
        if(formPasswordValues.password.trim() === formPasswordValues.passwordcurrent.trim()){
            setErrorAlertMessage(setAlertMessage, 'Tu nueva contraseña es igual a la actual');
            return;
        }

        //! Send request to update password
        setLoading(true);//* Starts loader

        changePasswordVeterinario({
            currentPassword: formPasswordValues.passwordcurrent.trim(),
            newPassword: formPasswordValues.password.trim(),
            authToken
        })
            .then(({data}) => {
                //? If the password was changed successfully
                if(data.updated){
                    setSuccessAlertMessage(alertMessage, setAlertMessage, 'Tu contraseña ha sido editada correctamente');
                    return;
                }
            })
            .catch(({response:{data}}) => {
                //? If exist an error from server
                if(data?.error){
                    setErrorAlertMessage(setAlertMessage, data.error);
                    return;
                }
                setErrorAlertMessage(setAlertMessage, 'Ha habido un problema, intentalo nuevamente más tarde');
            })
            .finally(() => {
                setLoading(false);//* Clear loading
                setFormsPasswordValues(initFormPasswordValues);//* Reset form values
            });
    };

    return (
        <>
            <MenuAdmin />
            <div className="text-center mt-10 mb-5">
                <h2 className="font-black text-3xl">Cambiar Contraseña</h2>
                <p className="font-medium mt-4">Modifica tu <span className="text-indigo-600">contraseña aquí</span></p>
            </div>
            <div className=" flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5 relative">
                    <form
                        className="flex gap-3 flex-wrap [&>label]:block [&>label>p]:mb-4 [&>label]:w-full [&>label]:mx-auto"
                        onSubmit={handleSubmit}
                    >
                        <label className="uppercase font-bold text-gray-600">
                            <p>Contraseña Actual</p>
                            <input
                                disabled={loading}
                                value={formPasswordValues.passwordcurrent}
                                onChange={handleChangeFormValues}
                                type="password"
                                className="w-full bg-none border-none shadow"
                                placeholder="Contraseña"
                                name="passwordcurrent"
                            />
                        </label>
                        <label className="uppercase font-bold text-gray-600">
                            <p>Nueva contraseña</p>
                            <input
                                disabled={loading}
                                value={formPasswordValues.password}
                                onChange={handleChangeFormValues}
                                type="password"
                                className="w-full bg-none border-none shadow"
                                placeholder="Contraseña"
                                name="password"
                            />
                        </label>
                        <label className="uppercase font-bold text-gray-600">
                            <p>Repite tu nueva contraseña</p>
                            <input
                                disabled={loading}
                                value={formPasswordValues.passwordrepeat}
                                onChange={handleChangeFormValues}
                                type="password"
                                className="w-full bg-none border-none shadow"
                                placeholder="Repite la contraseña"
                                name="passwordrepeat"
                            />
                        </label>
                        {
                            alertMessage.msg && <Alert {...alertMessage} />
                        }
                        <div className="uppercase font-bold text-gray-600 w-full relative py-4">
                            {
                                loading ?
                                    <Loader />
                                    :
                                    <input
                                        disabled={loading}
                                        type="submit"
                                        style={{ background: '#536dff' }}
                                        className="btn text-white rounded-lg"
                                        value='Guardar'
                                    />
                            }

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChangePasswordAdmin