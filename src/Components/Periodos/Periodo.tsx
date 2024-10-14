import { useContext, useEffect, useState } from "react";
import '../../Styles/Reutilized.css'
import Table from "../Tables/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Background from "../Background/Background";
import handlePeriodoData from "../../Utils/handlePeriodoData";
import postAranceles from "../../DbFunctions/postAranceles";
import { UserContext } from "../../Context/UserContext";

const Periodo = () => {

    const [fileSelected, setFileSelected] = useState<any>(null)
    const { setLoaderOn } = useContext(UserContext)

    const pathname = window.location.pathname;
    const pathParts = pathname.split('/');
    const company = pathParts[2];
    const date = pathParts[3];
    const periodoId = pathParts[4]
    const type = pathParts[5];
    const periodoData = handlePeriodoData(company, type, date, periodoId)

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

    const handleSubmitFile = async() => {
        setLoaderOn(true)
        console.log(periodoData);
        
        await postAranceles(fileSelected, periodoData.newId)
        setLoaderOn(false)
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, [])

    return (
        <Background>
            <section className="container">
                <h1 className="title2 marginYTitle">{periodoData.newCompany} - {periodoData.newType} - {periodoData.newDate}  </h1>
                <label htmlFor="fileInput" className="btnNoBg flexStart">
                    <FontAwesomeIcon icon={faPlus} className='plus' />
                    Importar archivo {periodoData.newType}
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
                    <button onClick={()=>handleSubmitFile()} className="btn small btnDarkGreen flexStart marginYSmall">Aceptar</button>
                    </>
                }
                <Table headers={["Archivo", "Productor", "Fecha importación", "Estado liquidación", "Importación", "Errores", "Total", "Acciones"]} />
            </section>
        </Background>
    )
}

export default Periodo;