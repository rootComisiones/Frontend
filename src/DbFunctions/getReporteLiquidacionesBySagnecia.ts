const getReporteLiquidacionesBySagencia = async (
    sagenciaId: number,
    periodoId: number,
    // showNotification: (msg: string) => void
) => {
    const url = `${process.env.REACT_APP_BASE_URL}/liquidation/aranceles/periodo/${periodoId}/agencia/${sagenciaId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            // showNotification('Error en la solicitud: ' + errorData.message);
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        // showNotification(error.message || "Ocurrió un error inesperado");
        return null;
    }
};

export default getReporteLiquidacionesBySagencia;