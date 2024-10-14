const handlePeriodoData = (company: string, type: string, date: string, periodoId: string) => {

    let newCompany;
    let newType;
    let newDate;
    let newId;

    if (company === "arpartners") {
        newCompany = "AR Partners";
    }
    if (company === "grupoieb") {
        newCompany = "Grupo IEB";
    }
    if (company === "inviu") {
        newCompany = "Inviu";
    }

    if (type === "aranceles_publicos") {
        newType = "Aranceles Públicos"
    }
    if (type === "aranceles") {
        newType = "Aranceles"
    }
    if (type === "fondos") {
        newType = "Fondos"
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