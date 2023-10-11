/* eslint-disable react/prop-types */
const Alert = ({ msg, type = 'error' }) => {
    const typesAlert = {
        'error':'from-red-400 to-red-600',
        'success':'from-green-400 to-green-600'
    };

    return (
        type &&
        <div className={`text-center w-full px-5 py-2 ${typesAlert[type]} bg-gradient-to-tl font-bold text-white rounded shadow-lg`}>
            {msg}
        </div>
    )
};

//! Alert methods
//* Init values to set alert message
const initAlertValues = {msg: null, type: null};

const TIME_CLEAR_ALERT = 3000;

const clearAlertMessage = (setState) => setState(initAlertValues);
const setErrorAlertMessage = (setState, msg) => setState({ msg, type: 'error'});
const setSuccessAlertMessage = (state, setState, msg) => {
    const typeSuccess = 'success';
    setState({ msg, type: typeSuccess})
    
    setTimeout(() => {
        //! This clear the state to remove alert
        setState(state => {
            if(state.type === typeSuccess){
                return initAlertValues;
            }
            return state;
        });
    }, TIME_CLEAR_ALERT);
};

export {
    clearAlertMessage,
    setErrorAlertMessage,
    setSuccessAlertMessage,
    initAlertValues
};

//! Export main component of this document
export default Alert;