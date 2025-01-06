const editCliente = async (cliente: any, asesorId: any) => {

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
            throw new Error('Error en la solicitud: ' + errorData.message);
        }
        const data = await response.json();

        console.log('Respuesta del servidor:', data);
        return true
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return false
    }
}

export default editCliente;