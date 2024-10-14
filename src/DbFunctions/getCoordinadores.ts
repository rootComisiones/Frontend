import { Dispatch, SetStateAction } from "react";
import { Coordinador } from "../Types/Types";

const getCoordinadores = async (id: number) => {

    // let url = `${process.env.REACT_APP_BASE_URL}/teams/coordinadores/${id}`;    
    let url = `${process.env.REACT_APP_BASE_URL}/manager/relations/${id}`

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
           console.log('Error en la solicitud: ' + errorData.message);
        }
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        return data
    } catch (error) {
        console.log('Error en la solicitud:', error);
    }
}

export default getCoordinadores;