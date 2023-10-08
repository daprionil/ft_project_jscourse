import { useEffect, useRef, useState } from "react"
import Alert from "./Alert";
import { ValidateForms } from "../helpers/ValidateForms";
import Loader from "./Loader";
import { usePacientesContext } from "../context/PacientesProvider";

const TIME_CLEAR_ALERT = 3000;

const initValuesFormAddPacientes = {
    petname: '',
    owner: '',
    emailOwner: '',
    sintomas: '',
    dateUp: ''
};

const initAlertValues = {msg: null, type: null};

const FormAddPacientes = () => {
    //? Context properties
    const { addPaciente, updatePaciente, modeForm, pacienteForm, clearEditMode } = usePacientesContext();
    
    const formRefElement = useRef();

    //! local Form values
    const [ valuesForm, setValuesForm ] = useState(initValuesFormAddPacientes);
    const [ alertMessage, setAlertMessage ] = useState(initAlertValues);
    const [ loading, setLoading ] = useState(false);
    
    //! Set Alert states
    const clearAlertMessage = () => setAlertMessage(initAlertValues);
    const setErrorAlertMessage = msg => setAlertMessage({ msg, type: 'error'});
    const setSuccessAlertMessage = msg => {
        const typeSuccess = 'success';
        setAlertMessage({ msg, type: typeSuccess})
        setTimeout(() => {
            if(alertMessage === typeSuccess){
                clearAlertMessage();
            }
        }, TIME_CLEAR_ALERT);
    };
    
    //! Change values to form
    const handleChangeValuesForm = ({target:{name,value}}) => {
        setValuesForm(state => ({
            ...state,
            [name]: value
        }))
    };
    const resetValuesForm = () => setValuesForm(initValuesFormAddPacientes);

    //* Set paciente in values form
    const setPacienteIntoFormValues = paciente => {
        const {dateUp, email, owner, name, description} = paciente;
        
        //? Format values to set in state to valuesForm
        const dateFormat = new Date(dateUp).toLocaleDateString().split('/').reverse().join('-');// --> AAAA-MM-dd
        const datePacienteEditIntoForm = {
            dateUp: dateFormat,
            emailOwner: email,
            owner,
            petname: name,
            sintomas: description
        };
        
        //? Set values form
        setValuesForm(datePacienteEditIntoForm);
    };

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

            if(modeForm){//? If modeForm is true, it is in edit mode and will update the paciente.
                updatePaciente(pacienteForm._id, dataNewPaciente)
                    .then(() => {
                        //? Set success alert
                        setSuccessAlertMessage('El paciente fue editado correctamente');

                        clearEditMode();
                        resetValuesForm();
                    })
                    .catch(() => {
                        setErrorAlertMessage('Ha habido un error, intenta de nuevo más tarde');
                    })
                    .finally(() => {
                        setLoading(false)//? Clear loading form
                    });
            }else{
                //? Generate request to create a new paciente
                addPaciente(dataNewPaciente)
                .then(() => {
                    //? Set success alert
                    setSuccessAlertMessage('El paciente ha sido creado correctamente');

                    //! Reset form
                    resetValuesForm();
                })
                .catch(() => {
                    setErrorAlertMessage('Ha habido un error, intenta de nuevo más tarde');
                })
                .finally(() => {
                    setLoading(false)//? Clear loading form
                });
            }
        } catch (error) {
            console.log(error);
        }
        clearAlertMessage();
    };

    const handleClickCancel = () => {
        clearEditMode();
        resetValuesForm();
        clearAlertMessage();
    }

    useEffect(() => {
        //! When modeForm or pacienteForm is changed, the formValues will be changed
        if(modeForm && !!pacienteForm){
            //! Scroll Page to form
            window.scrollTo({
                top: formRefElement.current.offsetTop - 150,
                behavior: 'smooth'
            });

            //! If modeForm is true/edit, set values from contextProvider
            setPacienteIntoFormValues(pacienteForm);
        }
    },[modeForm, pacienteForm]);

    return (
        <>
            <form
                className="bg-white py-10 px-5 rounded mb-5 md:mb-0 shadow-lg"
                onSubmit={handleSubmit}
                ref={formRefElement}
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
                            id="dateUp"
                            name="sintomas"
                            placeholder="Sintomas de la mascota"
                            value={valuesForm.sintomas}
                            className="max-h-32"
                        />
                    </label>
                    <label>
                        {
                            alertMessage.msg && <Alert {...alertMessage} />
                        }
                    </label>
                    <div className="relative block">
                        {
                            loading ?
                                <Loader />
                            : <div className={`${modeForm ? 'flex items-center justify-between': ' block'}`}>
                                <button
                                    type="submit"
                                    style={{ background: `${modeForm ? '#0051ff' : '#4f46e5'}` }}
                                    className={`${modeForm ? "" : 'w-full'} btn shadow-sm text-white font-bold`}
                                >
                                    {modeForm ? 'Editar Paciente' : 'Agregar paciente'}
                                </button>
                                <button
                                    className={`${!modeForm ? 'hidden' : 'block'}`}
                                    type="button"
                                    onClick={handleClickCancel}
                                >
                                    Cancelar
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </form>
        </>
    )
};

export default FormAddPacientes;