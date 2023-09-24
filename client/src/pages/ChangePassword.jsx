import { NavLink } from "react-router-dom"

const ChangePassword = () => {
    return (
        <>
            <div>
                <h1 className="text-6xl font-black text-indigo-600 ">Recupera tu acceso y no pierdas tus <span className="text-black">Pacientes</span></h1>
            </div>
            <div className="w-full px-5 py-10 bg-white rounded-lg shadow-lg">
                <form className="w-full">
                    <div className="flex flex-col w-full gap-4">
                        <label className="uppercase">
                            <span className="font-bold uppercase">Email</span>
                            <input
                                type="email"
                                className="w-full"
                                placeholder="Email de tu registro"
                            />
                        </label>
                        <button
                            type="submit"
                            className="w-full px-10 text-white whitespace-nowrap btn md:w-min"
                            style={{ background: "black" }}
                        >Enviar instrucciones</button>
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