const url = process.env.REACT_APP_BASE_URL;

const postExcelClients = async ( file: File, showNotification: (msg: string) => void ) => {    

    const formData = new FormData();
    
    formData.append('excelFile', file);   
    

    try {
        const response = await fetch(`${url}/clients/register/Excel`, {
            method: 'POST',
            body: formData,
        });

        const text = await response.text();
        let data: any;
        try {
            data = JSON.parse(text);
        } catch {
            data = null;
        }

        if (response.ok) {
            showNotification(data?.message || "Archivo importado correctamente");
        } else {
            const errorMsg = data?.message || text || response.statusText;
            showNotification('Error al importar: ' + errorMsg);
        }
    } catch (error: any) {
        showNotification(error.message || "Ocurrió un error inesperado");
    }
}

export default postExcelClients;