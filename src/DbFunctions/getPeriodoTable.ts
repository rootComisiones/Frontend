const getPeriodoTable = async (periodoId: any, showNotification: (msg: string) => void) => {

    let url = `${process.env.REACT_APP_BASE_URL}/liquidation/data/archivo/${periodoId}`

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
           console.log('Error en la solicitud: ' + errorData.message);
        }
        const data = await response.json();
        console.log('Respuesta del servidorazoooooo:', data);
        return data
    } catch (error: any) {
        console.error('Error en la solicitud:', error);
        showNotification(error.message || "Ocurrió un error inesperado");
    }
}

export default getPeriodoTable;