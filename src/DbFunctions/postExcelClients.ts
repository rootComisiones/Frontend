const url = process.env.REACT_APP_BASE_URL;

const postExcelClients = async ( file: File ) => {    

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
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

export default postExcelClients;