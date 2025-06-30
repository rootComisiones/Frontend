const getResults = async (periodo_id: any, id: any, rol: any, showNotification: (msg: string) => void) => {

    let url = `${process.env.REACT_APP_BASE_URL}/liquidation/total/${periodo_id}/${id}/${rol}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            showNotification('Error en la solicitud: ' + errorData.message);
            return null;
        }
        const data = await response.json();
        console.log('Respuesta del servidor RESULTADOS:', data);

        return data
    } catch (error: any) {
        console.error('Error en la solicitud:', error);
        showNotification(error.message || "Ocurrió un error inesperado");
        return null
    }
}

export default getResults;