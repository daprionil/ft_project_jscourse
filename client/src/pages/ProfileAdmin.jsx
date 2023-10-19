import { useEffect, useState } from "react";
import MenuAdmin from "../components/MenuAdmin";
import useUserAuth from "../hooks/useUserAuth";
import Alert, { clearAlertMessage, initAlertValues, setErrorAlertMessage, setSuccessAlertMessage } from "../components/Alert";
import { ValidateForms } from "../helpers/ValidateForms";
import { useAuthContext } from "../context/AuthProvider";
import putVeterinario from "../controllers/putVeterinario";
import Loader from "../components/Loader";

const initValuesFormProfile = {
    name: '',
    website: '',
    phoneNumber: '',
    email: ''
};

const ProfileAdmin = () => {
    const { authToken } = useAuthContext();
    const user = useUserAuth();

    const [valuesFormProfile, setValuesFormProfile] = useState(initValuesFormProfile);
    const [alertMessage, setAlertMessage] = useState(initAlertValues);
    const [modeForm, setModeForm] = useState(false);
    const [loading, setLoading] = useState(false);

    //! Set values in the form to edit the profile info user
    const handleChangeValuesForm = ({ target: { name, value } }) => {
        setValuesFormProfile(state => ({
            ...state,
            [name]: value.replace(' ', ' ')
        }));
    };

    const handleSubmitProfileForm = async evt => {
        evt.preventDefault();

        //!Validate is email or name is empty
        if (!valuesFormProfile.name || !valuesFormProfile.email) {
            setErrorAlertMessage(setAlertMessage, 'No puedes continuar, completa el nombre y email');
            return;
        }

        //! If the email not is a valid value
        const validationEmail = ValidateForms['email'](valuesFormProfile.email);
        if (!validationEmail) {
            setErrorAlertMessage(setAlertMessage, 'Tu email no es válido');
            return;
        }

        //! If the name has minimun 8 characters
        if (valuesFormProfile.name.length < 8) {
            setErrorAlertMessage(setAlertMessage, 'El nombre de usuario ');
            return;
        }
        
        //! Send request to edit profile
        try {
            setLoading(true);

            const responseUpdateVeterinario = await putVeterinario(authToken, valuesFormProfile);
            const { data, statusText } = responseUpdateVeterinario;

            if (statusText === 'OK') {
                const { name, phoneNumber, website, email } = data;
                
                //? Set values changed in state
                setValuesFormProfile({
                    name,
                    phoneNumber: phoneNumber ?? '',
                    website: website ?? '',
                    email
                });
                
                //? Set alert message for form
                setSuccessAlertMessage(
                    alertMessage,
                    setAlertMessage,
                    'Tus cambios han sido almacenados exitosamente',
                    () => setModeForm(false)//Change mode form
                );
            }
        } catch (error) {
            setErrorAlertMessage(setAlertMessage, 'Ha ocurrido un error, Intentalo de nuevo más tarde')
        } finally{
            //? Final request actions
            setLoading(false);
        }

    };
    
    const handleClickChangeModeForm = () => setModeForm(state => !state);

    useEffect(() => {
        if (user) {
            setValuesFormProfile({
                name: user.name,
                website: user.website || '',
                email: user.email,
                phoneNumber: user.phoneNumber || ''
            })
        }
    }, [user]);

    return (
        <>
            <MenuAdmin />
            <div className="text-center mt-10 mb-5">
                <h2 className="font-black text-3xl">Editar Perfil</h2>
                <p className="font-medium mt-4">Modifica tu <span className="text-indigo-600">Información de Perfil</span></p>
            </div>
            <div className=" flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5 relative">
                    {
                        modeForm ?
                            <form
                                className="flex gap-3 flex-wrap [&>label]:block [&>label>p]:mb-4 [&>label]:w-full [&>label]:mx-auto"
                                onSubmit={handleSubmitProfileForm}
                            >
                                <label className="uppercase font-bold text-gray-600">
                                    <p>Nombre</p>
                                    <input
                                        type="text"
                                        placeholder="Tu nombre de perfil"
                                        className="w-full bg-none border-none shadow"
                                        name="name"
                                        onChange={handleChangeValuesForm}
                                        value={valuesFormProfile.name}
                                    />
                                </label>
                                <label className="uppercase font-bold text-gray-600">
                                    <p>Sitio Web</p>
                                    <input
                                        type="text"
                                        placeholder="Tu sitio web"
                                        className="w-full bg-none border-none shadow"
                                        name="website"
                                        onChange={handleChangeValuesForm}
                                        value={valuesFormProfile.website}
                                    />
                                </label>
                                <label className="uppercase font-bold text-gray-600">
                                    <p>Teléfono</p>
                                    <input
                                        type="number"
                                        placeholder="Escribe tú Teléfono"
                                        className="w-full bg-none border-none shadow"
                                        name="phoneNumber"
                                        onChange={handleChangeValuesForm}
                                        value={valuesFormProfile.phoneNumber}
                                    />
                                </label>
                                <label className="uppercase font-bold text-gray-600">
                                    <p>Correo Electrónico</p>
                                    <input
                                        type="email"
                                        className="w-full bg-none border-none shadow"
                                        placeholder="Tú Email"
                                        name="email"
                                        onChange={handleChangeValuesForm}
                                        value={valuesFormProfile.email}
                                    />
                                </label>
                                {
                                    alertMessage.msg && <Alert {...alertMessage} />
                                }
                                <div className="uppercase font-bold text-gray-600 flex justify-between w-full relative p-4">
                                    {
                                        loading ?
                                            <Loader />
                                        :
                                            <>
                                                <input
                                                    type="submit"
                                                    style={{ background: '#536dff' }}
                                                    className="btn text-white rounded-lg"
                                                    value='Guardar Cambios'
                                                />
                                                <button
                                                    type="button"
                                                    className="btn rounded-lg bg-stone-200"
                                                    onClick={handleClickChangeModeForm}
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                    }

                                </div>
                            </form>
                            :
                            <>
                                <div className="absolute right-[4%] top-[4%]">
                                    <button
                                        className="btn bg-blue-500 text-white rounded-md"
                                        onClick={handleClickChangeModeForm}
                                    >Editar</button>
                                </div>
                                <div className="mb-2 shadow-sm p-2">
                                    <p className="text-xl font-bold text-left text-indigo-700">Nombre</p>
                                    {valuesFormProfile.name}
                                </div>
                                <div className="mb-2 shadow-sm p-2">
                                    <p className="text-xl font-bold text-left text-indigo-700">Correo Electrónico</p>
                                    {valuesFormProfile.email}
                                </div>
                                <div className="mb-2 shadow-sm p-2">
                                    <p className="text-xl font-bold text-left text-indigo-700">Teléfono</p>
                                    {valuesFormProfile.phoneNumber || 'Sin definir'}
                                </div>
                                <div className="mb-2 shadow-sm p-2">
                                    <p className="text-xl font-bold text-left text-indigo-700">Sitio Web</p>
                                    {valuesFormProfile.website || 'Sin definir'}
                                </div>
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default ProfileAdmin