const handleLogin = async (email: string, contrasena: string, setUserData: any) => {
    let url = `${process.env.REACT_APP_BASE_URL}/asesor/login`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                contrasena: contrasena,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error('Error en la solicitud: ' + errorData.message);
        }

        const data = await response.json();
        const user = {
            nombre: data.nombre,
            apellido: data.apellido,
            username: data.username,
            email: data.email,
            id: data.id,
            role: data.role,
        };

        // Guardar en localStorage
        localStorage.setItem('userData', JSON.stringify(user));

        // Actualizar estado
        setUserData(user);

        console.log('Respuesta del servidor:', user);
        return true;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return error;
    }
};

export default handleLogin;