const handleFormatPeriodDate = (isoDate: string): string => {
    if (!isoDate) return "";
    // Espera formato "YYYY-MM-DD..."
    const [year, month] = isoDate.split('-');
    return `${month}/${year}`;
};

export default handleFormatPeriodDate;