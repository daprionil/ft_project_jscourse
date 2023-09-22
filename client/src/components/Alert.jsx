/* eslint-disable react/prop-types */
const Alert = ({msg, type = 'error'}) => {
  return (
    <div className={`text-center w-full px-5 py-2 ${type === 'error' ? 'from-red-400 to-red-600' : 'from-green-400 to-green-600'} bg-gradient-to-tl font-bold text-white rounded shadow-lg`}>
        {msg}
    </div>
  )
}

export default Alert