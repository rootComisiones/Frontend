import { useContext, useEffect, useState } from "react";
import '../../Styles/Reutilized.css'
import { UserContext } from "../../Context/UserContext";
import Background from "../Background/Background";
import bgLoyalty from '../../Assets/iconoLogoBlanco.png';
import dotLogo from '../../Assets/iconoLogoBlanco.png';
import getAllPeriodos from "../../DbFunctions/getAllPeriodos";
import getPeriodosBySagencia from "../../DbFunctions/getPeriodosBySagencia";
import getReporteLiquidaciones from "../../DbFunctions/getReporteLiquidaciones";
import { useNotification } from "../../Context/NotificationContext";
import Page404 from "../Page404/Page404";
import TableAranceles from "../Tables/TableAranceles";
import getReporteLiquidacionesBySagencia from "../../DbFunctions/getReporteLiquidacionesBySagnecia";
import handleFormatPeriodDate from "../../Utils/handleFormatPeriodDate";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Periodo {
    id: number;
    fecha_creacion: string;
    compa_ia_id: number;
}

const ReporteLiquidaciones = () => {
    const { userData, setLoaderOn, allSagencias } = useContext(UserContext);
    const { showNotification } = useNotification();

    // Sección 1 (por empresa)
    const [selectedEmpresa, setSelectedEmpresa] = useState({ name: "grupoieb", id: 2 });
    const [periodosEmpresa, setPeriodosEmpresa] = useState<Periodo[]>([]);
    const [selectedPeriodoEmpresa, setSelectedPeriodoEmpresa] = useState(0);
    const [desgloseEmpresa, setDesgloseEmpresa] = useState<{ aranceles_privados: any[], aranceles_publicos: any[] }>({ aranceles_privados: [], aranceles_publicos: [] });
    const [selectedTipoEmpresa, setSelectedTipoEmpresa] = useState<'privados' | 'publicos'>('privados');

    // Sección 2 (por subagencia)
    const [selectedSagencia, setSelectedSagencia] = useState<number>(userData.role === 'sagencia' ? Number(userData.id) : 0);
    const [periodosSagencia, setPeriodosSagencia] = useState<Periodo[]>([]);
    const [selectedPeriodoSagencia, setSelectedPeriodoSagencia] = useState(0);
    const [desgloseSagencia, setDesgloseSagencia] = useState<{ aranceles_privados: any[], aranceles_publicos: any[] }>({ aranceles_privados: [], aranceles_publicos: [] });
    const [selectedTipoSagencia, setSelectedTipoSagencia] = useState<'privados' | 'publicos'>('privados');

    // Botón activo
    const [showTableEmpresa, setShowTableEmpresa] = useState(false);
    const [showTableSagencia, setShowTableSagencia] = useState(false);

    const grupoIEB = { name: "grupoieb", id: 2 };
    const inviu = { name: "inviu", id: 1 };

    // --- Empresa (root) ---
    const handleGetPeriodosEmpresa = async (empresaId: number) => {
        setLoaderOn(true);
        const allPeriodos = await getAllPeriodos(empresaId, showNotification);
        setPeriodosEmpresa(allPeriodos);
        setLoaderOn(false);
    };

    const handleEmpresaChange = (empresa: { name: string, id: number }) => {
        setSelectedEmpresa(empresa);
        setSelectedPeriodoEmpresa(0);
        setDesgloseEmpresa({ aranceles_privados: [], aranceles_publicos: [] });
        setShowTableEmpresa(false);
        handleGetPeriodosEmpresa(empresa.id);
    };

    const handlePeriodoEmpresaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPeriodoEmpresa(Number(e.target.value));
        setShowTableEmpresa(false);
    };

    const handleBuscarEmpresa = async () => {
        if (selectedPeriodoEmpresa === 0) {
            showNotification('Por favor seleccione un período');
            return;
        }
        setLoaderOn(true);
        const data = await getReporteLiquidaciones(selectedEmpresa.id, selectedPeriodoEmpresa);
        if (data && data.desglose) {
            setDesgloseEmpresa(data.desglose);
            if (data.desglose.aranceles_privados.length > 0) setSelectedTipoEmpresa('privados');
            else setSelectedTipoEmpresa('publicos');
            setShowTableEmpresa(true);
        } else {
            setDesgloseEmpresa({ aranceles_privados: [], aranceles_publicos: [] });
            setShowTableEmpresa(true);
        }
        setLoaderOn(false);
    };

    // --- Subagencia (root y sagencia) ---
    const handleSagenciaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = Number(e.target.value);
        setSelectedSagencia(id);
        setSelectedPeriodoSagencia(0);
        setDesgloseSagencia({ aranceles_privados: [], aranceles_publicos: [] });
        setShowTableSagencia(false);
        if (id > 0) handleGetPeriodosSagencia(id);
    };

    const handleGetPeriodosSagencia = async (sagenciaId: number) => {
        setLoaderOn(true);
        const periodos = await getPeriodosBySagencia(sagenciaId);
        setPeriodosSagencia(periodos);
        setLoaderOn(false);
    };

    const handlePeriodoSagenciaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPeriodoSagencia(Number(e.target.value));
        setShowTableSagencia(false);
    };

    const handleBuscarSagencia = async () => {
        if (selectedPeriodoSagencia === 0 || selectedSagencia === 0) {
            showNotification('Por favor seleccione sub agencia y período');
            return;
        }
        setLoaderOn(true);
        const data = await getReporteLiquidacionesBySagencia(selectedSagencia, selectedPeriodoSagencia);
        if (data && data.desglose) {
            setDesgloseSagencia(data.desglose);
            if (data.desglose.aranceles_privados.length > 0) setSelectedTipoSagencia('privados');
            else setSelectedTipoSagencia('publicos');
            setShowTableSagencia(true);
        } else {
            setDesgloseSagencia({ aranceles_privados: [], aranceles_publicos: [] });
            setShowTableSagencia(true);
        }
        setLoaderOn(false);
    };

    useEffect(() => {
        if (userData.role === 'root') {
            handleGetPeriodosEmpresa(selectedEmpresa.id);
        }
        if (userData.role === 'sagencia') {
            handleGetPeriodosSagencia(Number(userData.id));
        }
        // eslint-disable-next-line
    }, [userData, selectedEmpresa.id]);

    const renderArancelesButtons = (desglose: { aranceles_privados: any[], aranceles_publicos: any[] }, selectedTipo: string, setSelectedTipo: (tipo: 'privados' | 'publicos') => void) => {
        const showPrivados = desglose.aranceles_privados.length > 0;
        const showPublicos = desglose.aranceles_publicos.length > 0;
        if (!showPrivados && !showPublicos) return null;

        return (
            <div className="btnsContainer marginYBtn">
                {showPrivados && (
                    <button
                        onClick={() => setSelectedTipo('privados')}
                        className={`btn btnWhite marginXBtn ${selectedTipo === "privados" && "active"}`}>
                        Aranceles Privados
                    </button>
                )}
                {showPublicos && (
                    <button
                        onClick={() => setSelectedTipo('publicos')}
                        className={`btn btnWhite marginXBtn ${selectedTipo === "publicos" && "active"}`}>
                        Aranceles Públicos
                    </button>
                )}
            </div>
        );
    };

    // --- Exportar a Excel respetando columnas por rol ---
    const getExcelData = (data: any[], role: string) => {
        if (!data || !data.length) return [];
        // Columnas y orden según TableAranceles
        return data.map((liquidacion: any) => {
            const base = {
                "Nº de Comitente": liquidacion.numero_cuenta,
                "Comitente": liquidacion.cliente,
                "Base de calculo": liquidacion.base_de_calculo,
                "Condicion": liquidacion.condicion,
                "Broker": liquidacion.compania_nombre,
                "Productor": liquidacion.productor_nombre,
                "Sit. Impositiva": liquidacion.situacion_impositiva,
                "% Comision": liquidacion.porcentaje_comi,
                "Comision Asesor": liquidacion.comision_asesor,
                "Plus Coordinador": liquidacion.plus_coordinador,
                "Plus Team Leader": liquidacion.plus_teamleader,
                "Plus Referral": liquidacion.plus_referral,
                "Equipo": liquidacion.cabeza_agencia_nombre,
                "Coordinador": liquidacion.coordinador_name,
                "Team Leader": liquidacion.teamleader_name,
            };
            if (role === "root") {
                return {
                    ...base,
                    "Rentabilidad Subagencia": liquidacion.rentabilidad_sub_agencia,
                    "Rentabilidad Root": liquidacion.rentabilidad_root,
                };
            }
            if (role === "sagencia") {
                return {
                    ...base,
                    "Rentabilidad Subagencia": liquidacion.rentabilidad_sub_agencia,
                };
            }
            return base;
        });
    };

    const exportToExcel = (data: any[], fileName: string, role: string) => {
        const excelData = getExcelData(data, role);
        if (!excelData || excelData.length === 0) {
            showNotification("No hay datos para exportar.");
            return;
        }
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Reporte");
        XLSX.writeFile(wb, fileName);
    };

    return (
        <>
            {(userData.role === 'root' || userData.role === 'sagencia') ?
                <Background>
                    <section className="container">
                        <img src={bgLoyalty} alt="bgLoyalty" className='bullBg' />
                        <h1 className="title marginYTitle">
                            <img src={dotLogo} className="titlePng" alt="dot" />
                            Reporte de Liquidaciones
                        </h1>

                        {/* --- SECCIÓN 1: ROOT --- */}
                        {userData.role === 'root' && (
                            <>
                                <div className="filterContainer marginYTitle">
                                    {/* Empresa */}
                                    <div className="btnsContainer marginYBtn">
                                        <button
                                            onClick={() => handleEmpresaChange(grupoIEB)}
                                            className={`btn btnWhite marginXBtn ${selectedEmpresa.name === "grupoieb" && "active"}`}>
                                            Grupo IEB
                                        </button>
                                        <button
                                            onClick={() => handleEmpresaChange(inviu)}
                                            className={`btn btnWhite marginXBtn ${selectedEmpresa.name === "inviu" && "active"}`}>
                                            Inviu
                                        </button>
                                    </div>
                                </div>
                                <div className="inputContainer lg start">
                                    <label htmlFor="periodo" className="label">Período</label>
                                    <select className="input sm" onChange={handlePeriodoEmpresaChange} value={selectedPeriodoEmpresa}>
                                        <option value="0">Seleccione un período</option>
                                        {periodosEmpresa.map((periodo) => (
                                            <option key={periodo.id} value={periodo.id}>
                                                {periodo.fecha_creacion}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Buscar */}
                                <div className="flexStart marginYBtn">
                                    <button onClick={handleBuscarEmpresa} className="btn xl btnDarkGreen">
                                        Buscar
                                    </button>
                                </div>
                                {/* Botones de aranceles */}
                                {showTableEmpresa && renderArancelesButtons(desgloseEmpresa, selectedTipoEmpresa, setSelectedTipoEmpresa)}
                                {/* Tabla */}
                                {showTableEmpresa && (
                                    <TableAranceles
                                        liquiData={selectedTipoEmpresa === 'privados' ? desgloseEmpresa.aranceles_privados : desgloseEmpresa.aranceles_publicos}
                                    />
                                )}
                                <hr className="marginYTitle" />
                                {showTableEmpresa && (
                                    <div className="flexStart btnNoBg marginY" onClick={
                                        () => exportToExcel(
                                            selectedTipoEmpresa === 'privados'
                                                ? desgloseEmpresa.aranceles_privados
                                                : desgloseEmpresa.aranceles_publicos,
                                            `Reporte_${selectedEmpresa.name}_${selectedTipoEmpresa}.xlsx`,
                                            "root"
                                        )
                                    }>
                                        <FontAwesomeIcon icon={faPlus} className='plus' />
                                        Exportar tabla a Excel
                                    </div>
                                )}
                                <hr className="marginYTitle" />
                                <hr className="marginYTitle" />
                            </>
                        )}

                        {/* --- SECCIÓN 2: ROOT y SAGENCIA --- */}
                        <h2 className="title2 marginYTitle">Buscar reporte por Sub Agencias</h2>
                        {/* Select de sagencias solo para root */}
                        {userData.role === 'root' && (
                            <div className="inputContainer lg start">
                                <label htmlFor="sagencia" className="label">Sub Agencia</label>
                                <select className="input sm" onChange={handleSagenciaChange} value={selectedSagencia}>
                                    <option value="0">Seleccione una Sub Agencia</option>
                                    {allSagencias.map((sagencia) => (
                                        <option key={sagencia.id} value={sagencia.id}>
                                            {sagencia.nombre_agencia}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {/* Período */}
                        <div className="inputContainer lg start">
                            <label htmlFor="periodoSagencia" className="label">Período</label>
                            <select className="input sm" onChange={handlePeriodoSagenciaChange} value={selectedPeriodoSagencia}>
                                <option value="0">Seleccione un período</option>
                                {periodosSagencia.map((periodo) => (
                                    <option key={periodo.id} value={periodo.id}>
                                        {handleFormatPeriodDate(periodo.fecha_creacion)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Buscar */}
                        <div className="flexStart marginYBtn">
                            <button onClick={handleBuscarSagencia} className="btn xl btnDarkGreen">
                                Buscar
                            </button>
                        </div>
                        {/* Botones de aranceles */}
                        {showTableSagencia && renderArancelesButtons(desgloseSagencia, selectedTipoSagencia, setSelectedTipoSagencia)}
                        {/* Tabla */}
                        {showTableSagencia && (
                            <TableAranceles
                                liquiData={selectedTipoSagencia === 'privados' ? desgloseSagencia.aranceles_privados : desgloseSagencia.aranceles_publicos}
                            />
                        )}
                        <hr className="marginYTitle" />
                        {showTableSagencia && (
                            <div className="flexStart btnNoBg marginY" onClick={
                                () => exportToExcel(
                                    selectedTipoSagencia === 'privados'
                                        ? desgloseSagencia.aranceles_privados
                                        : desgloseSagencia.aranceles_publicos,
                                    `Reporte_SubAgencia_${selectedTipoSagencia}.xlsx`,
                                    userData.role
                                )
                            }>
                                <FontAwesomeIcon icon={faPlus} className='plus' />
                                Exportar tabla a Excel
                            </div>
                        )}
                    </section>
                </Background>
                : <Page404 />
            }
        </>
    );
};

export default ReporteLiquidaciones;