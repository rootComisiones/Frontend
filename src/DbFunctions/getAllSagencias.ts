const getAllSagencias = async (showNotification: (msg: string) => void) => {

    let url = `${process.env.REACT_APP_BASE_URL}/sagencia/all`;
    console.log(909934348394939);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            showNotification('Error en la solicitud: ' + errorData.message);
            return [];
        }
        const data = await response.json();

        console.log('Respuesta del servidor sagenciassssssssssss:', data.data);
        return data.data
    } catch (error: any) {
        showNotification(error.message || "Ocurrió un error inesperado");
        console.error('Error en la solicitud:', error);
        return []
    }
}

export default getAllSagencias;