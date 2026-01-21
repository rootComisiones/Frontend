// filepath: [AdminUsers.tsx](http://_vscodecontentref_/2)
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
import postExcelClients from "../../DbFunctions/postExcelClients";
import getAllSagencias from "../../DbFunctions/getAllSagencias";
import TableSubAgencias from "../Tables/TableSubAgencias";
import { useNotification } from "../../Context/NotificationContext";
import SearchClients from "./Search/SearchClients";
import SearchAsesores from "./Search/SearchAsesores";
import Pagination from "../Pagination/Pagination";

const AdminUsers = () => {

    const [createPath, setCreatePath] = useState("administradores")
    const [isDetalleOn, setIsDetalleOn] = useState(false)
    const [detalleAsesor, setDetalleAsesor] = useState(null)
    const [detalleCliente, setDetalleCliente] = useState(null)
    const [detalleEquipo, setDetalleEquipo] = useState(null)
    const [fileSelected, setFileSelected] = useState<any>(null)
    const [clientsPagination, setClientsPagination] = useState<any>(null)
    const [currentClientsPage, setCurrentClientsPage] = useState<number>(1)
    const [asesoresPagination, setAsesoresPagination] = useState<any>(null)
    const [currentAsesoresPage, setCurrentAsesoresPage] = useState<number>(1)
    const [refreshTrigger, setRefreshTrigger] = useState(0)
    const [isSearchMode, setIsSearchMode] = useState(false)
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [isSearchModeAsesor, setIsSearchModeAsesor] = useState(false)
    const [searchResultsAsesor, setSearchResultsAsesor] = useState<any[]>([])
    // Estado para los asesores a mostrar (resultado de búsqueda o lista completa)
    const [asesoresToShow, setAsesoresToShow] = useState<any[] | undefined>(undefined);

    const { adminUsersState, setAdminUsersState, setAllAsesores, setLoaderOn, setAllTeams, setAllClientes, userData, setEdicion, setAllSagencias, allClientes, allAsesores } = useContext(UserContext)
    const { showNotification } = useNotification();

    // Obtener clientes con paginado
    const handleGetClientes = async (page: number = 1) => {
        setLoaderOn(true);
        try {
            const response = await getAllClientes(page, 50, showNotification);
            setAllClientes(response.clients || []);
            setClientsPagination(response.pagination || null);
            setCurrentClientsPage(page);
        } catch (error) {
            setAllClientes([]);
            setClientsPagination(null);
        }
        setLoaderOn(false);
    }

    const handlePageChange = (newPage: number) => {
        handleGetClientes(newPage);
    }

    // Obtener asesores con paginado
    const handleGetAsesores = async (page: number = 1) => {
        setLoaderOn(true);
        try {
            const response = await getAllAsesores(page, 50, showNotification);
            setAllAsesores(response.asesores || []);
            setAsesoresPagination(response.pagination || null);
            setCurrentAsesoresPage(page);
        } catch (error) {
            setAllAsesores([]);
            setAsesoresPagination(null);
        }
        setLoaderOn(false);
    }

    const handlePageChangeAsesores = (newPage: number) => {
        handleGetAsesores(newPage);
    }

    // Obtener equipos y sagencias
    const handleGetAsesoresAndTeams = async () => {
        setLoaderOn(true);
        await handleGetAsesores(currentAsesoresPage);
        await getTeams(setAllTeams, showNotification)
        const sagencias = await getAllSagencias(showNotification);
        setAllSagencias(sagencias);
        setLoaderOn(false)
    }

    const handleGetData = async () => {
        if (adminUsersState.state === "Cliente") {
            handleGetClientes(currentClientsPage);
        } else if (adminUsersState.state === "Usuario") {
            handleGetAsesores(currentAsesoresPage);
        } else {
            handleGetAsesoresAndTeams();
        }
    }

    const refreshData = () => {
        setRefreshTrigger(prev => prev + 1);
        handleGetData();
    }

    // Búsqueda de clientes
    const handleClientFound = (clientes: any[]) => {
        setSearchResults(clientes);
        setIsSearchMode(true);
    }

    const handleClearSearch = () => {
        setIsSearchMode(false);
        setSearchResults([]);
        handleGetClientes(currentClientsPage);
    }

    // Búsqueda de asesores
    const handleAsesorFound = (asesores: any[]) => {
        setSearchResultsAsesor(asesores);
        setIsSearchModeAsesor(true);
    }

    const handleClearSearchAsesor = () => {
        setIsSearchModeAsesor(false);
        setSearchResultsAsesor([]);
        handleGetAsesores(currentAsesoresPage);
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setFileSelected(file)
            console.log('Archivo seleccionado:', file.name);
        } else {
            console.log('No se seleccionó ningún archivo');
        }
    };

    const handleSubmitFile = async () => {
        setLoaderOn(true)
        await postExcelClients(fileSelected, showNotification)
        await handleGetClientes(currentClientsPage);
        setFileSelected(null);
        setLoaderOn(false)
    }

    useEffect(() => {
        let newPath = adminUsersState.state === "Cliente" ?
            "clientes" : "asesores"
        setCreatePath(newPath)
    }, [adminUsersState])

    useEffect(() => {
        setAdminUsersState({
            state: "Usuario",
            compañía: "none"
        })
    }, [])

    useEffect(() => {
        setEdicion(null)
    }, [userData])

    useEffect(() => {
        if (adminUsersState.state === "Cliente") {
            handleGetClientes(1);
        } else if (adminUsersState.state === "Usuario") {
            handleGetAsesores(1);
        } else {
            handleGetAsesoresAndTeams();
        }
        setIsSearchMode(false);
        setSearchResults([]);
        setIsSearchModeAsesor(false);
        setSearchResultsAsesor([]);
    }, [adminUsersState.state, refreshTrigger])

    useEffect(() => {
        console.log('Clientes buscados:', searchResultsAsesor);
    }, [searchResultsAsesor]);

    // Cuando cambia el modo de búsqueda o los resultados, actualiza asesoresToShow
    useEffect(() => {
        if (isSearchModeAsesor) {
            console.log('Actualizando asesoresToShow con resultados de búsqueda:', searchResultsAsesor);
            setAsesoresToShow(searchResultsAsesor);
        } else {
            setAsesoresToShow(undefined); // para que la tabla use allAsesores
        }
    }, [isSearchModeAsesor, searchResultsAsesor, allAsesores]);

    // Decidir qué mostrar
    const clientesToShow = isSearchMode ? searchResults : allClientes;

    return (
        <>
            <div className="filterContainer marginYTitle">
                <p className="subtitle marginYTitle">Seleccione un tipo de usuario:</p>
                <div className="btnsContainer marginYBtn">
                    <button
                        onClick={() => setAdminUsersState({
                            state: "Usuario",
                            compañía: "none"
                        })}
                        className={`btn xl btnWhite marginXBtn ${adminUsersState.state === "Usuario" && "active"}`}>
                        Usuarios
                    </button>
                    <button
                        onClick={() => setAdminUsersState({
                            state: "Sagencia",
                            compañía: "none"
                        })}
                        className={`btn xl btnWhite marginXBtn ${adminUsersState.state === "Sagencia" && "active"}`}>
                        Sub Agencias
                    </button>
                    <button
                        onClick={() => setAdminUsersState({
                            state: "Equipo",
                            compañía: "grupoieb"
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
                adminUsersState.state === "Cliente" &&
                <div className="flexStart">
                    <label htmlFor="fileInput" className="btnNoBg flexStart">
                        <FontAwesomeIcon icon={faPlus} className='plus' />
                        Importar {adminUsersState.state}s via EXCEL
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        accept=".xls, .xlsx"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>
            }

            {
                fileSelected !== null && adminUsersState.state === 'Cliente' &&
                <>
                    <p className="ordinaryText marginY">Has seleccionado el archivo: {fileSelected.name}</p>
                    <button onClick={() => handleSubmitFile()} className="btn small btnDarkGreen flexStart marginYSmall">Aceptar</button>
                </>
            }

            {
                adminUsersState.state === "Cliente" && (
                    <SearchClients
                        onClientFound={handleClientFound}
                        onClearSearch={handleClearSearch}
                        setLoaderOn={setLoaderOn}
                    />
                )
            }

            {
                adminUsersState.state === "Usuario" && (
                    <SearchAsesores
                        onAsesorFound={handleAsesorFound}
                        onClearSearch={handleClearSearchAsesor}
                        setLoaderOn={setLoaderOn}
                    />
                )
            }

            {
                adminUsersState.state === "Equipo" ?
                    <TableEquipos setDetalleEquipo={setDetalleEquipo} setIsDetalleOn={setIsDetalleOn} />
                    :
                    adminUsersState.state === "Usuario" ?
                        <TableAsesores
                            setDetalleAsesor={setDetalleAsesor}
                            setIsDetalleOn={setIsDetalleOn}
                            refreshData={handleGetData}
                            asesoresToShow={asesoresToShow}
                            isSearchMode={isSearchModeAsesor}
                        />
                        : adminUsersState.state === 'Cliente' ?
                            <TableClientes
                                setDetalleCliente={setDetalleCliente}
                                setIsDetalleOn={setIsDetalleOn}
                                refreshData={handleGetData}
                                clientesToShow={clientesToShow}
                                isSearchMode={isSearchMode}
                            />
                            :
                            <TableSubAgencias refreshData={handleGetData} />
            }

            {
                adminUsersState.state === "Cliente" && !isSearchMode && clientsPagination && (
                    <Pagination
                        page={clientsPagination.page}
                        totalPages={clientsPagination.totalPages}
                        hasNextPage={clientsPagination.hasNextPage}
                        hasPrevPage={clientsPagination.hasPrevPage}
                        onPageChange={handlePageChange}
                        totalItems={clientsPagination.totalClients}
                        itemsPerPage={clientsPagination.clientsPerPage}
                    />
                )
            }

            {
                adminUsersState.state === "Usuario" && !isSearchModeAsesor && asesoresPagination && (
                    <Pagination
                        page={asesoresPagination.page}
                        totalPages={asesoresPagination.totalPages}
                        hasNextPage={asesoresPagination.hasNextPage}
                        hasPrevPage={asesoresPagination.hasPrevPage}
                        onPageChange={handlePageChangeAsesores}
                        totalItems={asesoresPagination.totalAsesores}
                        itemsPerPage={asesoresPagination.asesoresPerPage}
                    />
                )
            }

            {
                isDetalleOn && detalleAsesor !== null ?
                    <DetalleAsesor detalle={detalleAsesor} setIsDetalleOn={setIsDetalleOn} setDetalleAsesor={setDetalleAsesor} />
                    : isDetalleOn && detalleCliente !== null ?
                        <DetalleCliente detalle={detalleCliente} setIsDetalleOn={setIsDetalleOn} setDetalleCliente={setDetalleCliente} />
                        : isDetalleOn && detalleEquipo !== null &&
                        <DetalleEquipo detalleManager={detalleEquipo} setIsDetalleOn={setIsDetalleOn} />
            }
        </>
    )
}

export default AdminUsers;