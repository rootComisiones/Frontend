import { Dispatch, SetStateAction } from "react";
import { Equipo } from "../Types/Types";

type SetEquipos = Dispatch<SetStateAction<Equipo[]>>;

const getTeams = async (setAllTeams: SetEquipos, showNotification: (msg: string) => void) => {  

    let url = `${process.env.REACT_APP_BASE_URL}/teams/all`;    

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            showNotification('Error en la solicitud: ' + errorData.message);
            return;
        }
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        setAllTeams(data)
    } catch (error: any) {
        setAllTeams([])
        console.error('Error en la solicitud:', error);
        showNotification(error.message || "Ocurrió un error inesperado");
    }
}

export default getTeams;