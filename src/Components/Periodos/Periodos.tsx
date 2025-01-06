import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import Background from "../Background/Background";
import TablePeriodos from "../Tables/TablePeriodos";
import ModalNuevoPeriodo from "./ModalNuevoPeriodo";

import bgLoyalty from '../../Assets/iconoLogoBlanco.png';
import dotLogo from '../../Assets/iconoLogoBlanco.png';

import Page404 from "../Page404/Page404";
import getAllPeriodos from "../../DbFunctions/getAllPeriodos";

const Periodos = () => {
    const { periodState, setPeriodState, userData, setEdicion, setLoaderOn, periodos, setPeriodos } = useContext(UserContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [newPeriod, setNewPeriod] = useState(false);

    const grupoIEB = { name: "grupoieb", id: 1 }
    const inviu = { name: "inviu", id: 2 }

    const handleCloseModal = () => {
        setModalVisible(false);
    }

    const handleOpenModal = () => {
        setModalVisible(true)
    }

    const handleGetPeriodos = async () => {
        setLoaderOn(true)
        const allPeriodos = await getAllPeriodos(periodState.id)
        setPeriodos(allPeriodos)
        setLoaderOn(false)
    }

    useEffect(() => {
        setEdicion(null)

        window.scrollTo({
            top: 0,
        });
    }, [])

    useEffect(() => {
        handleGetPeriodos()
        console.log("actualizando periodos", periodState);
    }, [newPeriod, periodState])

    return (
        <>
            {
                userData.role === 'root' ?
                    <Background>
                        <section className="container">
                            <img src={bgLoyalty} alt="bgLoyalty" className='bullBg' />

                            <h1 className="title marginYTitle"><img src={dotLogo} className="titlePng" />Períodos</h1>
                            <div className="btnsContainer marginYBtn">
                                <button
                                    onClick={() => setPeriodState(grupoIEB)}
                                    className={`btn xl btnWhite marginXBtn ${periodState.name === "grupoieb" && "active"}`}>
                                    Grupo IEB
                                </button>
                                <button
                                    onClick={() => setPeriodState(inviu)}
                                    className={`btn xl btnWhite marginXBtn ${periodState.name === "inviu" && "active"}`}>
                                    Inviu
                                </button>
                            </div>

                            <div className="flexStart btnNoBg" onClick={handleOpenModal}>
                                <FontAwesomeIcon icon={faPlus} className='plus' />
                                Crear nuevo período
                            </div>

                            <TablePeriodos company={periodState} periodos={periodos} />

                        </section>

                        <ModalNuevoPeriodo closeModal={handleCloseModal} onVisible={modalVisible} companyState={periodState} setNewPeriod={setNewPeriod} newPeriod={newPeriod} />

                    </Background>
                    :
                    <Page404 />
            }
        </>

    )
}

export default Periodos;