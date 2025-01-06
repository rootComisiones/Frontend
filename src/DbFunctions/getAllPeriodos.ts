const getAllPeriodos = async (companyId: number) => {

    let url = `${process.env.REACT_APP_BASE_URL}/period/company/${companyId}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error('Error en la solicitud: ' + errorData.message);
        }
        const data = await response.json();

        const formatDateToMonthYear = (dateString: string) => {
            const date = new Date(dateString);
            
            const month = date.getUTCMonth() + 1; 
            
            const year = date.getUTCFullYear();
            
            const formattedDate = `${month.toString().padStart(2, '0')}/${year}`;
            
            return formattedDate;
        }

        data.map((period: {id: number, fecha_creacion: string, compa_ia_id: number}) => {
            const fecha = formatDateToMonthYear(period.fecha_creacion);
            period.fecha_creacion = fecha;
        })
        
        console.log('Respuesta del servidor:', data);
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return []
    }
}

export default getAllPeriodos;