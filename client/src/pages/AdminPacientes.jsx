import { useState } from 'react'
import FormAddPacientes from '../components/FormAddPacientes'

const AdminPacientes = () => {
    const [ displayForm, setDisplayForm ] = useState(true);

    return (
        <div className="flex flex-col gap-4 md:flex-row">
            <button
                    className='bg-indigo-600 btn whitespace-nowrap text-white mx-auto md:hidden'
                    onClick={() => setDisplayForm(s => !s)}
                >{ displayForm ? 'Ocultar formulario' : 'Mostrar Formulario'}</button>
            <div className={`md:w-2/5 ${displayForm ? 'block' : 'hidden'} md:block`}>
                <FormAddPacientes />
            </div>
            <div className="w-1/2 md:w-3/5">
                /Lista de pacientes
            </div>
        </div>
    )
}

export default AdminPacientes;