const getAsesorByUsername = async (username: string) => {
    const url = `${process.env.REACT_APP_BASE_URL}/asesor/by-username/${username}`;

    try {
        const response = await fetch(url);

        const text = await response.text();
        let data: any;
        try {
            data = JSON.parse(text);
        } catch {
            data = null;
        }

        if (!response.ok) {
            return { error: data?.message || "Asesor no encontrado" };
        }

        // Normalizar respuesta - el backend puede devolver { asesor: {...} } o directamente el objeto
        if (data?.asesor) {
            return data;
        } else if (data && data.username) {
            return { asesor: data };
        }

        return { error: "Formato de respuesta inesperado" };
    } catch (error: any) {
        return { error: error.message || "Error al buscar asesor" };
    }
};

export default getAsesorByUsername;