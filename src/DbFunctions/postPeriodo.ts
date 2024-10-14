const url = process.env.REACT_APP_BASE_URL;

const postPeriodo = async ( fecha: string, idCompania: number ) => {    

    console.log(fecha, idCompania);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fecha_creacion: fecha,
            compa_ia_id: idCompania
        })
    };

    try {
        const response = await fetch(`${url}/period/create`, options);
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

export default postPeriodo;