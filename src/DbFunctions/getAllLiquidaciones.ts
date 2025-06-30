const getAllLiquidaciones = async (periodo_id: number, showNotification: (msg: string) => void) => {

    let url = `${process.env.REACT_APP_BASE_URL}/liquidation/period/${periodo_id}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            showNotification('Error en la solicitud: ' + errorData.message);
            return [];
        }
        const data = await response.json();
        
        console.log('Respuesta del servidor:', data);
        return data.liquidaciones;
    } catch (error: any) {
        showNotification(error.message || "Ocurrió un error inesperado");
        console.error('Error en la solicitud:', error);
        return []
    }
}

export default getAllLiquidaciones;