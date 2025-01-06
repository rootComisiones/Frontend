const getPeriodoAsesorLiqui = async (periodo_id: string, asesor_id: string, role: string, selectedFile: any) => {

    let url = `${process.env.REACT_APP_BASE_URL}/liquidation/${selectedFile}/${periodo_id}/${asesor_id}/${role}`;

    console.log(url);

    let asesorACargo;
    let beneficiario;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error('Error en la solicitud: ' + errorData.message);
        }
        const data = await response.json();

        // let allData = [];

        // if (selectedFile === 'fondos') {
        //     allData = [...data.fondosClientes, ...data.fondosComisiones]
        // } else if(selectedFile === 'pershing'){
        //     allData = [...data.pershingsClientes, ...data.pershingsComisiones];
        // } else {
        //     allData = [...data.arancelesClientes, ...data.arancelesComisiones]
        // }

        const allData = [...data.pershingsClientes, ...data.pershingsComisiones]

        console.log(allData , 'DATA CON CAMBIOS');
        


        const total = allData
            .filter((item: any) => item !== null)
            .reduce((acc: any, curr: any) => {
                return acc + Number(curr.total);
            }, 0);

        asesorACargo = allData.filter((data)=> data.isComision )

        beneficiario = allData.filter((data)=> !data.isComision )


        console.log('Respuesta del servidor datitaaaa:', allData);
        return { asesorACargo, beneficiario, total };
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return { asesorACargo, beneficiario, total: 0 }
    }
}

export default getPeriodoAsesorLiqui;