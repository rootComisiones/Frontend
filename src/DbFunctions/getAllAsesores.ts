import { AsesorData } from "../Types/Types";

const getAllAsesores = async (
    page: number = 1,
    limit: number = 50,
    showNotification: (msg: string) => void
): Promise<{ asesores: AsesorData[]; pagination: any }> => {
    let url = `${process.env.REACT_APP_BASE_URL}/asesor?page=${page}&limit=${limit}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            showNotification('Error en la solicitud: ' + errorData.message);
            return { asesores: [], pagination: null };
        }
        const data = await response.json();

        // data debe tener { asesores: [], pagination: {...} }
        let cleanData = [...(data.asesores || []), ...(data.coordinadores || []), ...(data.managers || [])];

        let finalData = cleanData.sort((a, b) => {
            if (a.username.toLowerCase() < b.username.toLowerCase()) {
                return -1;
            }
            if (a.username.toLowerCase() > b.username.toLowerCase()) {
                return 1;
            }
            return 0;
        });

        return {
            asesores: finalData,
            pagination: data.pagination || null
        };
    } catch (error: any) {
        showNotification(error.message || "Ocurrió un error inesperado");
        console.error('Error en la solicitud:', error);
        return { asesores: [], pagination: null };
    }
};

export default getAllAsesores;