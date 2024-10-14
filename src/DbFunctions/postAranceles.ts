const url = process.env.REACT_APP_BASE_URL;

const postAranceles = async ( file: File, idPeriodo: string ) => {    

    const formData = new FormData();
    
    formData.append('excelFile', file);
    
    formData.append('periodo_id', idPeriodo);

    for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`);
        
        const value = pair[1];
        if (value instanceof File) {
            console.log(`  Name: ${value.name}`);
            console.log(`  Size: ${value.size}`);
            console.log(`  Type: ${value.type}`);
        } else {
            console.log(`  Value: ${value}`);
        }
    }   
    

    try {
        const response = await fetch(`${url}/liquidation/upload/arancel`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Archivo e ID enviados correctamente:', data);
        } else {
            const errorData = await response.json();
            console.error('Error al enviar el archivo o el ID:', errorData);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

export default postAranceles;