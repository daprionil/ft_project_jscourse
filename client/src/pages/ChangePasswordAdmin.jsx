import MenuAdmin from "../components/MenuAdmin"

const ChangePasswordAdmin = () => {
    return (
        <>
            <MenuAdmin />
            <div className="text-center mt-10 mb-5">
                <h2 className="font-black text-3xl">Cambiar Contraseña</h2>
                <p className="font-medium mt-4">Modifica tu <span className="text-indigo-600">contraseña aquí</span></p>
            </div>
        </>
    )
}

export default ChangePasswordAdmin