import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import '../../Styles/Reutilized.css'
import { UserContext } from "../../Context/UserContext";
import TableEquipos from "../Tables/TableEquipos";
import TableAsesores from "../Tables/TableAsesores";
import getAllAsesores from "../../DbFunctions/getAllAsesores";
import getTeams from "../../DbFunctions/getTeams";
import getAllClientes from "../../DbFunctions/getAllClientes";
import TableClientes from "../Tables/TableClientes";
import DetalleAsesor from "./Crear/Asesor/DetalleAsesor";
import DetalleCliente from "./Crear/Cliente/DetalleCliente";
import DetalleEquipo from "./DetalleEquipo";

const AdminUsers = () => {

    const [createPath, setCreatePath] = useState("administradores")
    const [isDetalleOn, setIsDetalleOn] = useState(false)
    const [detalleAsesor, setDetalleAsesor] = useState(null)
    const [detalleCliente, setDetalleCliente] = useState(null)
    const [detalleEquipo, setDetalleEquipo] = useState(null)

    const { adminUsersState, setAdminUsersState, setAllAsesores, setLoaderOn, setAllTeams, setAllClientes, userData } = useContext(UserContext)

    const handleGetData = async () => {
        setLoaderOn(true);
        await getAllAsesores(setAllAsesores)
        await getTeams(setAllTeams)
        const clientes = await getAllClientes()
        console.log(clientes);

        setAllClientes(clientes)
        setLoaderOn(false)
    }

    useEffect(() => {
        let newPath = adminUsersState.state === "Asesor" ?
            "asesores" : adminUsersState.state === "Equipo" ? "equipos" : "clientes"
        setCreatePath(newPath)
    }, [adminUsersState])

    useEffect(() => {
        setAdminUsersState({
            state: "Asesor",
            compañía: "none"
        })
    }, [])

    useEffect(() => {
        handleGetData()
    }, [])

    useEffect(() => {
        console.log(userData);

    }, [userData])


    return (
        <>
            <div className="filterContainer marginYTitle">
                {/* <button onClick={()=>console.log(userData)}>VER DATA</button> */}
                <p className="subtitle marginYTitle">Seleccione un tipo de usuario:</p>
                <div className="btnsContainer marginYBtn">
                    <button
                        onClick={() => setAdminUsersState({
                            state: "Asesor",
                            compañía: "none"
                        })}
                        className={`btn xl btnWhite marginXBtn ${adminUsersState.state === "Asesor" && "active"}`}>
                        Asesores
                    </button>
                    <button
                        onClick={() => setAdminUsersState({
                            state: "Equipo",
                            compañía: "arpartners"
                        })}
                        className={`btn xl btnWhite marginXBtn ${adminUsersState.state === "Equipo" && "active"}`}>
                        Equipos
                    </button>
                    <button
                        onClick={() => setAdminUsersState({
                            state: "Cliente",
                            compañía: "none"
                        })}
                        className={`btn xl btnWhite marginXBtn ${adminUsersState.state === "Cliente" && "active"}`}>
                        Clientes
                    </button>
                </div>

            </div>

            {
                adminUsersState.state !== "Equipo" &&
                <div className="flexStart">
                    <Link to={`${createPath}/crear`} className="btnNoBg">
                        <FontAwesomeIcon icon={faPlus} className='plus' />
                        Crear nuevo {adminUsersState.state}
                    </Link>
                </div>
            }
            {
                adminUsersState.state === "Equipo" ?
                    <TableEquipos setDetalleEquipo={setDetalleEquipo} setIsDetalleOn={setIsDetalleOn} />
                    :
                    adminUsersState.state === "Asesor" ?
                        <TableAsesores setDetalleAsesor={setDetalleAsesor} setIsDetalleOn={setIsDetalleOn} />
                        :
                        <TableClientes setDetalleCliente={setDetalleCliente} setIsDetalleOn={setIsDetalleOn} />
            }

            {
                isDetalleOn && detalleAsesor !== null ?
                <DetalleAsesor detalle={detalleAsesor} setIsDetalleOn={setIsDetalleOn} setDetalleAsesor={setDetalleAsesor} />
                :  isDetalleOn && detalleCliente !== null ?
                <DetalleCliente detalle={detalleCliente} setIsDetalleOn={setIsDetalleOn} setDetalleCliente={setDetalleCliente} />
                : isDetalleOn && detalleEquipo !== null && 
                <DetalleEquipo detalleManager={detalleEquipo} setIsDetalleOn={setIsDetalleOn} />
            }
        </>
    )
}

export default AdminUsers;