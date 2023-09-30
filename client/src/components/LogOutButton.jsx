import { useAuthContext } from "../context/AuthProvider";

const LogOutButton = () => {
    const { logOut } = useAuthContext();

    const handlerClickLogOut = () => {
        logOut();
    };

    return (
        <button
            className="px-2 py-1 text-indigo-300 transition-all duration-300 ease-out bg-white rounded-sm hover:shadow-lg hover:text-indigo-900"
            onClick={handlerClickLogOut}
        >
            Cerrar Sesion
        </button>
    )
}

export default LogOutButton