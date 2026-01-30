import React, { useContext, useEffect } from "react";
import '../../../../Styles/Reutilized.css'
import FormCrearAsesor from "./FormCrearAsesor";
import Background from "../../../Background/Background";
import { UserContext } from "../../../../Context/UserContext";
import Page404 from "../../../Page404/Page404";


const CrearAsesor = () => {

    const { userData, edicion } = useContext(UserContext);

    const getTitulo = () => {
        if (edicion === null) return 'Nuevo Usuario';

        // Si no tiene rol definido, es una subagencia
        if (edicion.rol === undefined) return 'Editar Sub Agencia';

        const titulos: Record<string, string> = {
            'asesor': 'Editar Asesor',
            'coordinador': 'Editar Coordinador',
            'manager': 'Editar Manager',
            'sagencia': 'Editar Sub Agencia',
        };
        return titulos[edicion.rol] || 'Editar Usuario';
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, [])

    return (
        <>
            {
                userData.role === 'root' ?
                    <Background>
                        <section className="container">
                            <h1 className="title2 marginYTitle">{getTitulo()}</h1>
                            <FormCrearAsesor />
                        </section>
                    </Background>
                    :
                    <Page404 />
            }
        </>
    )
}

export default CrearAsesor;