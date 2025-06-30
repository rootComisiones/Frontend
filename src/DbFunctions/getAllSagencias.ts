const getAllSagencias = async () => {

    let url = `${process.env.REACT_APP_BASE_URL}/sagencia/all`;
    console.log(909934348394939);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error('Error en la solicitud: ' + errorData.message);
        }
        const data = await response.json();

        console.log('Respuesta del servidor tobiiiiiiiiiiiiiiiiii:', data.data);
        return data.data
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return []
    }
}

export default getAllSagencias;