import { useState } from 'react'
import FormAddPacientes from '../components/FormAddPacientes'
import { usePacientesContext } from '../context/PacientesProvider';
import ListPacientes from '../components/ListPacientes';

const AdminPacientes = () => {
    const { pacientes } = usePacientesContext();
    const [ displayForm, setDisplayForm ] = useState(true);

    return (
        <div className="flex flex-col gap-4 md:flex-row">
            <button
                    className='bg-indigo-600 btn whitespace-nowrap text-white mx-auto md:hidden'
                    onClick={() => setDisplayForm(s => !s)}
            >
                { displayForm ? 'Ocultar formulario' : 'Mostrar Formulario'}
            </button>
            <div className={`md:w-2/5 ${displayForm ? 'block' : 'hidden'} md:block w-full`}>
                <h2 className='font-nlack text-3xl text-center'>Administrador de Pacientes</h2>
                <p className="mb-10 text-lg text-center">Añade tus pacientes y <span className="font-bold text-indigo-600">administralos</span></p>
                <FormAddPacientes />
            </div>
            <div className="w-full md:w-3/5">
                <ListPacientes pacientes={pacientes}/>
            </div>
        </div>
    )
}

export default AdminPacientes;