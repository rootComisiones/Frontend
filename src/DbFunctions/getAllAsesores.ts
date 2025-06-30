import { Dispatch, SetStateAction } from "react";
import { AsesorData } from "../Types/Types";

const getAllAsesores = async (setAllAsesores: Dispatch<SetStateAction<AsesorData[]>>, showNotification: (msg: string) => void) => {

    let url = `${process.env.REACT_APP_BASE_URL}/clients/possible-asesor`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            showNotification('Error en la solicitud: ' + errorData.message);
        }
        const data = await response.json();
        let cleanData = [...data.asesores, ...data.coordinadores, ...data.managers];

        let finalData = cleanData.sort((a, b) => {
            if (a.username.toLowerCase() < b.username.toLowerCase()) {
                return -1;
            }
            if (a.username.toLowerCase() > b.username.toLowerCase()) {
                return 1;
            }
            return 0;
        });

        console.log('Respuesta del servidor:', finalData);
        setAllAsesores(finalData)
    } catch (error: any) {
        showNotification(error.message || "Ocurrió un error inesperado");
        console.error('Error en la solicitud:', error);
        return []
    }
}

export default getAllAsesores;