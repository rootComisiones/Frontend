import { useContext, useEffect, useState } from "react";
import '../../Styles/Reutilized.css'
import Background from "../Background/Background";
import { UserContext } from "../../Context/UserContext";
import getPeriodoAsesorLiqui from "../../DbFunctions/getPeriodoAsesorLiqui";
import TableAranceles from "../Tables/TableAranceles";
import TableProductores from "../Tables/TableProductores";

const Liquidacion = () => {

    const { setLoaderOn } = useContext(UserContext);
    const [selectedFile, setSelectedFile] = useState('archivo1');
    const [liquiData, setLiquiData] = useState<any>([]);
    const [totalLiquiData, setTotalLiquiData] = useState<any>(0);

    const pathname = window.location.pathname;
    const pathParts = pathname.split('/');
    const companyId = pathParts[2];
    const companyName = companyId === "1" ? "Grupo IEB" : companyId === "2" && "Inviu";

    const periodo = pathParts[3].split('-');
    const periodo_id = periodo[0]
    const date = `${periodo[2]}/${periodo[1]}`

    const productorInfo = pathParts[4].split('-');
    const productor_id = productorInfo[0]
    const productorUsername = productorInfo[1]


    const role = pathParts[5]


    const handleLiquiData = async() => {
        setLoaderOn(true)
        const data = await getPeriodoAsesorLiqui(periodo_id, productor_id, role)
        setLiquiData(data.data)
        setTotalLiquiData(data.total)
        setLoaderOn(false)
    }

    useEffect(() => {
        handleLiquiData()
        window.scrollTo({
            top: 0,
        });
    }, [selectedFile])

    return (
        <Background>
            <section className="container">
                <h1 className="title2 marginYTitle">Liquidación del productor {productorUsername.toUpperCase()} - {companyName} - {date}</h1>
                <div className="btnsContainer marginYTitle">
                    <button
                        onClick={() => setSelectedFile("archivo1")}
                        className={`btn btnWhite marginXBtn ${selectedFile === "archivo1" && "active"}`}>
                        Archivo 1</button>
                    <button
                        onClick={() => setSelectedFile("archivo2")}
                        className={`btn btnWhite marginXBtn ${selectedFile === "archivo2" && "active"}`}>
                        Archivo 2</button>
                    <button
                        onClick={() => setSelectedFile("archivo3")}
                        className={`btn btnWhite marginXBtn ${selectedFile === "archivo3" && "active"}`}>
                        Archivo 3</button>
                </div>

                <TableAranceles liquiData={liquiData} totalLiquiData={totalLiquiData} />

                <h1 className="title2 marginYTitle">Liquidación de productores a cargo de {productorUsername.toUpperCase()} - {companyName} - {date}</h1>
                <TableProductores />

            </section>
        </Background>
    )
}

export default Liquidacion;