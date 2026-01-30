const editCliente = async (cliente: any, asesorId: any, showNotification: (msg: string) => void) => {

    let url = `${process.env.REACT_APP_BASE_URL}/clients/update/${asesorId}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente),
        });

        const text = await response.text();
        let data: any;
        try {
            data = JSON.parse(text);
        } catch {
            data = null;
        }

        if (!response.ok) {
            const errorMsg = data?.message || text || response.statusText;
            showNotification('Error en la solicitud: ' + errorMsg);
            return false;
        }

        return true;
    } catch (error: any) {
        showNotification(error.message || "Ocurrió un error inesperado");
        return false;
    }
}

export default editCliente;