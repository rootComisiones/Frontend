import { useContext, useEffect, useState } from "react";
import '../../Styles/Reutilized.css'
import Background from "../Background/Background";
import { UserContext } from "../../Context/UserContext";
import getPeriodoAsesorLiqui from "../../DbFunctions/getPeriodoAsesorLiqui";
import TableAranceles from "../Tables/TableAranceles";
import getResults from "../../DbFunctions/getResults";
import Page404 from "../Page404/Page404";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useNotification } from "../../Context/NotificationContext";

const Liquidacion = () => {

    const { setLoaderOn, userData } = useContext(UserContext);
    const { showNotification } = useNotification();
    const [selectedFile, setSelectedFile] = useState('aranceles');
    const [companyFiles, setCompanyFiles] = useState<any>(['aranceles']);
    const [liquiData, setLiquiData] = useState<any>([]);
    const [resultsData, setResultsData] = useState<any>(null)
    const [totalLiquiData, setTotalLiquiData] = useState<any>(0);
    const [dataAsesorACargo, setDataAsesorACargo] = useState<any>([])

    const pathname = window.location.pathname;
    const pathParts = pathname.split('/');
    const companyId = pathParts[2];
    const companyName = companyId === "2" ? "Grupo IEB" : companyId === "1" && "Inviu";

    const periodo = pathParts[3].split('-');
    const periodo_id = periodo[0]
    const date = `${periodo[2]}/${periodo[1]}`

    const productorInfo = pathParts[4].split('-');
    const productor_id = productorInfo[0]
    const productorUsername = productorInfo[1]


    const role = pathParts[5]

    const exportarExcel = () => {
        // 1. Transforma el objeto en un array de arrays sin encabezados
        const dataParaExcel = Object.entries(resultsData);

        // 2. Crea un nuevo libro de Excel
        const libro = XLSX.utils.book_new();

        // 3. Crea la hoja de trabajo (worksheet) con la matriz de datos
        const hoja = XLSX.utils.aoa_to_sheet(dataParaExcel);

        // 4. Agrega la hoja de trabajo al libro de Excel
        XLSX.utils.book_append_sheet(libro, hoja, `Tabla Liquidacion ${periodo[2]}-${periodo[1]}`);

        // 5. Escribe el archivo Excel y descarga
        const excelBuffer = XLSX.write(libro, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });

        // 6. Descarga el archivo
        saveAs(dataBlob, `liquidacion-${date}.xlsx`);
    }


    const handleLiquiData = async () => {
        setLoaderOn(true)
        const empresa = selectedFile;
        console.log('prporporoppor', empresa);
        const { asesorACargo, beneficiario, total } = await getPeriodoAsesorLiqui(periodo_id, productor_id, role, empresa, showNotification);
        setDataAsesorACargo(asesorACargo)
        console.log('ASESORESACARGO', asesorACargo);
        setLiquiData(beneficiario)

        setTotalLiquiData(total)

        const results = await getResults(periodo_id, productor_id, role, showNotification);
        setResultsData(results)
        setLoaderOn(false)
    }

    useEffect(() => {
        handleLiquiData()
        const selectedFileName = pathParts[6];
        selectedFileName === 'inviu' ? setCompanyFiles(['aranceles']) :
            setCompanyFiles(['aranceles', 'aranceles-pu']);
        console.log('selectedFileName', selectedFileName);

        window.scrollTo({
            top: 0,
        });
    }, [selectedFile])

    return (
        <>
            {
                userData.role !== '' ?
                    <Background>
                        <section className="container">
                            {
                            companyFiles.length > 1 &&
                            <div className="btnsContainer marginYTitle">
                                <button
                                    onClick={() => setSelectedFile('aranceles')}
                                    className={`btn btnWhite marginXBtn ${selectedFile === "aranceles" && "active"}`}>
                                    Aranceles ($USD)
                                </button>
                                <button
                                    onClick={() => setSelectedFile('aranceles-pu')}
                                    className={`btn btnWhite marginXBtn ${selectedFile === "aranceles-pu" && "active"}`}>
                                    Aranceles Publicos ($ARS)
                                </button>
                            </div>
                        }
                            <h1 className="title2 marginYTitle">Liquidación del productor {productorUsername.toUpperCase()} - {companyName} - {date}</h1>

                            {
                                Array.isArray(liquiData) && liquiData.length > 0 ?
                                    <TableAranceles liquiData={liquiData} totalLiquiData={totalLiquiData} />
                                    :
                                    <h3 className="title2 marginYTitle" style={{ fontSize: 18, color: '#8dbaaa' }}>NO TIENE LIQUIDACIONES PROPIAS EN ESTE PERIODO.</h3>
                            }

                            <h1 className="title2 marginYTitle">Liquidación de productores a cargo de {productorUsername.toUpperCase()} - {companyName} - {date}</h1>
                            {
                                Array.isArray(dataAsesorACargo) && dataAsesorACargo.length > 0 ? (
                                    <TableAranceles liquiData={dataAsesorACargo} />
                                ) : (
                                    <h3 className="title2 marginYTitle" style={{ fontSize: 18, color: '#8dbaaa' }}>
                                        NO TIENE LIQUIDACIONES DE PRODUCTORES A CARGO EN ESTE PERIODO.
                                    </h3>
                                )
                            }
                            {/* {resultsData && <TableProductores resultsData={resultsData} />}
                            <div>
                                <div className="btnNoBg" onClick={exportarExcel}>
                                    <FontAwesomeIcon icon={faArrowAltCircleDown} className='plus' />
                                    Exportar Tabla de Resultados
                                </div>
                            </div> */}

                        </section>
                    </Background>
                    :
                    <Page404 />
            }
        </>
    )
}

export default Liquidacion;