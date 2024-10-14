import { AsesorData } from "../Types/Types";

const urlAsesor = `${process.env.REACT_APP_BASE_URL}/asesor/register`;
const urlCoordinador = `${process.env.REACT_APP_BASE_URL}/coordinadores/create`;
const urlManager = `${process.env.REACT_APP_BASE_URL}/manager/register`;

const postAsesor = async (newAsesor: AsesorData, type: string) => {

    let newUrl = "";

    type === "asesor" ? newUrl = urlAsesor : type === "coordinador" ? newUrl = urlCoordinador : newUrl = urlManager

    console.log(newAsesor, type, newUrl);
    

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAsesor)
    };

    try {
        const response = await fetch(newUrl, options);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error('Error en la solicitudd: ' + errorData.message);
        }
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

export default postAsesor;