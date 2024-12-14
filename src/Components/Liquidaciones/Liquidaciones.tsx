import { useContext, useEffect, useState } from "react";
import '../../Styles/Reutilized.css'
import { UserContext } from "../../Context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Background from "../Background/Background";
import bgLoyalty from '../../Assets/iconoLogoBlanco.png';
import dotLogo from '../../Assets/iconoLogoBlanco.png';

import TableLiquidaciones from "../Tables/TableLiquidaciones";
import getAllPeriodos from "../../DbFunctions/getAllPeriodos";
import getAllLiquidaciones from "../../DbFunctions/getAllLiquidaciones";
import getMyLiquidation from "../../DbFunctions/getMyLiquidation";

interface Periodo {
    id: number,
    fecha_creacion: string,
    compa_ia_id: number
}

const Liquidaciones = () => {
    const { liquidationState, setLiquidationState, setLoaderOn, userData } = useContext(UserContext);
    const [periodos, setPeriodos] = useState<Periodo[]>([])
    const [periodo_id, setPeriodo_id] = useState(0);
    const [liquiData, setLiquiData] = useState([])

    const grupoIEB = { name: "grupoieb", id: 1 }
    const inviu = { name: "inviu", id: 2 }

    const handleGetPeriodos = async () => {
        setLoaderOn(true)
        const allPeriodos = await getAllPeriodos(liquidationState.id)
        setPeriodos(allPeriodos)
        setLoaderOn(false)
    }

    const handleTableData = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;

        setPeriodo_id(Number(id))
        setLoaderOn(true)
        if (userData.role === 'root') {
            
            const arrayLiquidaciones = await getAllLiquidaciones(Number(id));
            console.log('el usuario es root', arrayLiquidaciones[0]);
            setLiquiData(arrayLiquidaciones)
        }
        if (userData.role !== 'root' && userData.role !== "") {
            
            const allLiquidations = await getMyLiquidation(Number(id), userData.role, userData.id)
            console.log('el usuario no es root ni esta vacio', allLiquidations[0]);
            setLiquiData(allLiquidations)
        }
        setLoaderOn(false)
    }

    useEffect(() => {
        if (userData.role !== "") {
            handleGetPeriodos()
            setLiquiData([])
        }        
    }, [liquidationState])

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
                    periodo_id !== 0 &&
                    <TableLiquidaciones periodo_id={periodo_id} liquiData={liquiData} />
                }
            </section>
        </Background>
    )
}

export default Liquidaciones;