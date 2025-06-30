const getPeriodoAsesorLiqui = async (periodo_id: string, asesor_id: string, role: string, selectedFile: any, showNotification: (msg: string) => void) => {

    let url = `${process.env.REACT_APP_BASE_URL}/liquidation/${selectedFile}/${periodo_id}/${asesor_id}/${role}`;

    console.log(url);

    let asesorACargo;
    let beneficiario;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            showNotification('Error en la solicitud: ' + errorData.message);
            return { asesorACargo, beneficiario, total: 0 };
        }
        const data = await response.json();
        console.log(data, 'DATA SIN CAMBIOS');


        // let allData = [];

        // if (selectedFile === 'fondos') {
        //     allData = [...data.fondosClientes, ...data.fondosComisiones]
        // } else if(selectedFile === 'pershing'){
        //     allData = [...data.pershingsClientes, ...data.pershingsComisiones];
        // } else {
        //     allData = [...data.arancelesClientes, ...data.arancelesComisiones]
        // }

        const allData = [...data.arancelesClientes, ...data.arancelesComisiones]

        console.log(allData, 'DATA CON CAMBIOS');



        // const total = allData
        //     .filter((item: any) => item !== null)
        //     .reduce((acc: any, curr: any) => {
        //         return acc + Number(curr.total);
        //     }, 0);

        asesorACargo = data.arancelesComisiones;

        beneficiario = data.arancelesClientes;


        console.log('Respuesta del servidor datitaaaa:', allData);
        return { asesorACargo, beneficiario };
    } catch (error: any) {
        console.error('Error en la solicitud:', error);
        showNotification(error.message || "Ocurrió un error inesperado");
        return { asesorACargo, beneficiario, total: 0 }
    }
}

export default getPeriodoAsesorLiqui;