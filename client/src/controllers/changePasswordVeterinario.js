import clientAxios from "../config/axios";

export default function({authToken, data:{ currentPassword, newPassword }}){
    return clientAxios.put(
        '/veterinarios/profile/changepassword',
        {
            currentPassword,
            newPassword
        },
        {
            headers:{
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        }
    )
}