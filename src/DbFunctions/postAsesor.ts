import { AsesorData } from "../Types/Types";

const urlAsesor = `${process.env.REACT_APP_BASE_URL}/asesor/register`;
const urlCoordinador = `${process.env.REACT_APP_BASE_URL}/coordinadores/create`;
const urlManager = `${process.env.REACT_APP_BASE_URL}/manager/register`;
const urlSagencia =  `${process.env.REACT_APP_BASE_URL}/sagencia/register`;

const postAsesor = async (newAsesor: AsesorData, type: string) => {

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
            return false
        }
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        return true
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return false
    }
}

export default postAsesor;