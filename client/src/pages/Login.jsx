import { NavLink } from "react-router-dom";
import FormAuth from "../components/FormAuth";

const Login = () => {
  return (
    <>
      <div className="p-2">
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia Sesión y Administra tus <span className="text-black">pacientes</span>
        </h1>
      </div>
      <div className="w-full">
        <FormAuth />
        <nav className="flex flex-col md:flex-row [&>a]:text-xl md:[&>a]:text-sm md:flex-nowrap items-center justify-center md:justify-between [&>a]:text-gray-500 [&>a]:font-bold mt-10">
          <NavLink className='hover:underline' to='signin'>Registrarse</NavLink>
          <NavLink className='hover:underline'>¿ Olvidate la contraseña ?</NavLink>
        </nav>
      </div>
    </>
  )
}

export default Login;