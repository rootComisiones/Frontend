const getPeriodosBySagencia = async (
    sagenciaId: number,
    // showNotification: (msg: string) => void
) => {
    const url = `${process.env.REACT_APP_BASE_URL}/period/aranceles/agencia/${sagenciaId}/periodos`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            // showNotification('Error en la solicitud: ' + errorData.message);
            return [];
        }
        const data = await response.json();
        console.log('Respuesta del servidor - Periodos por Sagenciaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:', data);
        return data.periodos || [];
    } catch (error: any) {
        // showNotification(error.message || "Ocurrió un error inesperado");
        return [];
    }
};

export default getPeriodosBySagencia;