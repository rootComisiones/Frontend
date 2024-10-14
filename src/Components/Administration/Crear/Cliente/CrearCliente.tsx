import { useContext, useEffect } from "react";
import '../../../../Styles/Reutilized.css'
import FormCrearCliente from "./FormCrearCliente";
import Background from "../../../Background/Background";
import Page404 from "../../../Page404/Page404";
import { UserContext } from "../../../../Context/UserContext";

const CrearCliente = () => {

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
                            <h1 className="title2 marginYTitle">Nuevo cliente</h1>
                            <FormCrearCliente />
                        </section>
                    </Background>
                    :
                    <Page404 />
            }
        </>
    )
}

export default CrearCliente;