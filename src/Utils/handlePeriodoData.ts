const handlePeriodoData = (company: string, type: string, date: string, periodoId: string) => {

    let newCompany;
    let newType;
    let newDate;
    let newId;

    if (company === "grupoieb") {
        newCompany = "Grupo IEB";
    }
    if (company === "inviu") {
        newCompany = "Inviu";
    }

    if (type === "archivo1") {
        newType = "Archivo 1"
    }
    if (type === "archivo2") {
        newType = "Archivo 2"
    }
    if (type === "archivo3") {
        newType = "Archivo3"
    }

    const month = date.slice(0, 2);
    const year = date.slice(2);
    newDate = `${month}/${year}`;
    
    return {
        newType: newType,
        newCompany: newCompany,
        newDate: newDate,
        newId: periodoId
    }

}

export default handlePeriodoData;