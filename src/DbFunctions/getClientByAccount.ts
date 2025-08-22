const getClientByAccount = async (accountNumber: string) => {
    const url = `${process.env.REACT_APP_BASE_URL}/clients/by-account/${accountNumber}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || "Cliente no encontrado" };
        }
        const data = await response.json();
        // Espera que el backend devuelva { cliente: {...} }
        console.log('datita del cliente x n de cuenta??', data);
        
        return data;
    } catch (error: any) {
        return { error: error.message || "Error al buscar cliente" };
    }
};

export default getClientByAccount;