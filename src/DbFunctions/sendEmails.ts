const sendEmails = async (data: any, showNotification: (msg: string) => void) => {

    let newUrl = `${process.env.REACT_APP_BASE_URL}/liquidation/send-email-mony`;    

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(newUrl, options);
        if (!response.ok) {
            const errorData = await response.json();
            console.log('Error en la solicitudd: ' + errorData.message);
            return false
        }
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        return true
    } catch (error: any) {
        console.error('Error en la solicitud:', error);
        showNotification(error.message || "Ocurrió un error inesperado");
        return false
    }
}

export default sendEmails;