const editCliente = async (cliente: any, asesorId: any, showNotification: (msg: string) => void) => {

    let url = `${process.env.REACT_APP_BASE_URL}/clients/update/${asesorId}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente),
        });
        if (!response.ok) {
            const errorData = await response.json();
            showNotification('Error en la solicitud: ' + errorData.message);
        }
        const data = await response.json();

        console.log('Respuesta del servidor:', data);
        return true
    } catch (error:any) {
        console.error('Error en la solicitud:', error);
        showNotification(error.message || "Ocurrió un error inesperado");
        return false
    }
}

export default editCliente;