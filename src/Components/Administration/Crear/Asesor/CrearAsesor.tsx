import React, { useContext, useEffect } from "react";
import '../../../../Styles/Reutilized.css'
import FormCrearAsesor from "./FormCrearAsesor";
import Background from "../../../Background/Background";
import { UserContext } from "../../../../Context/UserContext";
import Page404 from "../../../Page404/Page404";


const CrearAsesor = () => {

    const { userData } = useContext(UserContext);

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
                            <h1 className="title2 marginYTitle">Nuevo asesor</h1>
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