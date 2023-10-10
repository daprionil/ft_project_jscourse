import { useEffect, useState } from "react";
import MenuAdmin from "../components/MenuAdmin";
import useUserAuth from "../hooks/useUserAuth";

const initValuesFormProfile = {
    name: '',
    website: '',
    phoneNumber: '',
    email: ''
};

const ProfileAdmin = () => {
    const user = useUserAuth();

    const [valuesFormProfile, setValuesFormProfile] = useState(initValuesFormProfile);

    useEffect(() => {
        if(user){
            setValuesFormProfile({
                name: user.name,
                website: user.website || '',
                email: user.email,
                phoneNumber: user.phoneNumber || ''
            })
        }
    },[user]);

    return (
        <>
            <MenuAdmin />
            <div className="text-center mt-10 mb-5">
                <h2 className="font-black text-3xl">Editar Perfil</h2>
                <p className="font-medium mt-4">Modifica tu <span className="text-indigo-600">Información de Perfil</span></p>
            </div>
            <div className=" flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    <form className="flex gap-3 flex-wrap [&>label]:block [&>label>p]:mb-4 [&>label]:w-full [&>label]:mx-auto">
                        <label className="uppercase font-bold text-gray-600">
                            <p>Nombre</p>
                            <input
                                type="text"
                                placeholder="Tu nombre de perfil"
                                className="w-full bg-none border-none shadow"
                                name="name"
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
                                value={valuesFormProfile.website}
                            />
                        </label>
                        <label className="uppercase font-bold text-gray-600">
                            <p>Teléfono</p>
                            <input
                                type="text"
                                placeholder="Escribe tú Teléfono"
                                className="w-full bg-none border-none shadow"
                                name="phoneNumber"
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
                                value={valuesFormProfile.email}
                            />
                        </label>
                        <label className="uppercase font-bold text-gray-600">
                            <input
                                type="submit"
                                style={{background:'#536dff'}}
                                className="btn text-white rounded-lg"
                                value='Guardar Cambios'
                            />
                        </label>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProfileAdmin