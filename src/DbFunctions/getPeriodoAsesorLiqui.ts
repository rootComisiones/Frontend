const getPeriodoAsesorLiqui = async (periodo_id: string, asesor_id: string, role: string) => {

    let url = `${process.env.REACT_APP_BASE_URL}/liquidation/aranceles/${periodo_id}/${asesor_id}/${role}`;

    console.log(url);
    

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error('Error en la solicitud: ' + errorData.message);
        }
        const data = await response.json();

        const total = data
            .filter((item: any) => item !== null)
            .reduce((acc: any, curr: any) => {
                return acc + Number(curr.total);
            }, 0);

        console.log('Respuesta del servidor:', data);
        return {data, total};
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return {data: [], total: 0}
    }
}

export default getPeriodoAsesorLiqui;