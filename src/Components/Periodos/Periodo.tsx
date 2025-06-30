import { useContext, useEffect, useState } from "react";
import '../../Styles/Reutilized.css'
import Table from "../Tables/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Background from "../Background/Background";
import handlePeriodoData from "../../Utils/handlePeriodoData";
import postAranceles from "../../DbFunctions/postAranceles";
import { UserContext } from "../../Context/UserContext";
import Page404 from "../Page404/Page404";
import getPeriodoTable from "../../DbFunctions/getPeriodoTable";

const Periodo = () => {

    const [fileSelected, setFileSelected] = useState<any>(null)
    const { setLoaderOn, userData } = useContext(UserContext)
    const [tableData, setTableData] = useState(null)
    const [refresh, setRefresh] = useState(false)

    const pathname = window.location.pathname;
    const pathParts = pathname.split('/');
    const company = pathParts[2];
    const date = pathParts[3];
    const periodoId = pathParts[4];
    const moneda = pathParts[6];
    

    const periodoData = handlePeriodoData(company, date, periodoId)

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
        console.log(periodoData, fileSelected, 'LOCOOO');

        await postAranceles(fileSelected, periodoData.newId, setFileSelected, moneda)
        setLoaderOn(false)
        setRefresh(prev => !prev)
    }

    const getTablePeriodoData = async () => {
        setLoaderOn(true)
        const data = await getPeriodoTable(periodoId);

        if (data?.length) {
            setTableData(data[0]);
        }
        setLoaderOn(false)
    }

    useEffect(() => {
        getTablePeriodoData()
        window.scrollTo({
            top: 0,
        });
    }, [refresh])

    return (
        <>
            {
                userData.role === 'root' ?
                    <Background>
                        <section className="container">
                            <h1 className="title2 marginYTitle">{periodoData.newCompany}{" "+`${moneda !== 'inviu' ? "($"+moneda.toUpperCase()+")": ""}`} - {periodoData.newDate}  </h1>
                            <label htmlFor="fileInput" className="btnNoBg flexStart">
                                <FontAwesomeIcon icon={faPlus} className='plus' />
                                Importar archivo de {periodoData.newCompany}
                            </label>
                            <input
                                id="fileInput"
                                type="file"
                                accept=".xls, .xlsx"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            {
                                fileSelected !== null &&
                                <>
                                    <p className="ordinaryText marginY">Has seleccionado el archivo: {fileSelected.name}</p>
                                    <button onClick={() => handleSubmitFile()} className="btn small btnDarkGreen flexStart marginYSmall">Aceptar</button>
                                </>
                            }
                            {
                                tableData !== null &&

                                <Table headers={["Archivo", "Empresa", "Total"]} tableData={tableData} empresa={periodoData.newCompany} />
                            }
                        </section>
                    </Background>
                    :
                    <Page404 />
            }
        </>
    )
}

export default Periodo;