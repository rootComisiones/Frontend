const editAsesor = async (asesor: any, asesorId: any, rol: any) => {

    const rolUrl =rol === 'sagencia' ? 'sagencia' : rol === 'coordinador' ? 'coordinadores' : rol === 'asesor' ? 'asesor' : 'manager'

    let url = `${process.env.REACT_APP_BASE_URL}/${rolUrl}/update/${asesorId}`;    

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(asesor),
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.log('Error en la solicitud: ' + errorData.message);
            return false
        }
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        return true
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return false
    }
}

export default editAsesor;