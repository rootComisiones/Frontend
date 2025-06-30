export const deletePeriodo = async (periodo_id: any, showNotification: (msg: string) => void) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/period/delete/${periodo_id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            showNotification('Error al eliminar el periodo.');
            return
        }

        const data = await response.json();
        console.log(data.message);

    } catch (error: any) {
        console.log('Error al eliminar el periodo:', error.message);
        
        showNotification(error.message || "Ocurrió un error inesperado");
    }
};