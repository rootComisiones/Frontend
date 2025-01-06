const getResults = async (periodo_id: any, id: any, rol: any) => {

    let url = `${process.env.REACT_APP_BASE_URL}/liquidation/total/${periodo_id}/${id}/${rol}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error('Error en la solicitud: ' + errorData.message);
        }
        const data = await response.json();
        console.log('Respuesta del servidor RESULTADOS:', data);

        return data
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return null
    }
}

export default getResults;