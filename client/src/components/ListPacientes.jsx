import { usePacientesContext } from "../context/PacientesProvider"
import PacienteCard from "./PacienteCard"

const ListPacientes = ({ pacientes }) => {
    const { setEditPaciente } = usePacientesContext();

    const pacienteToEdit = (paciente) => {
        setEditPaciente(paciente);
    };

    return (
        pacientes.length ?
            (
                <>
                    <h2 className='font-nlack text-3xl text-center'>Listado de pacientes</h2>
                    <p className=' text-center text-xl mt-05 mb-10 '>
                        Administra tus<span className='text-indigo-600 '> Pacientes y Citas</span>
                    </p>
                    <div className='w-full'>
                        {
                            pacientes.map((paciente) => (
                                <PacienteCard
                                    key={paciente._id}
                                    paciente={paciente}
                                    editPaciente={pacienteToEdit}
                                />
                            ))
                        }
                    </div>
                </>
            )
            : (
                <>
                    <h2 className='font-nlack text-3xl text-center'>No hay pacientes</h2>
                    <p className=' text-center text-xl mt-05 mb-10 '>
                        Comienza agregando pacientes <span className='text-indigo-600 '> y aparecerán en este lugar</span>
                    </p>
                </>
            )

    )
}

export default ListPacientes