import { NavLink } from "react-router-dom"
import LogOutButton from "./LogOutButton"

const Header = () => {
    return (
        <header className="py-10 bg-indigo-600">
            <div className="container flex flex-col items-center justify-between mx-auto md:flex-row">
                <h1 className="text-xl font-black text-indigo-200">Administrador de Pacientes <span className="text-white">Veterinaria</span></h1>
                <nav className="flex flex-col items-center gap-4 text-sm font-bold text-center text-white uppercase md:flex-row mt-05 lg:mt-0">
                    <NavLink to="/admin">Pacientes</NavLink>
                    <NavLink to="/admin">Perfil</NavLink>
                    <LogOutButton/>
                </nav>
            </div>
        </header>
    )
}

export default Header