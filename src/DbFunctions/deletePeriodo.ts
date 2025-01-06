export const deletePeriodo = async (periodo_id: any) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/period/delete/${periodo_id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar el periodo.`);
        }

        const data = await response.json();
        console.log(data.message); 

    } catch (error: any) {
        console.error('Error:', error.message);
    }
};