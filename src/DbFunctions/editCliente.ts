const editCliente = async (cliente: any, asesorId: any) => {

    let url = `${process.env.REACT_APP_BASE_URL}/clients/update/${asesorId}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: cliente,
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error('Error en la solicitud: ' + errorData.message);
        }
        const data = await response.json();

        console.log('Respuesta del servidor:', data);
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

export default editCliente;