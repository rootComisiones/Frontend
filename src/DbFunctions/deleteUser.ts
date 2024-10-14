
export const deleteUser = async (id: any, rol: string) => {
    const url = rol === 'asesor' ? 'asesor' : 'clients'
    try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${url}/delete/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar el ${rol}`);
        }

        const data = await response.json();
        console.log(data.message); // Mostrar el mensaje de éxito

        // Aquí podrías hacer algo adicional, como actualizar la lista de clientes
    } catch (error: any) {
        console.error('Error:', error.message);
    }
};