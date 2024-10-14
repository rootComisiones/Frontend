import React, { useContext, useEffect } from "react";

import '../../Styles/Reutilized.css'
import { UserContext } from "../../Context/UserContext";
import AdminUsers from "./AdminUsers";
import AdminComissions from "./AdminComissions";
import Background from "../Background/Background";
import bgLoyalty from '../../Assets/bgLoyalty.png';
import dotLogo from '../../Assets/line.png';
import Page404 from "../Page404/Page404";

const Administration = () => {
    const { setAdminState, adminState, userData } = useContext(UserContext);

    useEffect(() => {
        setAdminState('Usuarios')
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
                            <img src={bgLoyalty} alt="bgLoyalty" className='bullBg' />

                            <h1 className="title marginYTitle"><img src={dotLogo} className="titlePng" />Administración</h1>

                            <AdminUsers />

                        </section>
                    </Background>
                    :
                    <Page404 />
            }
        </>
    )
}

export default Administration;
