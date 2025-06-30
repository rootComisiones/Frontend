const getAllClientes = async(showNotification: (msg: string) => void) => {

    let url = `${process.env.REACT_APP_BASE_URL}/clients`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            showNotification('Error en la solicitud: ' + errorData.message);
            return [];
        }
        const data = await response.json();
        
        console.log('Respuesta del servidor:', data);
        return data;
    } catch (error: any) {
        console.error('Error en la solicitud:', error);
        showNotification(error.message || "Ocurrió un error inesperado");
        return []
    }
}

export default getAllClientes;