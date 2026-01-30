import { error } from "console";
import { AsesorData } from "../Types/Types";

const urlAsesor = `${process.env.REACT_APP_BASE_URL}/asesor/register`;
const urlCoordinador = `${process.env.REACT_APP_BASE_URL}/coordinadores/create`;
const urlManager = `${process.env.REACT_APP_BASE_URL}/manager/register`;
const urlSagencia =  `${process.env.REACT_APP_BASE_URL}/sagencia/register`;

const postAsesor = async (newAsesor: AsesorData, type: string, showNotification: (msg: string) => void) => {

    let newUrl = "";

    type === "asesor" ? newUrl = urlAsesor : type === "coordinador" ? newUrl = urlCoordinador : type === 'sagencia' ? newUrl = urlSagencia : newUrl = urlManager;

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
            console.log('Error en la solicitudd: ' + errorData.message);
            showNotification(errorData.message || "Ocurrió un error inesperado");
            return false
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

export default postAsesor;