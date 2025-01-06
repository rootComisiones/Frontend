const url = process.env.REACT_APP_BASE_URL;

const postAranceles = async ( file: File, idPeriodo: string, setFileSelected: any ) => {    

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
        const response = await fetch(`${url}/liquidation/upload/persh`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            alert('Archivo importado correctamente.');
            setFileSelected(null)
        } else {
            const errorData = await response.json();
            alert(`Error al enviar el archivo o el ID: ${errorData}`);
            setFileSelected(null)
        }
    } catch (error) {
        alert(`Error en la solicitud:' ${error}`);
    }
}

export default postAranceles;