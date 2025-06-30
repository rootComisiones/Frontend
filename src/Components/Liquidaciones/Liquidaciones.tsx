import { useContext, useEffect, useState } from "react";
import '../../Styles/Reutilized.css'
import { UserContext } from "../../Context/UserContext";
import Background from "../Background/Background";
import bgLoyalty from '../../Assets/iconoLogoBlanco.png';
import dotLogo from '../../Assets/iconoLogoBlanco.png';

import TableLiquidaciones from "../Tables/TableLiquidaciones";
import getAllPeriodos from "../../DbFunctions/getAllPeriodos";
import getAllLiquidaciones from "../../DbFunctions/getAllLiquidaciones";
import getMyLiquidation from "../../DbFunctions/getMyLiquidation";
import { getUsersEmails } from "../../DbFunctions/getUserEmails";
import sendEmails from "../../DbFunctions/sendEmails";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNotification } from "../../Context/NotificationContext";

interface Periodo {
    id: number,
    fecha_creacion: string,
    compa_ia_id: number
}

const Liquidaciones = () => {
    const { liquidationState, setLiquidationState, setLoaderOn, userData, setEdicion } = useContext(UserContext);
    const { showNotification } = useNotification();
    const [periodos, setPeriodos] = useState<Periodo[]>([])
    const [periodo_id, setPeriodo_id] = useState(0);
    const [liquiData, setLiquiData] = useState([])
    const [selectedDateValue, setSelectedDateValue] = useState('');

    const grupoIEB = { name: "grupoieb", id: 2 }
    const inviu = { name: "inviu", id: 1 }

    const handleGetPeriodos = async () => {
        setLoaderOn(true)
        const allPeriodos = await getAllPeriodos(liquidationState.id, showNotification);
        setPeriodos(allPeriodos)
        setLoaderOn(false)
    }

    const handleTableData = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;

        setPeriodo_id(Number(id));
        setLiquiData([]); // <-- Limpia antes de cargar nuevos datos
        setLoaderOn(true);

        if (userData.role === 'root') {
            const arrayLiquidaciones = await getAllLiquidaciones(Number(id), showNotification);
            if (arrayLiquidaciones[0]) {
                const date = periodos?.length && arrayLiquidaciones[0]?.periodos?.fecha_creacion.slice(0, 7);
                setSelectedDateValue(date);
                setLiquiData(arrayLiquidaciones);
            } else {
                setLiquiData([]); // <-- Limpia si no hay datos
            }
        }
        if (userData.role !== 'root' && userData.role !== "") {
            const allLiquidations = await getMyLiquidation(Number(id), userData.role, userData.id, showNotification);
            setLiquiData(allLiquidations || []); // <-- Asegura array vacío si no hay datos
        }
        setLoaderOn(false);
    }

    const sendNotificaciones = async () => {
        const emails = await getUsersEmails(liquiData, selectedDateValue)
        sendEmails(emails, showNotification)
    }

    useEffect(() => {
        if (userData.role !== "") {
            handleGetPeriodos()
            setLiquiData([])
        }

        setEdicion(null)

    }, [liquidationState, userData])

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, [])

    return (
        <Background>
            <section className="container">
                <img src={bgLoyalty} alt="bgLoyalty" className='bullBg' />

                <h1 className="title marginYTitle"><img src={dotLogo} className="titlePng" />Liquidaciones</h1>
                <div className="btnsContainer marginYTitle">
                    <button
                        onClick={() => setLiquidationState(grupoIEB)}
                        className={`btn btnWhite marginXBtn ${liquidationState.name === "grupoieb" && "active"}`}>
                        Grupo IEB</button>
                    <button
                        onClick={() => setLiquidationState(inviu)}
                        className={`btn btnWhite marginXBtn ${liquidationState.name === "inviu" && "active"}`}>
                        Inviu</button>
                </div>

                <div className="flexStart flexRow centerCenter">
                    <div className="inputContainer lg">
                        <label htmlFor="search" className="label">Período</label>
                        <select className="input sm" onChange={handleTableData}>
                            <option value="0">Seleccione un período</option>
                            {
                                periodos.length &&
                                periodos.map((periodo) => {
                                    return <option key={periodo.id} value={periodo.id}>
                                        {periodo.fecha_creacion}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                </div>
                {
                    periodo_id !== 0 && userData.role === 'root' && liquiData.length ?
                        <>
                            <div className="flexStart" onClick={sendNotificaciones}>
                                <Link to={`#`} className="btnNoBg">
                                    <FontAwesomeIcon icon={faEnvelope} className='plus' />
                                    Enviar Notificaciones
                                </Link>
                            </div>
                            <TableLiquidaciones periodo_id={periodo_id} liquiData={liquiData} empresa={liquidationState.name} />
                        </>
                        :
                        periodo_id !== 0 &&
                        <TableLiquidaciones periodo_id={periodo_id} liquiData={liquiData} empresa={liquidationState.name} />
                }
            </section>
        </Background>
    )
}

export default Liquidaciones;