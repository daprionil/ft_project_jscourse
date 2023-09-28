import { useNavigate } from "react-router-dom"

const NotFound404 = () => {
    const navigate = useNavigate();
    return (
        <div className="grid items-center justify-center h-screen">
            <main className="p-10 text-center bg-white rounded shadow-lg">
                <h1 className="text-4xl font-black ">
                    Opss! Estás en un <br />
                    <span className="text-indigo-600">página</span> inexistente
                </h1>
                <div className="flex items-center justify-center gap-5 pt-4 flex-nowrap">
                    Ir a la
                    <button
                        className="font-black text-white bg-indigo-600 btn whitespace-nowrap"
                        onClick={() => navigate('/')}
                    >Página Principal</button>
                </div>
            </main>
        </div>
    )
}

export default NotFound404