import formatDate from "../helpers/formatDate";

const PacienteCard = ({paciente, editPaciente, removePaciente}) => {
    const { dateUp, description, email, name, owner } = paciente;
    
    return (
        <div className="m-5 bg-white shadow-md px-5 py-6">
            <p className="font-bold uppercase text-indigo-600">Nombre: <span className="font-normal normal-case text-black">{name}</span></p>
            <p className="font-bold uppercase text-indigo-600">Propietario: <span className="font-normal normal-case text-black">{owner}</span></p>
            <p className="font-bold uppercase text-indigo-600">Email Contacto: <span className="font-normal normal-case text-black">{email}</span></p>
            <p className="font-bold uppercase text-indigo-600">Fecha de Alta: <span className="font-normal normal-case text-black">{formatDate(dateUp)}</span></p>
            <p className="font-bold uppercase text-indigo-600">Sintomas: <span className="font-normal normal-case text-black">{description}</span></p>
            <div className="flex justify-between my-5 font-bold text-white [&>button]:transition-all [&>button]:duration-200 [&>button:hover]:transform [&>button:hover]:scale-105">
                <button
                    className="px-4 py-2 rounded shadow bg-indigo-600"
                    onClick={() => editPaciente(paciente)}
                >
                    Editar
                </button>
                <button
                    className="px-4 py-2 rounded shadow bg-red-600"
                    onClick={() => removePaciente(paciente)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default PacienteCard;