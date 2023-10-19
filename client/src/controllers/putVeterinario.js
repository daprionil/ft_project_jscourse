import clientAxios from "../config/axios";

const putVeterinario = (authToken, {name, phoneNumber, email, website}) => {
    const dataEmptyFiltered = Object.fromEntries(
        Object.entries(
            {
                name,
                phoneNumber,
                email,
                website
            }
        ).map(([key,val]) => [key, val.trim()])
    );


    //! Generate request
    return clientAxios.put('/veterinarios/profile', dataEmptyFiltered, {
        headers:{
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        }
    })
}

export default putVeterinario