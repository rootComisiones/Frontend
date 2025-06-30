const url = process.env.REACT_APP_BASE_URL;

const postPeriodo = async ( fecha: string, idCompania: number, showNotification: (msg: string) => void ) => {    

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
            showNotification('Error en la solicitud: ' + errorData.message);
            return
        }
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
    } catch (error: any) {
        console.error('Error en la solicitud:', error);
        showNotification(error.message || "Ocurrió un error inesperado");
    }
}

export default postPeriodo;