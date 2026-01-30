import { Dispatch, SetStateAction } from "react";
import { Coordinador } from "../Types/Types";

const getCoordinadores = async (id: number, showNotification: (msg: string) => void) => {
    const url = `${process.env.REACT_APP_BASE_URL}/manager/relations/${id}`;

    try {
        const response = await fetch(url);

        const text = await response.text();
        let data: any;
        try {
            data = JSON.parse(text);
        } catch {
            data = null;
        }

        if (!response.ok) {
            // No mostrar notificación - es esperado cuando no hay coordinadores
            return null;
        }

        return data;
    } catch (error: any) {
        // Solo mostrar error en casos de fallo de red real
        console.error('Error en getCoordinadores:', error);
        return null;
    }
}

export default getCoordinadores;