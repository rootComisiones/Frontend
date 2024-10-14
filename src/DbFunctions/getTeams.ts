import { Dispatch, SetStateAction } from "react";
import { Equipo } from "../Types/Types";

type SetEquipos = Dispatch<SetStateAction<Equipo[]>>;

const getTeams = async (setAllTeams: SetEquipos) => {  

    let url = `${process.env.REACT_APP_BASE_URL}/teams/all`;    

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error('Error en la solicitud: ' + errorData.message);
        }
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        setAllTeams(data)
    } catch (error) {
        setAllTeams([])
        console.error('Error en la solicitud:', error);
    }
}

export default getTeams;