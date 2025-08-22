const getAsesorByUsername = async (username: string) => {
    const url = `${process.env.REACT_APP_BASE_URL}/asesor/by-username/${username}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || "Asesor no encontrado" };
        }
        const data = await response.json();
        console.log('datita del asesor por username??', data);
        // Espera que el backend devuelva { asesor: {...} }
        return data;
    } catch (error: any) {
        return { error: error.message || "Error al buscar asesor" };
    }
};

export default getAsesorByUsername;