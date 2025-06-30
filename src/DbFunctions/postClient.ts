import { ClientData } from "../Types/Types";

const url = process.env.REACT_APP_BASE_URL;

const postClient = async (newClient: ClientData, showNotification: (msg: string) => void) => {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newClient)
    };

    try {
        const response = await fetch(`${url}/clients/register`, options);
        if (!response.ok) {
            const errorData = await response.json();
            showNotification(errorData.message || "Ocurrió un error inesperado");
            return false;
        }
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        return true
    } catch (error: any) {
        console.error('Error en la solicitud:', error);
        showNotification(error.message || "Ocurrió un error inesperado");
        return false
    }
}

export default postClient;