import { NavLink } from "react-router-dom"

const MenuAdmin = () => {
    const isActiveLink = ({isActive}) => (
        isActive ? 'underline' : 'no-underline'
    );
    
    return (
        <nav className="list-none font-bold uppercase text-gray-500 flex gap-4 items-center justify-start">
            <NavLink className={isActiveLink} to='/admin/profile'>
                <li>Perfil</li>
            </NavLink>
            <NavLink className={isActiveLink} to='/admin/changepassword'>
                <li>Cambiar Contraseña</li>
            </NavLink>
        </nav>
    )
}

export default MenuAdmin