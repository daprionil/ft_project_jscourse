import { useState } from "react"
import Alert from "./Alert";
import { ValidateForms } from "../helpers/ValidateForms";
import Loader from "./Loader";
import { usePacientesContext } from "../context/PacientesProvider";

const initValuesFormAddPacientes = {
    petname: '',
    owner: '',
    emailOwner: '',
    sintomas: '',
    dateUp: ''
};

const initAlertValues = {msg: null, type: null};

const FormAddPacientes = () => {
    const { addPaciente } = usePacientesContext();
    const [ valuesForm, setValuesForm ] = useState(initValuesFormAddPacientes);
    const [ alertMessage, setAlertMessage ] = useState(initAlertValues);
    const [ loading, setLoading ] = useState(false);

    //! Set Alert states
    const clearAlertMessage = () => setAlertMessage(initAlertValues);
    const setErrorAlertMessage = msg => setAlertMessage({ msg, type: 'error'});
    const setSuccessAlertMessage = msg => setAlertMessage({ msg, type: 'success'});

    //! Change values to form
    const handleChangeValuesForm = ({target:{name,value}}) => setValuesForm(state => ({
        ...state,
        [name]: value
    }));
    const resetValuesForm = () => setValuesForm(initValuesFormAddPacientes);

    //! Submit form to create an paciente
    const handleSubmit = evt => {
        evt.preventDefault();

        //! If exist empty values
        const validateEmptyValues = Object.values(valuesForm).filter(s => s.trim().length < 3);
        if(validateEmptyValues.length > 0){
            setErrorAlertMessage('Los campos deben tener mínimo 3 carácteres');
            return;
        }

        //! If the email is invalid
        const validateEmail = ValidateForms['email'](valuesForm.emailOwner);
        if(!validateEmail){
            setErrorAlertMessage('El email propietario no es válido');
            return;
        }

        //! Send request to create a new Paciente
        try {
            const dataNewPaciente = {
                name: valuesForm.petname,
                owner: valuesForm.owner,
                email: valuesForm.emailOwner,
                description: valuesForm.sintomas,
                dateUp: valuesForm.dateUp,
            }

            //? Start loading form
            setLoading(true);

            //? Generate request to generate a new paciente
            addPaciente(dataNewPaciente)
                .then(() => {
                    //? Set success alert
                    setAlertMessage({
                        msg: 'El paciente ha sido creado correctamente',
                        type: 'success'
                    });

                    //! Reset form
                    resetValuesForm();
                })
                .catch(err => {
                    console.log(err);
                    setErrorAlertMessage('Ha habido un error, intenta de nuevo más tarde');
                })
                .finally(() => setLoading(false));//? Clear loading form

            setSuccessAlertMessage('Su paciente se creado exitosamente');
        } catch (error) {
            console.log(error);
        }
        clearAlertMessage();
    };

    return (
        <>
            <p className="mb-10 text-lg text-center">Añade tus pacientes y <span className="font-bold text-indigo-600">administralos</span></p>
            <form
                className="bg-white py-10 px-5 rounded mb-5 md:mb-0 shadow-lg"
                onSubmit={handleSubmit}
            >
                <div className="mb-5 [&>label>input]:font-normal [&>label>textarea]:font-normal [&>label]:font-bold [&>label]:min-w-full [&>label]:flex [&>label]:flex-col space-y-2">
                    <label htmlFor="petname">
                        Mascota
                        <input
                            onChange={handleChangeValuesForm}
                            value={valuesForm.petname}
                            type="text"
                            id="petname"
                            name="petname"
                            placeholder="Nombre de la mascota"
                        />
                    </label>
                    <label htmlFor="owner">
                        Propietario
                        <input
                            onChange={handleChangeValuesForm}
                            value={valuesForm.owner}
                            type="text"
                            id="owner"
                            name="owner"
                            placeholder="Nombre del propietario"
                        />
                    </label>
                    <label htmlFor="emailOwner">
                        Email
                        <input
                            onChange={handleChangeValuesForm}
                            value={valuesForm.emailOwner}
                            type="text"
                            id="emailOwner"
                            name="emailOwner"
                            placeholder="Correo electrónico"
                        />
                    </label>
                    <label htmlFor="dateUp">
                        Fecha de Alta
                        <input
                            onChange={handleChangeValuesForm}
                            value={valuesForm.dateUp}
                            type="date"
                            id="dateUp"
                            name="dateUp"
                            placeholder="Correo electrónico"
                        />
                    </label>
                    <label htmlFor="dateUp">
                        Sintomas
                        <textarea
                            onChange={handleChangeValuesForm}
                            value={valuesForm.sintomas}
                            id="dateUp"
                            name="sintomas"
                            placeholder="Sintomas de la mascota"
                            className="max-h-32"
                        />
                    </label>
                    <label>
                        {
                            alertMessage.msg && <Alert {...alertMessage} />
                        }
                    </label>
                    <label className="relative" htmlFor="btnsubmit">
                        {
                            loading ?
                                <Loader />
                            : <button
                                type="submit"
                                id="btnsubmit"
                                style={{ background: '#4f46e5' }}
                                className="w-full btn shadow-sm text-white font-bold"
                            >Agregar paciente</button>
                        }
                    </label>
                </div>
            </form>
        </>
    )
}

export default FormAddPacientes