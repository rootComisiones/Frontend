const getAllClientes = async (page = 1, limit = 50, showNotification: (msg: string) => void) => {
    let url = `${process.env.REACT_APP_BASE_URL}/clients?page=${page}&limit=${limit}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            showNotification('Error en la solicitud: ' + errorData.message);
            return { clients: [], pagination: null };
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        showNotification(error.message || "Ocurrió un error inesperado");
        return { clients: [], pagination: null };
    }
}
export default getAllClientes;