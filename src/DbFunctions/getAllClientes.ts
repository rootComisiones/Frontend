const getAllClientes = async() => {

    let url = `${process.env.REACT_APP_BASE_URL}/clients`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error('Error en la solicitud: ' + errorData.message);
        }
        const data = await response.json();
        
        console.log('Respuesta del servidor:', data);
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return []
    }
}

export default getAllClientes;