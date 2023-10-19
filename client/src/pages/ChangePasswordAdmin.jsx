import { useState } from "react"
import MenuAdmin from "../components/MenuAdmin"
import { useAuthContext } from "../context/AuthProvider";
import Alert, { initAlertValues } from "../components/Alert";
import Loader from "../components/Loader";

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
                        <div className="uppercase font-bold text-gray-600 w-full relative">
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