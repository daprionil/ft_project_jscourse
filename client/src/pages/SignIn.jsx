import { NavLink } from "react-router-dom"

const SignIn = () => {
    return (
        <>
            <div>
                <h1 className="text-6xl font-black text-indigo-600">
                    Crea tu cuenta y Administra tus <span className="text-black"> Pacientes</span>
                </h1>
            </div>
            <div className="px-5 py-10 bg-white rounded-lg shadow-lg">
                <form className="w-full">
                    <div className="flex flex-col w-full gap-4">
                        <label className="uppercase">
                            <span className="font-bold uppercase">Nombre</span>
                            <input
                                type="text"
                                className="w-full"
                                placeholder="Tu nombre"
                            />
                        </label>
                        <label className="uppercase">
                            <span className="font-bold uppercase">Email</span>
                            <input
                                type="email"
                                className="w-full"
                                placeholder="Tu correo electrónico"
                            />
                        </label>
                        <label className="uppercase">
                            <span className="font-bold uppercase">Password</span>
                            <input
                                type="password"
                                className="w-full"
                                placeholder="Tu Contraseña"
                            />
                        </label>
                        <label className="uppercase">
                            <span className="font-bold uppercase">Repetir Contraseña</span>
                            <input
                                type="password"
                                className="w-full"
                                placeholder="Repite tu contraseñá"
                            />
                        </label>
                        <button
                            type="submit"
                            className="w-full px-10 text-white btn md:w-min"
                            style={{ background: "black" }}
                        >Registrarme</button>
                    </div>
                </form>
                <nav className="flex flex-col md:flex-row [&>a]:text-xl md:[&>a]:text-sm md:flex-nowrap items-center justify-center md:justify-between [&>a]:text-gray-500 [&>a]:font-bold mt-10">
                    <NavLink className='hover:underline' to='/login' replace>Iniciar Sesión</NavLink>
                    <NavLink className='hover:underline'>¿ Olvidaste la contraseña ?</NavLink>
                </nav>
            </div>
        </>
    )
}

export default SignIn