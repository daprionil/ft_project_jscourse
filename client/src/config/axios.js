import axios from "axios";

//Crea una configuración base de axios
const clientAxios = axios.create({
    // URL del cliente axios
    baseURL: `${import.meta.env.VITE_API_URL_SERVER}/api`
});

export default clientAxios;