
export const deleteUser = async (id: any, rol: string) => {
    console.log('id a eliminar',id);
    const urlAsesor = `${process.env.REACT_APP_BASE_URL}/asesor/delete/${id}/${rol}`
    const urlSubAgencia = `${process.env.REACT_APP_BASE_URL}/sagencia/delete/${id}`
    const finalUrl = rol === 'sagencia' ? urlSubAgencia : urlAsesor;
    
    try {
        const response = await fetch(finalUrl, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar el ${rol}`);
        }

        const data = await response.json();
        console.log(data.message);

    } catch (error: any) {
        console.error('Error:', error.message);
    }
};