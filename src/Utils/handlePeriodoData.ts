const handlePeriodoData = (company: string, date: string, periodoId: string) => {

    let newCompany;
    let newDate;

    if (company === "grupoieb") {
        newCompany = "Grupo IEB";
    }
    if (company === "inviu") {
        newCompany = "Inviu";
    }

    const month = date.slice(0, 2);
    const year = date.slice(2);
    newDate = `${month}/${year}`;
    
    return {
        newCompany: newCompany,
        newDate: newDate,
        newId: periodoId
    }

}

export default handlePeriodoData;