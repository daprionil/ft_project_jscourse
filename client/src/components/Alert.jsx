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
}

export default Alert;