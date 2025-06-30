const url = process.env.REACT_APP_BASE_URL;

const postExcelClients = async ( file: File, showNotification: (msg: string) => void ) => {    

    const formData = new FormData();
    
    formData.append('excelFile', file);   
    

    try {
        const response = await fetch(`${url}/clients/register/Excel`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Archivo enviado correctamente:', data);
        } else {
            const errorData = await response.json();
            console.error('Error al enviar el archivo', errorData);
        }
    } catch (error: any) {
        console.error('Error en la solicitud:', error);
        showNotification(error.message || "Ocurrió un error inesperado");
    }
}

export default postExcelClients;