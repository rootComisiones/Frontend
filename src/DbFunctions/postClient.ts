import { ClientData } from "../Types/Types";

const url = process.env.REACT_APP_BASE_URL;

const postClient = async ( newClient: ClientData ) => {    

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
            throw new Error(errorData.message);
        }
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

export default postClient;

